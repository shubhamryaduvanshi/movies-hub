import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoaderService } from 'src/app/core/loader.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { LoginResponse } from 'src/app/types';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    public _loaderService: LoaderService,
    private _snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  get userName() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
  showPassword: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onSubmit() {
    if (!this.loginForm.valid) {
      return this.loginForm.markAllAsTouched();
    }
    this._authService.login(this.loginForm.value).subscribe((res: any) => {
      if (res.is_success) {
        this._snackbarService.openSnackBar('Login successfull', 'Close', 3000);
        console.log(res);

      }
    }, (err) => {
      this._snackbarService.openSnackBar("Invalid username or password", "Close", 4000);
      console.log(err);
    })
  }

}
