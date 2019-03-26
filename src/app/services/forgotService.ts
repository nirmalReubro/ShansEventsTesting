import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL = environment.apiUrl + '/forgotPassword';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  private mailError = new Subject<{errorMessage: string}>();
  error: string;
  constructor(
    public router: Router,
    public http: HttpClient) {}

  forgotCheck(email: string) {
    const userEmail = {
      email: email
    };
    this.http.post<{status: string}>(URL, userEmail).subscribe(result => {
        if (result.status === 'success') {
          this.mailError.next({
            errorMessage: 'Successfully sent an email , please check your inbox'
          });
        } else {
          this.mailError.next({
            errorMessage: 'Error in sending mail'
          });
        }
    });
  }

  changePassPermanently(password: string, token: string) {
    const postData = {
      token: token,
      new_pass: password
    };
     return this.http.put<{message: string}>(URL, postData);
  }

  getErrorMessage() {
    return this.mailError.asObservable();
  }

}
