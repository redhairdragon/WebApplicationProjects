import { Component, OnInit } from '@angular/core';
import { BlogService, Post} from '../blog.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  posts:Post[]=[];
  options = {  
    weekday: "short", year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"  
  }; 
  constructor(private BlogService: BlogService,private router:Router) {
    console.log("14 called");
  }
  newPost(){
    console.log("13 called");
  	var newPost=this.BlogService.newPost();	
  	this.router.navigate(['/edit/'+newPost.postid]);
  }
  ngOnInit() {
    console.log("12 called");
    this.posts=this.BlogService.getPosts();
  }

}
