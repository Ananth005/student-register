import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder, NgForm} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
errorMessages: any;
  username: string;
  password: string;
  showPassword: boolean = false;
  private token:string='';
  loading = false;
  
  

 

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  

  
  
  
 

constructor(private http: HttpClient,private router: Router,private authService: AuthService,private formBuilder: FormBuilder,private cookieService: CookieService) {}

ngOnInit(f:NgForm) {
  this.load(f) ;
  
 }



onSubmit(f: NgForm) {
  // console.log(f.value);
  const username=f.value.username;
  const password=f.value.password;
  const encryptedPassword = this.encryptPassword(this.password);
  // console.log(encryptedPassword);
  f.value.password=encryptedPassword;
  // const decryptedPassword = this.decryptPassword(encryptedPassword);
  // console.log(decryptedPassword);
  this.authService.login(f.value).subscribe(
    (response )=> {
      // Handle successful login response
      console.log('Login successful');
      // console.log(response.access_token);
     this.router.navigate(['/home']);
     if (f.value.rememberMe) {
      // Store the access token in local storage
      localStorage.setItem('username',username);
      localStorage.setItem('password',password);
      // this.cookieService.set('username', username);
      // this.cookieService.set('password', password);
    }
      localStorage.setItem('authToken', response.access_token);
      this.token=localStorage.getItem('authToken');
      // this.cookieService.set('authToken', response.access_token);
      // this.token = this.cookieService.get('authToken');
    },
    (error )=> {
      // Handle login error
      console.error('Login failed',error);
      
      // alert("login failed" );
      
      alert(error.error.detail);
    
      
    }
  );
 

}
load(f:NgForm){
  this.username = localStorage.getItem('username');
  this.password = localStorage.getItem('password');
  // const decryptedPassword = this.decryptPassword(localStorage.getItem('password'));
  // this.password = decryptedPassword;
  // this.username = this.cookieService.get('username');
  // this.password = this.cookieService.get('password');
}
 secretKey = '206c10c99d6246f784005331e384df6d13e2056b2d0037bef81de611efb62e03';

encryptPassword(password: string): string {
  // Encrypt the password using AES encryption with ECB mode
  const encrypted = CryptoJS.AES.encrypt(password, CryptoJS.enc.Hex.parse(this.secretKey), {
    mode: CryptoJS.mode.ECB
  });
 
  return encrypted.toString();
}
decryptPassword(encryptedPassword: string): string {
  // Decrypt the encrypted password using AES decryption with ECB mode
  const decrypted = CryptoJS.AES.decrypt(encryptedPassword, CryptoJS.enc.Hex.parse(this.secretKey), {
    mode: CryptoJS.mode.ECB
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}



  
  




}
  


