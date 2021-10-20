import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public alertError: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      type: [null, [Validators.required]]
    });
  }

  doLogin() {
    this.authenticationService.login(this.loginForm.value).subscribe(data => {
        if (this.authenticationService.redirectUrl) {
          this.router.navigate([this.authenticationService.redirectUrl]);
          this.authenticationService.redirectUrl = null;
        }
    },
    (errorMessage) => {
      this.alertError = errorMessage;
    });
  }
}
