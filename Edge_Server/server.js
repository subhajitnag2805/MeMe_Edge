var express = require('express');
var mongoose = require('mongoose');
var SerialPort = require('serialport');
var cors = require('cors');
const Readline = SerialPort.parsers.Readline;

var app = express();

const Test = require('./models/testOne');

//connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/MeMeEdge');

//on successful connection
mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb!!');
});

//on error
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error in db is :' + err);
    }
});

app.use(cors());

var port = new SerialPort('/dev/ttyACM0', {
    baudRate: 9600
});

const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

// Capturing data that comes from Arduino and store it into mongodB
parser.on('data', function (data) {
    let dataOne = new Test({
        value: data
    });
    let dataResponse = {};
    dataOne.save((error, result) => {
        if (error) {
            // dataResponse.error = true;
            // dataResponse.message = `Error :` + error.message;
            // response.status(404).json(dataResponse);
        } else if (result) {
            console.log("result :",result);
            // dataResponse.error = false;
            // dataResponse.ArduinoData = result;
            // dataResponse.message = `Arduino data Stored.`;
            // response.status(200).json(dataResponse);
        }
    });
});

//Getting data
app.get('/dataDetails', (request, response) => {
    let dataResponse = {};

    Test.find((error, result) => {
        if (error) {
            dataResponse.error = true;
            dataResponse.message = `Error :` + error.message;
            response.status(404).json(dataResponse);
        }
        else if (result) {
            dataResponse.error = false;
            dataResponse.ArduinoData = result;
            dataResponse.message = `Arduino data.`;
            response.status(200).json(dataResponse);
        }
    });
});

//port no
const PORT = 7000;

app.listen(PORT, () => {
    console.log('server started at port :' + PORT);
});
