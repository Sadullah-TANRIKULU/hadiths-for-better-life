import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  template: `
  <div class="login-container" >
    <div style="text-align:center" class="content">
      <h2>Welcome to {{title}} App!</h2>
    </div>
    <div class="google-btn-container">
      <a (click)="signInWithGoogle()" >
        <button class="google-btn">
          <mat-icon color="warn" >key</mat-icon>
          <p class="google">Login with <span class="g1">G</span><span class="o1">o</span><span class="o2">o</span><span class="g2">g</span><span class="l">l</span><span class="e">e</span></p>
        </button>
      </a>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  title = 'hadiths-for-better-life';
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
    console.log('signed in!');
  }

}
