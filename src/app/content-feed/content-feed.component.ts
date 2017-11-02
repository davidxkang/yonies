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
  selector: 'app-content-feed',
  templateUrl: './content-feed.component.html',
  styleUrls: ['./content-feed.component.css']
})
export class ContentFeedComponent implements OnInit {
  
  cats: any;
  uid: any;
  content: any;
  liked: boolean;

  constructor(
    private likeService: LikesService, 
    private sanitizer: DomSanitizer, 
    private postService: PostService, 
    private authService: AuthService, 
    private followService: FollowService, 
    private afAuth: AngularFireAuth,
    private fb: FormBuilder) {

    this.content = [];
    this.cats = [];
    this.uid = '';
    this.liked = false;
   }

  //get current user, get content feed based on keywords of stuff they have liked,
  //so when they like, add the search query of what they liked 
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

  checkIfLiked(post) {
    this.liked = false;
    let user = firebase.auth().currentUser;    
    console.log(post)
    // console.log(this.liked)
    this.likeService.getLikes({uid: user.uid})
    .subscribe((res) => {
      var postIds = res.map((data) => {return data.post_id})
      postIds.forEach((id) => {
        this.postService.getPost({post_id: id})
        .subscribe((data) => {
          data.forEach((p) => {
            if (p.text === post.url) {
              this.liked = true;
              console.log(this.liked, 'liked status if true')
              return this.liked;
            }
          })
        })
      })
    })
    console.log(this.liked, 'liked status if false')
    return this.liked;
  }
  //check the posts table for a url that match
  //get the post ids from the post tables,
  //check the likes table where post id = any in the post array
  //check if any 

  ngOnInit() {
    console.log('RUNNING in ONINIT')
    this.content = [];
    this.afAuth.authState.subscribe((data) => {
      console.log(data.uid, '<<<<<< DATA.uid')
      this.followService.getFollow({uid: data.uid})
      .subscribe((data) => {
        data.forEach((cat) => {
          this.cats.push(cat.name);
        })

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
  }

}
