// load the things we need
var bodyParser = require('body-parser');
var connect = require('connect');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/ngos'); 
var express = require('express');
var app = express();


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// index page 
app.get('/', function(req, res) {
    res.render('index');
});

// use res.render to load up an ejs view file
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//MongoDB setup
var ngoSchema = new mongoose.Schema({  
  title: String,
  address: String,
  description: String,
  contact: String },
  { collection: 'ngolist'});

var ngo = mongoose.model('ngo', ngoSchema);


//search request
app.post('/',function(req, res){

	var req_locality = req.body.locality;
	var req_interest = req.body.interest;

	console.log(req.body);
	
	ngo.find( { "locality": req_locality } , function(err, doc) {
  		if (err) return console.log(err);
  			// console.dir(doc);
        // res.render('ngo', { docs: doc });

        for (var i = 0; i < doc.length; i++) {          
            var title_doc = doc[i].title;
            var address_doc = doc[i].address;
            var description_doc = doc[i].description;
            var contact_doc = doc[i].contact;

            res.render('ngo', {title: title_doc, address: address_doc, 
            description: description_doc, contact: contact_doc });
        }
	});


});

app.post('ngo',function(req, res){

  var req_locality = req.body.locality;
  var req_interest = req.body.interest;

  console.log(req.body);
  
  ngo.find( { "locality": req_locality } , function(err, doc) {
      if (err) return console.log(err);
        // console.dir(doc);
        // res.render('ngo', { docs: doc });

        for (var i = 0; i < doc.length; i++) {          
            var title_doc = doc[i].title;
            var address_doc = doc[i].address;
            var description_doc = doc[i].description;
            var contact_doc = doc[i].contact;

            res.render('ngo', {title: title_doc, address: address_doc, 
            description: description_doc, contact: contact_doc });
        }
  });


});

app.listen(9000);
console.log('Project started at http://127.0.0.1:9000');
