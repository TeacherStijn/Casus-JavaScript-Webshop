"use strict";

/* Express web server instellen */
const express = require('express');
const server = express();

const cors = require('cors');
server.use(cors());
server.options('*', cors());	// voor nu even helemaal open zetten
server.use(express.static(__dirname));

const LOCAL_PORT = "1234";

let dataSet = [];

/* Webserver starten */
server.listen(LOCAL_PORT, function() {
    console.log('Server started!');	
});

/* POST bericht */
server.post('/bestel', function (request, response) {
    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data.toString();

            if (body.length > Math.pow(10,7)) // +/- 1.6 megaByte
                request.connection.destroy();
        });


        request.on('end', function () {
            body = JSON.parse(body);
            console.log(`Onvangen data: ${JSON.stringify(body)}`);
            response.send({ "Data ontvangen:": JSON.stringify(body) + " dank daarvoor!"});
        });
    }
});
