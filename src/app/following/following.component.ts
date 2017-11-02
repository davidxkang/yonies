import { Component, OnInit, AfterViewInit, AfterContentChecked } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { FriendService } from '../services/friend.service';
import { PostService } from '../services/post.service';
import { HashService } from '../services/hash.service';
import { LikesService } from '../services/likes.service';
import { ScriptService } from '../services/script.service';
import { AuthService } from '../services/auth.services';
import { FollowService } from '../services/follow.service';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  cats: any;
  content: any;
  friends: any;
  liked: any;

  constructor(
    private friendService: FriendService, 
    private likeService: LikesService, 
    private sanitizer: DomSanitizer, 
    private postService: PostService, 
    private authService: AuthService, 
    private followService: FollowService, 
    private afAuth: AngularFireAuth) {

    this.content = [];
    this.cats = [];
    this.friends = [];
    this.liked = false;
  }

  likePost(post) {
    let user = firebase.auth().currentUser;    
    this.postService.addPost(post)
    .subscribe((res) => {
      console.log(res, '<<<<<< RES')
      this.likeService.addLike({uid: user.uid, post_id: String(res.post_id)})
      .subscribe((data) => {
        console.log(data, '<<<< LIKESERVICE ADD LIKE DATA')
      })
    }) 
    this.liked = true; 
  }


  toggleLiked(post) {
    if (this.liked === false) {
      this.liked = true;
      this.likePost(post)
    } else if (this.liked === true) {
      this.liked = false;
    }
  }

  ngOnInit() {
    this.content = [];
    this.cats = [];
    this.afAuth.authState.subscribe((data) => {
      var uid = data.uid;
      console.log(uid, data.email)
      this.friendService.getFriend(uid)
      .subscribe((data) => {
        var friendIds = data.map((friend) => {return friend.friend_id});
        console.log(friendIds, 'friend data@@@@@@@@@@@@@@@@@')
        friendIds.forEach((id) => {
          this.followService.getFollow({uid: id})
          .subscribe((data) => {
            console.log(data, "CAT DATA @@@@@@@@@@")
            data.forEach((cat) => {
              this.cats.push(cat.name);
            })
            console.log(this.cats, 'friends cats %%%%%%%%%%%')
            this.cats.forEach((cat) => {
              this.postService.getTwitch(cat)
              .subscribe((data) => {
                data.videos.forEach((video) => {
                  this.content.push({date: video.created_at, src: this.sanitizer.bypassSecurityTrustResourceUrl(`http://player.twitch.tv/?video=${video._id}&autoplay=false`)})
                })
                this.postService.getYouTube(cat)
                .subscribe((data) => {
                  data.items.forEach((video) => {
                    console.log(video, 'videos')
                    this.content.push({date: video.snippet.publishedAt, src: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video.id.videoId)})
                  })
                  this.content.sort((a, b) => {
                    var c = new Date(a.date).getTime()
                    var d = new Date(b.date).getTime()
                    return c > d ? 1 : -1; 
                  })
                  this.content = this.content.slice(0, 11);   
              })
              console.log(this.content, '<<<<<<< CONTENT BY DATES')
              })
            })
          })
        })
      })
    })
  }

}
