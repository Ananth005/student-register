import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  loading=false;
  constructor(private http: HttpClient,private router: Router) {}
onSubmit(p:NgForm){
  console.log(p)
  this.http.put<any>('https://final-vy64.onrender.com/forget_password', p.value )
      .subscribe(
        response => {
          // Handle successful login response
          console.log('Password Changed successfully');
          alert("Password changed successfully");
          this.router.navigate(['/']);

          
        },
        error => {
          // Handle login error
          console.error('Failed', error);
          alert(error.error.detail);
        }
      );
}
}
