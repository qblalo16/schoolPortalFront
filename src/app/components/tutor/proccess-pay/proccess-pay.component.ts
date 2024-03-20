import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentDTO } from '../../../types/stripe/PaymentDTO';
import { injectStripe } from 'ngx-stripe';
import { environment } from '../../../../enviroments/environment';
import { PaymentIntentResponse } from '../../../types/stripe/PaymentIntentResponse';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from '../../../services/payment.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DEPOSIT_TO_CEM } from '../../../const/Settings';
import { PaymentIntent } from '../../../types/stripe/PaymentIntent';

@Component({
  selector: 'app-proccess-pay',
  templateUrl: './proccess-pay.component.html',
  styleUrl: './proccess-pay.component.scss'
})
export class ProccessPayComponent implements OnInit {
  @ViewChild('confirmDeleteModal') public confirmDeleteModal!: ElementRef;
  @ViewChild('addPaymentMethodModal') public addPaymentMethodModal!: ElementRef;
  @ViewChild('rechargeModal') public rechargeModal!: ElementRef;
  @ViewChild('errorMsgModal') public errorMsgModal!: ElementRef;
  @ViewChild('confirmPaymentModal') public confirmPaymentModal!: ElementRef;
  @ViewChild('successMsgModal') public successMsgModal!: ElementRef;

  public pageData = 1;
  public pageSizeData = 5;
  public collectionSizeData = 0;
public user:any;
  public form!: FormGroup;
  public paymentMethods: PaymentDTO[] = [];
  public selectedPaymentMethod!: PaymentDTO;
  public successMsgModalMessage!: string;
  public stripe = injectStripe(environment.stripePk);
  public saldo = 0;
  public paymentIntent!: PaymentIntentResponse;

  constructor(private modalService: NgbModal, private fb: FormBuilder,
    private ps: PaymentService, private spinner: NgxSpinnerService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getInfo();
  }

  private buildForm() {
    this.form = this.fb.group({
      card: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(20), Validators.max(20000)]]
    });
  }

  get card() {
    return this.form.get('card')!.value;
  }

  get cardEmpty() {
    return this.form.get('card')!.invalid && this.form.get('card')!.touched;
  }

  get amount() {
    return this.form.get('amount')!.value;
  }

  get amountEmpty() {
    return this.form.get('amount')!.invalid && this.form.get('amount')!.touched;
  }

  public getInfo() {
    this.user=JSON.parse(localStorage.getItem("usuario")!);
    this.ps.getPaymentMethods(this.user.id).subscribe({
      next: (paymentMethods) => {
        this.paymentMethods = paymentMethods;
        // this.searchMethod();
      }
    });
    /*this.ps.getAmountBalance(this.user).subscribe({
      next: (saldo) => {
        this.saldo = Math.trunc(saldo * 100) / 100;
      }
    });*/
  }

  public addPaymentMethod() {
    this.modalService.open(this.addPaymentMethodModal, { size: 'md', backdrop: 'static', keyboard: false }).result.then(() => { });
  }

  public executeRecharge() {
    if (this.form.invalid) {
      return;
    }
    this.spinner.show();
    this.modalService.dismissAll();
    this.ps.createPaymentIntent(this.buildPaymentIntent()).subscribe({
      next: (paymentIntent: PaymentIntentResponse) => {
        this.paymentIntent = paymentIntent;
        this.spinner.hide();
        this.modalService.open(this.confirmPaymentModal, { size: 'md', backdrop: 'static', keyboard: false }).result.then(() => { });
      }, error: (error) => {
        console.log('errorPaymentIntent');
        console.log(error);
        this.modalService.open(this.errorMsgModal, { size: 'md', backdrop: 'static', keyboard: false }).result.then(() => { });
        this.spinner.hide();
      } 
    })
  }

  public confirmPayment() {
    this.modalService.dismissAll();
    this.spinner.show();
    this.stripe.confirmPayment({
      clientSecret: this.paymentIntent.clientSecret,
      redirect: 'if_required'
    }).subscribe({
      next: (result) => {
        console.log(result);
        const transaction = {
          description: "Deposito a cuenta",
          amount: this.amount,
          deposit: true,
          specialKey: DEPOSIT_TO_CEM,
          userId: this.user.id,
          quantity: 1,
          unitPrice: this.amount
        };
        this.ps.getAmountBalance(this.user).subscribe({
          next: (saldo) => {
            this.saldo = Math.trunc(saldo * 100) / 100;
          }
        });
        this.ps.addTransaction(transaction,this.user.id).subscribe();
        this.spinner.hide();
        this.successMsgModalMessage = 'Recarga realizada con éxito';
        this.modalService.open(this.successMsgModal, { size: 'md', backdrop: 'static', keyboard: false }).result.then(() => { });
      },
      error: (err) => {
        console.log(err);
        this.modalService.open(this.errorMsgModal, { size: 'md', backdrop: 'static', keyboard: false }).result.then(() => { });
        this.spinner.hide();
      }
    });
  }

  private buildPaymentIntent(): PaymentIntent {
    return {
      amount: this.amount * 100,
      currency: "mxn",
      description: "Pago de mensualidad",
      paymentMethodTypes: ["card"],
      paymentMethod: this.card.id,
      customer: this.card.customer,
      metadata: {
        tenant: this.user.id
      }
    };
  }

  public recharge() {
    this.form.reset();
    this.modalService.open(this.rechargeModal, { size: 'md', backdrop: 'static', keyboard: false }).result.then(() => { });
  }

  public confirmDeleteMethod(paymentMethod: any) {
    this.selectedPaymentMethod = paymentMethod;
    this.modalService.open(this.confirmDeleteModal, { size: 'md', backdrop: 'static', keyboard: false }).result.then(() => { });
  }

  public searchMethod() {
    this.refreshData();
  }

  public deleteMethod() {
    this.modalService.dismissAll();
    this.spinner.show();
    this.ps.deletePaymentMethod(this.selectedPaymentMethod.id).subscribe({
      next: () => {
        this.getInfo();
        this.spinner.hide();
        this.successMsgModalMessage = 'Se eliminó con éxito la tarjeta' + this.selectedPaymentMethod.last4;
        this.modalService.open(this.successMsgModal, { size: 'md', backdrop: 'static', keyboard: false }).result.then(() => { });
      }, error: () => {
        this.getInfo();
        this.spinner.hide();
        this.modalService.open(this.errorMsgModal, { size: 'md', backdrop: 'static', keyboard: false }).result.then(() => { });
      }
    });
  }

  public refreshData() {
    this.collectionSizeData = this.paymentMethods.length;
    this.paymentMethods = this.paymentMethods
      .map((profile, i) => ({ idAux: i + 1, ...profile }))
      .slice(
        (this.pageData - 1) * this.pageSizeData,
        (this.pageData - 1) * this.pageSizeData + this.pageSizeData
      );
  }

}
