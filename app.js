var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var path = require("path");
var app = express();

app.use(express.static('.'));
app.use(bodyParser.urlencoded({extended: true}));

/** Handlebars template */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


/** Create dummy database */
var db = new sqlite3.Database(':memory:');
db.serialize(function() {
    db.run("CREATE TABLE user (username TEXT, password TEXT, name TEXT)");
    db.run("INSERT INTO user VALUES ('admin', 'admin123', 'Administrator')");
    db.run("INSERT INTO user VALUES ('hpotter', 'Alohomora', 'HJ Potts')");
    db.run("INSERT INTO user VALUES ('albus', 'hogwarts123', 'albus dumbledore')");
    db.run("INSERT INTO user VALUES ('ssnape', 'Pure-blood', 'Severus Snape')");

    db.run("CREATE TABLE products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, coins INTEGER)");
    db.run("INSERT INTO products (name, description, coins) VALUES ('Nimbus 2000', 'Good broom', 1000)");
    db.run("INSERT INTO products (name, description, coins) VALUES ('Firebolt', 'Better broom', 2000)");
    db.run("INSERT INTO products (name, description, coins) VALUES ('Radley Stowe Angle Broom and Dustpan Set (Grey)', 'Non-flying broom', 20)");
    db.run("INSERT INTO products (name, description, coins) VALUES ('Quidditch set v2', 'Full set ready to play', 100)");
    db.run("INSERT INTO products (name, description, coins) VALUES ('Elder Wand', 'Requires setup', 100000)");
    db.run("INSERT INTO products (name, description, coins) VALUES ('Bertie Botts Every Flavor Beans', 'one of the most popular sweets in the wizarding world.', 30)");
    db.run("INSERT INTO products (name, description, coins) VALUES ('Chocolate Frogs', 'Very popular sweet made from chocolate in the form of a frog. They come with a collectible card of a famous witch or wizard in each pack. The frogs are made of seventy percent Croakoa. Presumably, this substance is what allows them to act like an actual frog.', 20)");
});

/** App endpoints */
app.post('/login', function (req, res) {
    var username = req.body.username; // a valid username is admin
    var password = req.body.password; // a valid password is admin123
    var query = "SELECT name FROM user WHERE username = '" + username + "' AND password = '" + password + "'";

    console.log("[LOGIN] username/password: " + username + "/" + password);
    console.log("[LOGIN] query: " + query);
    
    db.get(query , function(err, row) {

        if(err) {
            console.log('[ERROR]', err);
            res.redirect("#error");
        } else if (!row) {
            res.redirect("#unauthorized");
        } else {
            res.send('Hello <b>' + row.name + '</b><br /><a href="/">Go back to login</a>');
        }
    });

});
app.get('/login', function (req, res) {
    res.status(200).sendFile(__dirname + '/views/login.html');
});

app.post('/', function (req, res) {
    var term = req.body.term; // the search term
    var query = "SELECT * FROM products WHERE name LIKE '%" + term + "%'";

    console.log("[SEARCH] term: " + term);
    console.log("[SEARCH] query: " + query);
    
    db.all(query , function(err, rows) {
        if(err) {
            console.log('[ERROR]', err);
            res.redirect("#error");
        } else {
            res.render('search', {products: rows, term: term});
        }
    });
});
app.get('/', function (req, res) {
    res.render('search');
});

/** Bind to port number */
app.listen(3000);