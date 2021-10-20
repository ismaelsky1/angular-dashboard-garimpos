import { Component, OnInit } from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration-payment',
  templateUrl: './registration-payment.component.html',
  styleUrls: ['./registration-payment.component.css']
})
export class RegistrationPaymentComponent implements OnInit {

  public paymentForm: FormGroup;

  constructor(
    private modalService: NzModalService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      type: ['B']
    });
  }

  finalize(){
    this.modalService.success({
      nzTitle: 'Parabéns!',
      nzContent: 'Seu pagamento foi efetuado com sucesso. Agora você já pode desfrutar de todos os recursos da plataforma.',
      nzOkText: 'Acessar plataforma',
      nzOnOk: () => {
        this.router.navigate(['dashboard']);
      }
    });

    /*this.modalService.error({
      nzTitle: 'Ops, algo deu errado!',
      nzContent: 'Seu pagamento foi recusado pela operadora. Mas você pode informar outro cartão de crédito.',
      nzOkText: 'Informar outro cartão'
    });*/

    /*this.modalService.warning({
      nzTitle: 'Seu pagamento está pendente!',
      nzContent: 'Não se preocupe estamos aguardando a autorização do seu pagamento e te enviaremos uma resposta em breve.',
      nzOkText: 'Ok, entendi',
      nzOnOk: () => {
        this.router.navigate(['login']);
      }
    });*/
  }
}
