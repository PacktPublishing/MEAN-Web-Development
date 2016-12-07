import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

export const ArticlesRoutes: Routes = [{
  path: 'articles',
  component: ArticlesComponent,
  children: [
	{path: '', component: ListComponent},
	{path: 'create', component: CreateComponent},
	{path: ':articleId', component: ViewComponent},
	{path: ':articleId/edit', component: EditComponent}
  ],
}];
