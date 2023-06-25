import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RtdbService {
  hadithsRef: AngularFireList<any>;
  private url = ''//'https://api.unsplash.com/photos/random/?topics=peace&client_id=weZr3QByQh_uqS4dbNKj-Uvw6bP0FO0gj2EXAQVZwto';

  constructor(private httpClient: HttpClient, private db: AngularFireDatabase) {
    this.hadithsRef = this.db.list('hadiths'); // Replace 'items' with the correct path in your database
    
  }

  getItems(): Observable<any[]> {
    return this.hadithsRef.snapshotChanges();
  }

  addItem(newHadith: string) {
    this.hadithsRef.push({ hadith: newHadith });
  }

  deleteItem(hadithKey: string) {
    this.hadithsRef.remove(hadithKey);
  }

  updateItem(hadithKey: string, newHadith: string) {
    this.hadithsRef.update(hadithKey, { hadith: newHadith });
  }

  deleteEverything() {
    this.hadithsRef.remove();
  }

  getRandomPhoto() {
    return this.httpClient.get(this.url);
  }

}
