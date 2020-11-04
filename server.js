const express = require('express');
const path = require('path');
const http = require('http');
const compression = require('compression')

const app = express();

app.use(compression());
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/WeatherApp'));

app.get('*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/WeatherApp/index.html'));
});

const port = process.env.PORT || 8000;
app.set('port', port);

const server = http.createServer(app);


// Start the app by listening on the default Heroku port
server.listen(port, () => console.log('server started'));