import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidatorsPatterns} from '../../../helpers/validators.enum';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public alertError: string;
  public registrationForm: FormGroup;
  public accountValidationMessages: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.accountValidationMessages = {
      name: [
        {type: 'required', message: 'Informe o seu nome completo'},
      ],
      email: [
        {type: 'required', message: 'Informe seu email'},
        {type: 'email', message: 'Informe um email válido'}
      ],
      cellphone: [
        {type: 'required', message: 'Informe seu celular'},
        {type: 'pattern', message: 'Informe um telefone válido (Somente números)'}
      ],
      password: [
        {type: 'required', message: 'Informe uma senha'},
      ],
      terms: [
        {type: 'required', message: 'Aceite os termos de uso'}
      ]
    };

    this.registrationForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(ValidatorsPatterns.NAME)]],
      email: [null, [Validators.required, Validators.email]],
      cellphone: [null, [Validators.required, Validators.pattern(ValidatorsPatterns.CELLPHONE)]],
      password: [null, Validators.required],
      type: ['COMPANY', Validators.required],
      terms: [false, [Validators.required, Validators.requiredTrue]],
    });
  }

  doRegistration() {

  }

}
