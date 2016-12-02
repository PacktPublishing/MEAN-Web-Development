module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		files: [
			'node_modules/systemjs/dist/system.js',
			'node_modules/systemjs/dist/system-polyfills.js',
			'node_modules/core-js/client/shim.min.js',
			'node_modules/reflect-metadata/Reflect.js',
			'node_modules/zone.js/dist/zone.js',
			'node_modules/zone.js/dist/long-stack-trace-zone.js',
			'node_modules/zone.js/dist/proxy.js',
			'node_modules/zone.js/dist/sync-test.js',
			'node_modules/zone.js/dist/jasmine-patch.js',
			'node_modules/zone.js/dist/async-test.js',
			'node_modules/zone.js/dist/fake-async-test.js',
		
			{ pattern: 'public/systemjs.config.js', served: true, included: false, watched: false },
			{ pattern: 'public/app/**/*.*', served: true, included: false, watched: false },
			{ pattern: 'node_modules/rxjs/**/*.js', served: true, included: false, watched: false },
			{ pattern: 'node_modules/@angular/**/*.js', served: true,included: false, watched: false },
		
			'karma.shim.js',
		],
		proxies: {
			'/lib/': '/base/node_modules/',
			'/app/': '/base/public/app/',
		},
		reporters: ['progress'],
		browsers: ['PhantomJS'],
		captureTimeout: 60000,
		singleRun: true
	});
};