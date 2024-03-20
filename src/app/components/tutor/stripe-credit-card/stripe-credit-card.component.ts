import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { StripeCardNumberComponent, StripePaymentElementComponent, StripeService, injectStripe } from 'ngx-stripe';
import { environment } from '../../../../enviroments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from '../../../services/payment.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerPayment } from '../../../types/stripe/CustomerPayment';
import { BackendService } from '../../../services/backend.services';

@Component({
  selector: 'app-stripe-credit-card',
  templateUrl: './stripe-credit-card.component.html',
  styleUrl: './stripe-credit-card.component.scss'
})
export class StripeCreditCardComponent implements OnInit{

  @ViewChild('errorModal') public errorModal!: ElementRef;
  @ViewChild(StripeCardNumberComponent) card!: StripeCardNumberComponent;
  @Output() updateCardView: EventEmitter<void> = new EventEmitter();
  public user:any;

  public stripe = injectStripe(environment.stripePk);
  public paymentElement!: StripePaymentElementComponent;
  public stripeTest!: FormGroup;
  public errorMsgModal!: string;
  public name:string="";
  public elementsOptions: StripeElementsOptions = {
    locale: 'es',
    appearance: {
      theme: 'stripe',
      labels: 'floating',
      variables: {
        colorPrimary: '#673ab7',
      }
    }
  };
  public cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
  customerId: string | undefined;

  constructor(private fb: FormBuilder,private ws:BackendService, private stripeService: StripeService,
    private modalService: NgbModal, private ps: PaymentService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("usuario")!);
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.ws.getTutorById(this.user.id).subscribe(
      {
        next: (tutor:any) => {
      this.name=tutor.nombres + " "+ tutor.apellidoPaterno+ " "+ tutor.apellidoMaterno;
      this.spinner.hide();
        },
        error: (e:any) =>{
          console.error(`Error al obtener el tutor ${e}`);
          this.spinner.hide();
        }
    
      });
  }

  public createToken(): void {
    this.spinner.show();
    const name = this.stripeTest.get('name')?.value;
    this.stripeService
      .createToken(this.card.element, { name }).subscribe((result) => {
        if (result.token) {
          // Use the token
          this.ps.getPaymentMethods(this.user.id).subscribe(
            {
              next:  (pm: any[])=>{
                  this.ps.createPaymentMethodByTokenWithCustomer(result.token.id,
                    this.user.idClientePago!).subscribe({
                    next: () => {
                      this.updateCardView.emit();
                      this.spinner.hide();
                    }, error: (error) =>{
                      this.spinner.hide();
                      this.updateCardView.emit();
                      if (typeof error.error === 'string') {
                        if (error.error == "Your card was declined.") {
                          this.errorMsgModal = "Tu tarjeta fue rechazada.";
                        } else if (error.error = "Your card has insufficient funds.") {
                          this.errorMsgModal = "Su tarjeta no tiene fondos suficientes.";
                        } else if (error.error = "Your card has expired.") {
                          this.errorMsgModal = "Tu tarjeta ha caducado.";
                        } else {
                          this.errorMsgModal = error.error;
                        }
                        // this.errorMsgModal = error.error;
                        this.modalService.open(this.errorModal, { size: 'md', backdrop: 'static', keyboard: false }).result.then(() => { });
                      } else {
                        this.closeModal();
                      }
                    }
                  });
              },
              error: (err)=>{
                this.ps.createNewCustomerWithPaymentMethodInApi(this.user.id,
              this.buildCreateUser(result.token.id)).subscribe({
                next: (customerId) => {
                  this.customerId = customerId;
                  this.updateCardView.emit();
                  this.spinner.hide();
                }, error: (error) => {
                  this.spinner.hide();
                  /*this.ls.renewToken().pipe(map((loginResponse) => {
                    UserInfoService.setLocalStorageData(loginResponse);
                    this.updateCardView.emit();
                    return new Date() < new Date(loginResponse.expiration);
                  }));*/
                  if (typeof error.error === 'string') {
                    if (error.error == "Your card was declined.") {
                      this.errorMsgModal = "Tu tarjeta fue rechazada.";
                    } else if (error.error = "Your card has insufficient funds.") {
                      this.errorMsgModal = "Su tarjeta no tiene fondos suficientes.";
                    } else if (error.error = "Your card has expired.") {
                      this.errorMsgModal = "Tu tarjeta ha caducado.";
                    } else {
                      this.errorMsgModal = error.error;
                    }
                    this.modalService.open(this.errorModal, { size: 'md', backdrop: 'static', keyboard: false }).result.then(() => { });
                  } else {
                    this.closeModal();
                  }
                }
              });
              }
            }
          );

            
          }
        } );
  }

  private buildCreateUser(token: string): CustomerPayment {
    return {
      token: token,
      customerCreateOptions: {
        description: "",
        email: this.user.usuario,
        metadata: {
          userId: this.user. id
        },
        name: this.name
      }
    };
  }

  public closeModal() {
    this.modalService.dismissAll();
  }

}
