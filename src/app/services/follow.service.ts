import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class FollowService {

  constructor(private http: Http) { }

  getFollow(follow): Observable <any> {
    var path = follow.uid;
    var realPath = `http://localhost:4201/follows/${path}`;
    return this.http.get(realPath)
    .map((data) => {
      return data.json();
    })
  }

  addFollow(follow) {
    this.http.post('http://localhost:4201/follows', {
      name: follow.name,
      uid: follow.uid
    })
    .subscribe((data) => {
      console.log(data, 'follow data')
    })
  }

  deleteFollow(follow) {
    this.http.delete(`http://localhost:4201/follows/${follow.id}`)
  }
}