var express = require('express')
var router = express.Router()
var merge = require('merge')
var tog = require('../lib/tog.js')
var path = require('path')

// Route index page
router.get('/', function (req, res) {
  res.render('index');
})

router.get('*', function (req, res, next) {
  req.data = req.data || { };
  req.data.path = path.dirname(req.params[0]).substr(1);
  next();
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
router.post(/^\/([^.]+)$/, function (req, res, next) {

  var path = (req.params[0]);
  req.session.data = req.session.data || {};
  req.session.data = merge(req.session.data,req.body);

  var data;

  if (Object.keys(req.query).length !== 0) { data = req.query; }
  else if (Object.keys(req.body).length !== 0) { data = req.body; }

  var redirect_path = "/"+path;

  if (data !== undefined)
  {
    for (var key in data) {
      if (typeof data[key] == 'string')
      {
        var match = data[key].match(/^redirect\(([^\)]*)\)/);
        if (match !== null )
        {
          console.log("redirecting to: "+match[1]);
          redirect_path = match[1];
        }
      }
    }
  }

  res.redirect(redirect_path);
});

// add your routes here
module.exports = router
