import { Component, OnInit } from '@angular/core';
import { Parser, HtmlRenderer } from 'commonmark';
import { BlogService, Post} from '../blog.service'
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  post:Post;
  rTitle:String="";
  rBody:String="";

  constructor(private BlogService: BlogService,private router: Router,
              private route: ActivatedRoute) 
  {}
  getPost():void{
  	const id = +this.route.snapshot.paramMap.get('id');
  	this.post=this.BlogService.getPost(id);
  }
  getPreview():void{
    this.getPost()
  	var reader = new Parser();
    var writer = new HtmlRenderer();
    var parsed = reader.parse(this.post.title); // parsed is a 'Node' tree
    this.rTitle = writer.render(parsed); // result is a String
    parsed=reader.parse(this.post.body); // parsed is a 'Node' tree
    this.rBody = writer.render(parsed); // result is a String
  }

  ngOnInit() {
  	this.getPreview();
  	this.route.params.subscribe(() => this.getPreview());
  }

}
