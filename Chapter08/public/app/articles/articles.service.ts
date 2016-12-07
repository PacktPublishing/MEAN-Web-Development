import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import {Injectable} from '@angular/core';
import {Http, Headers, Request, RequestMethod, Response} from '@angular/http';


@Injectable()
export class ArticlesService {
	private _baseURL = 'api/articles';

	constructor (private _http: Http) {}

	create(article: any): Observable<any> {
		return this._http
			.post(this._baseURL, article)
			.map((res: Response) => res.json())
			.catch(this.handleError);
  	}
	
	read(articleId: string): Observable<any> {
		return this._http
			.get(`${this._baseURL}/${articleId}`)
			.map((res: Response) => res.json())
			.catch(this.handleError);
	}

	update(article: any): Observable<any> {
		return this._http
			.put(`${this._baseURL}/${article._id}`, article)
			.map((res: Response) => res.json())
			.catch(this.handleError);
  	}

	delete(articleId: any): Observable<any> {
		return this._http
			.delete(`${this._baseURL}/${articleId}`)
			.map((res: Response) => res.json())
			.catch(this.handleError);
	}	
	
	list(): Observable<any> {
		return this._http
			.get(this._baseURL)
			.map((res: Response) => res.json())
			.catch(this.handleError);
	}

	private handleError(error: Response) {
		return Observable.throw(error.json().message || 'Server error');
	}
}