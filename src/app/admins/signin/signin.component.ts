import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  id: string;
  pwd: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  submit(){
    if(this.id.length > 0 && this.pwd.length > 0){
      this.authService.signin(this.id, this.pwd);
    }
  }

}
