module.exports = {
	'/api/*': {
		target: 'http://localhost:10001',
		secure: false,
        logLevel: 'debug',
    },
}
