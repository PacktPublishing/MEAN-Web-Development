__karma__.loaded = function () { };

System.import('/base/public/systemjs.config.js').then(loadTests);

function loadTests() {
	Promise.all([
		System.import('app/bootstrap.spec'),
		System.import('app/articles/articles.service.spec'),
		System.import('app/articles/list/list.component.spec'),
		System.import('app/app.routes.spec'),
		System.import('app/directive.spec'),
		System.import('app/pipe.spec')
	]).then(__karma__.start, __karma__.error);
}