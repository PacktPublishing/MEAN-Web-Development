import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {ArticlesService} from '../articles.service';

@Component({
  selector: 'create',
  templateUrl: 'app/articles/create/create.template.html'
})
export class CreateComponent {
	article: any = {};
	errorMessage: string;

	constructor(private _router:Router,
				private _articlesService: ArticlesService) {}

	create() {
		this._articlesService.create(this.article).subscribe(createdArticle => this._router.navigate(['/articles', createdArticle._id]),
							 				  				 error =>  this.errorMessage = error);
	}
}