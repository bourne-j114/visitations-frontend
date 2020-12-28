import * as api from 'api.js';

export function post(req, res) {
    const location = req.body;
    console.log('* >>> req.body = ', req.body)
    api.post('prisons/update-location', location).then(response => {
        console.log('* >>> response = ', response)
        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify(response));
    });
}