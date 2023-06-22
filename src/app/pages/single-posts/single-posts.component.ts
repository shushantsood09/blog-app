import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-posts',
  templateUrl: './single-posts.component.html',
  styleUrls: ['./single-posts.component.css']
})
export class SinglePostsComponent implements OnInit{
  postData: any;
  similarPost!: Array<any>;
  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
  ){}
  ngOnInit(): void {
    this.route.params.subscribe(val=>{

      this.postService.updateCountViews(val.id);
      this.postService.loadOnePost(val.id).subscribe((post)=>{
        console.log(post);
        this.postData = post;
        this.loadSimilarPost(this.postData.category.categoryId);
      })
    })
  }

  loadSimilarPost(catId: string){
    this.postService.loadSimilarCategoryPost(catId).subscribe((val)=>{
      this.similarPost = val;
    })
  }
}
