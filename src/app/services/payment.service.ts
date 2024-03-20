import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerPayment } from  '../types/stripe/CustomerPayment'
import { environment } from '../../enviroments/environment';
import { PaymentDTO } from '../types/stripe/PaymentDTO';
import { PaymentIntent } from '../types/stripe/PaymentIntent';
import { Balance } from '../types/stripe/Balance';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  public addCardByToken(token: string) {
    return this.httpClient.post<string>(environment.Backend
        + `api/Pagos/addCardByToken`, token, {
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': environment.Backend
      }
    });
  }
  
  public createPaymentMethodByTokenWithCustomer(token: string, customerId: string) {
    return this.httpClient.post<string>(environment.Backend
        + `api/Pagos/createPaymentMethodByTokenWithCustomer/customer/${customerId}`, { token: token }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
  
  public getPaymentMethods(idUsuario:number) {
    return this.httpClient.get<PaymentDTO[]>(environment.Backend + `api/Pagos/GetPaymentMethod/User/` + idUsuario, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
  
  public getAmountBalance(idUsuario:number) {
    return this.httpClient.get<number>(environment.Backend
        + `api/Balance/GetAmountBalance/tenant/` + idUsuario, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  public getBalance(idUsuario:number) {
    return this.httpClient.get<Balance[]>(environment.Backend
        + `api/Balance/GetBalance/tenant/` + idUsuario, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
  
  public deletePaymentMethod(paymentMethodId: string) {
    return this.httpClient.delete<PaymentDTO[]>(environment.Backend
        + `api/Pagos/DeletePaymentMethod/payment/${paymentMethodId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  public createNewCustomerWithPaymentMethodInApi(userId: string, customerPayment: CustomerPayment) {
    return this.httpClient.post<string>(environment.Backend
        + `api/Pagos/CreateNewCustomerWithPaymentMethodInApi/user/${userId}`,
      customerPayment, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  public createPaymentIntent(paymentIntent: PaymentIntent) {
    return this.httpClient.post<any>(environment.Backend
        + `api/Pagos/PaymentIntent`,
        paymentIntent, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  public addTransaction(transaction: any,idUsuario:number) {
    return this.httpClient.post<any>(environment.Backend
        + `api/Balance/AddTransaction/tenant/${idUsuario}`,
        transaction, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

}
