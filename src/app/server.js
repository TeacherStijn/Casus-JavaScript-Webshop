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