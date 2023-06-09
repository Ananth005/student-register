import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loading=false;
  defaultGender = 'male';
  constructor(private http: HttpClient,private router: Router) {}
  onSubmit(r: NgForm){
    // console.log(r)
    this.http.post<any>('https://final-vy64.onrender.com/register', r.value)
    .subscribe(
      response => {
        // console.log(response)
        console.log('Registration successful');
        alert("Registration Successful");
        this.router.navigate[('/')];
      },
      error => {
        console.error('Registration failed', error);
        alert("Registration Failed")
      }
    )
  }
}
