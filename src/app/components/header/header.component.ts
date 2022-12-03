import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _loginService: LoginService,
    private _snackbarService: SnackbarService
  ) { }

  isLightTheme: boolean = true;

  ngOnInit(): void {
  }

  toggleTheme() {
    if (this.isLightTheme) {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }
    this.isLightTheme = !this.isLightTheme;
  }

  setLightTheme() {
    const dom = document.getElementsByTagName('body')[0];
    dom.style.setProperty('--page-text-primary-color', '#373535')
    dom.style.setProperty('--page-text-secondary-color', '#3069b2');
    dom.style.setProperty('--page-background-color', '#fff');
    dom.style.setProperty('--page-background-secondary-color', '#fff');
    dom.style.setProperty('--button-text-color', '#fff');
    dom.style.setProperty('--button-background-color', '#3069b2');
  }

  setDarkTheme() {
    const dom = document.getElementsByTagName('body')[0];
    dom.style.setProperty('--page-text-primary-color', '#fff')
    dom.style.setProperty('--page-text-secondary-color', '#3069b2');
    dom.style.setProperty('--page-background-color', '#2a2a2a');
    dom.style.setProperty('--page-background-secondary-color', '#2d353f');
    dom.style.setProperty('--button-text-color', '#fff');
    dom.style.setProperty('--button-background-color', '#0e3971');
  }

  logout():void{
    this._loginService.logout();
    this._snackbarService.openSnackBar('Log out successfull', 'Close', 3000);
  }
}
