module.exports = function(express, mongodb){
    var mongo = mongodb.MongoClient;
    var valid = require('valid-url');
    var app = express();
    var db = process.env.MONGOLAB_URI;
    
    app.set('view engine', 'pug');
    app.set('views', __dirname + '/views/');
    app.get('/', function(req, res) {
        res.render('index');
    });
    
    app.get('/:id', function(req, res){
        var error;
        mongo.connect(db, function(err, db){
            if(!err){
                var collection = db.collection('urls');
                collection.findOne({short_url:+req.params.id}, function(err, data){
                    if(!err){
                        if(data){
                            res.redirect(data['original_url']);
                            
                        } else {
                            error = {error:"Could not find url"};
                            res.json(error);// send();
                        }
                    } else {
                        error = {error:"Error occurred while processing request."};
                        res.json(error);
                    }
                });
            } else {
                error = {error:"Could not connect to database"};
                res.json(error);
            }
        });
    });
    
    app.get('/new/:url*', function(req, res){
        var url = req.url.slice(5);
        var error;
        if(valid.isUri(url)){
            mongo.connect(db, function(err, db){
            if(!err){
                var collection = db.collection('urls');
                var shortID = Math.floor(100000 + Math.random() * 900000);
                var newEntry = {original_url:url, short_url:shortID};
                
                collection.insert(newEntry, function(err, data){
                    if(!err){
                        res.json(newEntry)
                    } else {
                        error = {error:"Failed to insert new URL into Database " + err};
                        res.json(error);
                    }
                });
                db.close();
            } else {
                error = {error:"Could not connect to DB"};
                res.json(error);
            }
        });
        } else {
            error = {error:"Invalid URL"};
            res.json(error);
        }
        
    });
    return app;
};