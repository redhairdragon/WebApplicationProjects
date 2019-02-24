import { Injectable } from '@angular/core';


@Injectable()
export class BlogService {
  private posts: Post[];
  private max_id: number;

  constructor() {
    console.log("7 called");

  	this.fetchPosts();
  }
  
  fetchPosts(): void{
    console.log("6 called");

  	this.posts=[];
  	this.max_id=0;
  	for (let i = 0; i < localStorage.length; i++){
  		let current:Post=JSON.parse(localStorage.getItem(localStorage.key(i)));
      current.created=new Date(current.created)
      current.modified=new Date(current.modified)
  		this.posts.push(current);
  		if(current.postid>this.max_id)
  			this.max_id=current.postid;
	  }
  }
  
  getPosts(): Post[]{
    console.log("5 called");
  	return this.posts;
  }

  getPost(id: number): Post{
    console.log("4 called");

  	for(let post of this.posts){
  		if(post.postid===id)
  			return post;
  	}
  	return null;
  }

  newPost(): Post{
    console.log("3 called");

  	this.max_id++;
  	let new_post=new Post(this.max_id,new Date(),new Date(),"","");
  	localStorage[this.max_id]= JSON.stringify(new_post);
  	this.posts.push(new_post);
  	return new_post;
  }

  updatePost(post: Post): void{
    console.log("1 called");
  	for(let p of this.posts){
  		if(p.postid===post.postid){
  			p.modified=new Date();
  			p.title=post.title;
  			p.body=post.body;
        localStorage[p.postid]=JSON.stringify(p);
  			return;
  		}
  	}
  }

  deletePost(id: number): void {
    console.log("2 called");

  	for(let i=0;i<this.posts.length;i++){
  		if(this.posts[i].postid===id){
  			this.posts.splice(i,1);
  			localStorage.removeItem(id.toString());
  			return;
  		}
  	}
  }
}

export class Post {
	postid: number;
	created: Date;
	modified: Date;
	title: string;
	body: string;

	constructor(postid,created,modified,title,body){
		this.postid=postid;
		this.created=created;
		this.modified=modified;
		this.title=title;
		this.body=body;
	}
}