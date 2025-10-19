import { computed, inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  getIdToken,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from '@angular/fire/auth';

import { from, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private _user = signal<User | null>(null);

  public user = computed(() => this._user());

  constructor() {
    authState(this.auth).subscribe((user) => {
      this._user.set(user);
    });
  }

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

  getCurrentUser() {
    return this.user;
  }

  getActiveUserToken$(): Observable<string | null> {
    const user = this.auth.currentUser;
    if (!user) {
      return of(null);
    }
    const promise = getIdToken(user);
    return from(promise);
  }

  isAuthenticated$(): Observable<boolean> {
    return authState(this.auth).pipe(
      map((user) => !!user),
      take(1)
    );
  }
}
