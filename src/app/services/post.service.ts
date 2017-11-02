import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class PostService {

  constructor(private http: Http) { }

  createAuthorizationHeader(headers:Headers) {
    headers.append('Client-ID', 'kgr6km89embc4kfjknb072gmhkvj8u'); 
  } 

  createAccessHeader(headers:Headers) {
    headers.append('Access-Control-Allow-Origin', '*')
    headers.append('Access-Control-Request-Method', 'POST')
  }
  
  getTwitch(query): Observable<any> {
    var headers = new Headers()
    this.createAuthorizationHeader(headers);
    return this.http.get(`https://api.twitch.tv/kraken/channels/${query}/videos?limit=5`, {headers: headers})
    .map((res) => {
      return res.json()
    })
  }

  getYouTube(query): Observable<any> {
    return this.http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&chart=mostPopular&key=AIzaSyCs8PIBc9_thyv60k4mFAtlz1caOoU-aMY`)
    .map((res) => {return res.json()})
  }
    
  // getInstagram(userid, token) {
  //   var headers = new Headers()
  //   this.createAccessHeader(headers)
  //   this.http.get(`https://api.instagram.com/v1/users/${userid}/media/recent/?access_token=${token}`, {headers: headers})
  //   .subscribe(data => {
  //     console.log('HERE IS DATA!', data.json());
  //   })
  // }

  // getYouTube(query) {
  //   this.http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=channel&chart=mostPopular&key=AIzaSyCs8PIBc9_thyv60k4mFAtlz1caOoU-aMY`)
  //   .subscribe((data) => {
  //     // console.log(data.json(), 'this is the youtube data')
  //   })
  // }

  getPopularTags(): Observable<any> {
    
    return this.http.get('http://localhost:4201/tags')
    .map((res) => {
      return res.json()
    })
  }

  getEmbed(id): Observable<any> {
    return this.http.get(`http://localhost:4201/embed/${id}`)
    .map((res) => {return res.json()})
  }

  getTwitter(query: string): Observable<any> {
    return this.http.post(`http://localhost:4201/tweets/${query}`, {
      token: window.localStorage.getItem('bearerToken')
    })
    .map((res) => {return res.json()})
  }

  getInstagram(): Observable<any>{
    return this.http.get(`http://localhost:4201/instagram/`)
      .map((res) => {
        // console.log('here it is', res);
        return res}) 
  }

  getPost(post): Observable <any> {
    return this.http.get(`http://localhost:4201/posts/${post.post_id}`)
    .map((data) => {
      return data.json();
    })
  }

  getPostByUrl(post): Observable <any> {
    return this.http.get(`http://localhost:4201/postbyid/${post.url}`)
    .map((data) => {
      return data.json();
    })
  }

  addPost({ url }): Observable<any> {
    return this.http.post('http://localhost:4201/posts', {
      text: url, 
      type: 'post'
    })
    .map((res) => {return res.json()})
  }

  deletePost(post) {
    return this.http.delete(`http://localhost:4201/posts/${post.id}`)
    .map((res) => {return res.json()})
  }

  getComments(postid): Observable<any> {
    console.log(postid, '<<< POST ID')
    return this.http.get(`http://localhost:4201/comments/${postid}`)
    .map((res) => {return res.json()})
  }

  addComment({ comment }, id): Observable<any> {
    return this.http.post('http://localhost:4201/posts', {
      text: comment,
      type: 'comment',
      parent: id
    })
    .map((res) => {return res.json()})
  }

}
