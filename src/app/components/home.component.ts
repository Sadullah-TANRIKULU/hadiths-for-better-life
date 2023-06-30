import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Auth, authState, User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { RtdbService } from '../shared/rtdb.service';

@Component({
  selector: 'app-home',
  template: `
    <p>home works!</p>
    <div class="home-btn-container">
      <a>
        <button class="btn" (click)="signOut()" >
          <mat-icon color="warn" >logout</mat-icon>
        </button>
      </a>
    </div>
    <div class="current-user" >
      <p>Online User: {{currentUser?.displayName}}</p>
    </div>
  <div *ngIf="hadithList" class="main-section" >
    <ul *ngFor="let hadith of hadithList" >
    
      <li class="li-update-form">
        <input type="text" #updatehadith [value]="hadith.payload.val().hadith" />
        <button (click)="updateItem(hadith.key, updatehadith.value)">Update</button>
        <!-- <button (click)="deleteItem(hadith.key)">Delete</button> -->
        
        <mat-card class="example-card">
          <mat-card-header>
            <mat-card-title-group>
              <!-- <mat-card-title></mat-card-title>
              <mat-card-subtitle></mat-card-subtitle> -->
              <!-- <img mat-card-md-image src={{this.randomPhoto.urls.small}} > -->
            </mat-card-title-group>
          </mat-card-header>
          <mat-card-content>
            {{ hadith.payload.val().hadith }}
          </mat-card-content>
        </mat-card>

      </li>

    </ul>
  </div>
  <div class="home-main">
    <input class="new-hadith-input" type="text" #newHadith />
    <button class="btn-add primary" (click)="addItem(newHadith)">Add</button>
    <!-- <button (click)="deleteEverything()">Delete All</button> -->
  </div>

  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

  randomPhoto: any;
  hadithList: any[] = [];

  constructor( private authService: AuthService, private auth: Auth, private rtdbService: RtdbService ) {
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
      // console.log(aUser);
      this.rtdbService.getItems().subscribe( c => { 
        this.hadithList = c;
        c.forEach(action => console.log(action.payload.val().hadith));
        console.log(this.hadithList);
         
      });
    })
    
  }
  currentUser = this.auth.currentUser;  // finally, I got the current user.

  authState$ = authState(this.auth);
  authStateSubscription: Subscription;

  ngOnInit(): void {
    // this.rtdbService.getRandomPhoto().subscribe(response =>{
      // this.randomPhoto = response;
      // console.log(this.randomPhoto);
    // });
  }

  signOut() {
    this.authService.signOut();
    console.log('signing out!!!');
  }

  ngOnDestroy(): void {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.authStateSubscription.unsubscribe();
    console.log('onDestroy works');

  }

  addItem(st: HTMLInputElement) {
    this.rtdbService.addItem(st.value);
    st.value = '';
    console.log("new hadith added");
  }

  deleteItem(hadithKey: string) {
    this.rtdbService.deleteItem(hadithKey);
    console.log("hadith removed");
  }

  updateItem(hadithKey: string, newHadith: string) {
    this.rtdbService.updateItem(hadithKey, newHadith);
    console.log("hadith updated");
  }

  deleteEverything() {
    this.rtdbService.deleteEverything();
    console.log("all hadiths removed");
  }

}
