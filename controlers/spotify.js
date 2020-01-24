
const request = require('request');

function getTokenSpotify(req, resp)
{
	let client_id = req.params.client_id;
    let client_secret = req.params.client_secret;
	let spotifyUrl = 'https://accounts.spotify.com/api/token';
	
	var authOptions = {
        url: spotifyUrl,
        headers: {
            Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64')
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
	};
	
	request.post(authOptions, (err, httpResponse, body) => {

        if (err) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'No se pudo obtener el token',
                err
            })
        }

        resp.json(body);

    });
}

module.exports = { getTokenSpotify };