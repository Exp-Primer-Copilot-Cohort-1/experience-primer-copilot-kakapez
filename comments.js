//create web server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//create database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comment');

