var express = require('express')
var router = express.Router()
var merge = require('merge')

// Route index page
router.get('/', function (req, res) {
  res.render('index');
})

router.get('/reset', function(req, res, next)
{
  req.session.destroy();
  console.log('clearing session');
  res.redirect('/');
  next();
});

router.get(/(v\d$)/,function(req,res)
{
  var path = (req.params[0]);
  res.redirect(path+'/');
});

/*
  Redirect all posts to gets.
*/
router.post(/^\/([^.]+)$/, function (req, res) {

  var path = (req.params[0]);
  req.session.data = req.session.data || {};
  req.session.data = merge(req.session.data,req.body);

  var data;

  if (Object.keys(req.query).length !== 0) { data = req.query; }
  else if (Object.keys(req.body).length !== 0) { data = req.body; }

  if (data !== undefined) {
    for (var key in data) {
      var match = data[key].match(/^redirect\(([^\)]*)\)/);
      if (match !== null ) {
        console.log("redirecting to: "+match[1]);
        res.redirect(match[1]);
      }
    }
  }

  res.redirect('/'+path);
});

// add your routes here
module.exports = router
