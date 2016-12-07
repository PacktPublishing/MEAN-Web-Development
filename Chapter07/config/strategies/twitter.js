// Load the module dependencies
const passport = require('passport');
const url = require('url');
const TwitterStrategy = require('passport-twitter').Strategy;
const config = require('../config');
const users = require('../../app/controllers/users.server.controller');

// Create the Twitter strategy configuration method
module.exports = function() {
	// Use the Passport's Twitter strategy 
	passport.use(new TwitterStrategy({
			consumerKey: config.twitter.clientID,
			consumerSecret: config.twitter.clientSecret,
			callbackURL: config.twitter.callbackURL,
			passReqToCallback: true
		}, (req, token, tokenSecret, profile, done) => {
			// Set the user's provider data and include tokens
			const providerData = profile._json;
			providerData.token = token;
			providerData.tokenSecret = tokenSecret;

			// Create the user OAuth profile
			const providerUserProfile = {
				fullName: profile.displayName,
				username: profile.username,
				provider: 'twitter',
				providerId: profile.id,
				providerData: providerData
			};

			// Save the user OAuth profile
			users.saveOAuthUserProfile(req, providerUserProfile, done);
		}
	));
};