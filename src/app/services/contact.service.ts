import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Message } from "../models/message.model";

import { environment } from "../../environments/environment";

const apiUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class ContactService {
    constructor(private http: HttpClient, private router: Router) {}

    sendMessage(name: string, email: string, subject: string, content: string) {
        const message: Message = {
            name: name, 
            email: email, 
            subject: subject, 
            content: content
        };
        this.http.post(apiUrl + "/contact", message)
        .subscribe(response => {
            console.log(response);
            alert('Your message has been sent successfully !');
            setTimeout(() => {
                this.router.navigate(['/']);
            }, 2000);
        });
    }
}