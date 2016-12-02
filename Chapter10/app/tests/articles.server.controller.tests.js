// Load the test dependencies
const app = require('../../server');
const request = require('supertest');
const should = require('should');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Article = mongoose.model('Article');

// Define global test variables
let user, article;

// Create an 'Articles' controller test suite
describe('Article Controller Unit Tests:', () => {
	// Define a pre-tests function
	beforeEach((done) => {
		// Create a new 'User' model instance
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		// Save the new 'User' model instance
		user.save(() => {
			article = new Article({
				title: 'Article Title',
				content: 'Article Content',
				user: user
			});

			article.save((err) => {
				done();
			});
		});
	});

	// Test the 'Article' GET methods
	describe('Testing the GET methods', () => {
		it('Should be able to get the list of articles', (done) => {
			// Create a SuperTest request
			request(app).get('/api/articles/')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					res.body.should.be.an.Array().and.have.lengthOf(1);
					res.body[0].should.have.property('title', article.title);
					res.body[0].should.have.property('content', article.content);

					done();
				});
		});

		it('Should be able to get the specific article', (done) => {
			// Create a SuperTest request
			request(app).get('/api/articles/' + article.id)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					res.body.should.be.an.Object().and.have.property('title', article.title);
					res.body.should.have.property('content', article.content);

					done();
				});
		});
	});

	// Define a post-tests function
	afterEach((done) => {
		// Clean the database
		Article.remove(() => {
			User.remove(() => {
				done();
			});
		});
	});
});