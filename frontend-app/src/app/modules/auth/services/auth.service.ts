import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getIdToken,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from '@angular/fire/auth';

import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  login$(email: string, password: string): Observable<UserCredential> {
    const promise = signInWithEmailAndPassword(this.auth, email, password);
    return from(promise);
  }

  signUp$(email: string, password: string): Observable<UserCredential> {
    const promise = createUserWithEmailAndPassword(this.auth, email, password);
    return from(promise);
  }

  logout$(): Observable<void> {
    const promise = signOut(this.auth);
    return from(promise);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  getActiveUserToken$(): Observable<string | null> {
    const user = this.auth.currentUser;
    if (!user) {
      return of(null);
    }
    const promise = getIdToken(user);
    return from(promise);
  }
}
