import {  Component, OnInit } from '@angular/core';
import {BlogService, Post} from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})


export class EditComponent implements OnInit {

  post:Post;
  saveDisabled:boolean=true;
  saveAlert:boolean=false;

  constructor(
  	private router: Router,
  	private route: ActivatedRoute,
  	private location: Location,
  	private BlogService: BlogService) {
    console.log("8 called");

  }
  getPost():void{
    console.log("9 called");

  	if(this.post){this.savePost();}
  	const id = +this.route.snapshot.paramMap.get('id');
  	this.post=this.BlogService.getPost(id);
    this.saveDisabled=true;
    this.saveAlert=false;
  }
  deletePost():void{
  	this.BlogService.deletePost(this.post.postid);
  	this.router.navigate(['/'])
  }
  savePost():void{
  	this.saveDisabled=true;
  	this.post.modified=new Date();
  	this.BlogService.updatePost(this.post);
    if(this.saveDisabled)
      this.saveAlert=true;
  }
  previewPost():void{
  	this.savePost();
  	this.router.navigate(['/preview/'+this.post.postid])
  }
  ngOnInit() {
    console.log("11 called");

    this.getPost()
  	this.route.params.subscribe(() => this.getPost());
  }

  @HostListener('window:beforeunload')
  OnDestroy(){
    console.log("10 called");

  	this.savePost();
  }
}
