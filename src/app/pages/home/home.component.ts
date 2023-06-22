import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredPostData!: Array<any>;
  latestPostData!: Array<any>;
  constructor(
    private postservice: PostsService
  ) {
    this.postservice.loadFeatured().subscribe((val)=>{
      // console.log(val);
      this.featuredPostData = val;
    })

    this.postservice.loadLatest().subscribe((val)=>{
      // console.log(val);
      this.latestPostData = val;
    })
  }

  ngOnInit(): void {

  }
}
