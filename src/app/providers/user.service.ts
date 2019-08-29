import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from as fromPromise } from 'rxjs';
import { User } from '../common/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/user.json");
  }

  public getAll(): Observable<any> {
    return fromPromise((JSON.parse(localStorage.getItem('users'))));
  }

  public getByName(text): Observable<any> {
    return fromPromise(JSON.parse(localStorage.getItem('users')).filter(function (value, index, arr) {
      return value.firstName.toUpperCase().includes(text.toUpperCase()) || value.lastName.toUpperCase().includes(text.toUpperCase());
    }));
  }

  public deleteItem(userList) {
    this.setLocalstorage(userList);
  }

  public deleteSelected(userList) {
    this.setLocalstorage(userList.filter(function (value, index, arr) {
      return !value.checked
    }));
  }

  public saveItem(item) {
    let itens = JSON.parse(localStorage.getItem('users'));
    itens.forEach(element => {
      if (element.id == item.id) {
        element.firstName = item.firstName;
        element.lastName = item.lastName;
      }
    });
    this.setLocalstorage(itens);
  }

  public showItem(id): Observable<any> {
    return fromPromise(JSON.parse(localStorage.getItem('users')).filter(function (value, index, arr) {
      return value.id == id;
    }));
  }

  private setLocalstorage(userList) {
    localStorage.setItem('users', JSON.stringify(userList));
  }
}