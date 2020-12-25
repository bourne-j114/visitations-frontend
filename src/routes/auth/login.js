import * as api from 'api.js';

export function post(req, res) {
    const user = req.body;
    console.log('* >>> req.body = ', req.body)
    api.post('auth/login', user).then(response => {
        console.log('* >>> response = ', response)
        if (response.user) req.session.user = response.user;
        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify(response));
    });
}