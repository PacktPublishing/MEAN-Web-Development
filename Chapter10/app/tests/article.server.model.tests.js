// Load the test dependencies
const app = require('../../server.js');
const should = require('should');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Article = mongoose.model('Article');

// Define global test variables
let user, article;

// Create an 'Article' model test suite
describe('Article Model Unit Tests:', () => {
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

			done();
		});
	});

	// Test the 'Article' model save method
	describe('Testing the save method', () => {
		it('Should be able to save without problems', () => {
			article.save((err) => {
				should.not.exist(err);
			});
		});

		it('Should not be able to save an article without a title', () => {
			article.title = '';

			article.save((err) => {
				should.exist(err);
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