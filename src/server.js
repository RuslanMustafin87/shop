const http = require('http');
const server = new http.Server();
const port = process.env.PORT || 8080;
// const debug = require('winston');

server.listen(port, (err) => {
	if (err) {
		return console.log('something bad happened', err);
	}
	console.log(`server is listening on ${port}`);
});

server.on('request', (req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('yes');
});
