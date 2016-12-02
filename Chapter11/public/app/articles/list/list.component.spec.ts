import { Observable } from "rxjs/Rx";
import { Directive, Input }   from '@angular/core';
import { ComponentFixture, TestBed, async, fakeAsync } from '@angular/core/testing';
import { ArticlesService } from '../articles.service';
import { ListComponent } from './list.component';

class MockArticlesService {
	articles = [{
		_id: '12345678',
		title: 'An Article about MEAN',
		content: 'MEAN rocks!',
		created: new Date(),
		creator: {
			fullName: 'John Doe'
		}
	}];

	public list() {
		return Observable.of(this.articles);
	}
};

@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('List component tests', () => {
	let componentFixture: ComponentFixture<ListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ListComponent, RouterLinkStubDirective ],
			providers:    [ {provide: ArticlesService, useClass: MockArticlesService } ]
		}).compileComponents();
	}));  


  beforeEach(fakeAsync(() => {
    componentFixture = TestBed.createComponent(ListComponent);
  }));

	it('Should render list', () => {
		componentFixture.detectChanges();

		let mockArticleService = new MockArticlesService();

		let listComponentElement = componentFixture.nativeElement;

		let articleElements = listComponentElement.querySelectorAll('li');
		let articleElement = articleElements[0];
		let articleTitleElement = articleElement.querySelector('a');
		let articleContentElement = articleElement.querySelector('p');

		let mockArticleList = mockArticleService.articles;
		let mockArticle = mockArticleList[0];
		let mockArticleTitle = mockArticle.title;
		let mockArticleContent = mockArticle.content;

		expect(articleElements.length).toBe(mockArticleList.length);
		expect(articleTitleElement.innerHTML).toBe(mockArticleTitle);
		expect(articleContentElement.innerHTML).toBe(mockArticleContent);
	});
});