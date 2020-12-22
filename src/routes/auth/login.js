import * as api from 'api.js';

export function post(req, res) {
	//console.log('* >>> login post')
	const user = req.body;
	console.log('* >>> req.body = ', req.body)
	api.post('api/auth/login',  user ).then(response => {
		console.log('* >>> response = ', response)
		if (response.user) req.session.user = response.user;
		res.setHeader('Content-Type', 'application/json');

		res.end(JSON.stringify(response));
	});
}
