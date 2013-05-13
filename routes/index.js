
/*
 * GET home page.
 */
var config = require('../config');
var db = require('../db');
var _ = require('underscore');

exports.index = function(req, res){
  var user = req.session.user;
  var options = {
    title: 'DnsGit',
    brand: 'DnsGit',
    login_url: config.login_url,
    user: null,
    navigation: ''
  };
  if (user) {

    db.getUser(user.id, function(err, docs) {
      if (docs && docs.length) {
        req.session.user.gitrep = docs[0].gitrep;
      }
      _.extend(options, {
        user: req.session.user
      });
      res.render('index', options);
    }); 
  } else {
    res.render('index', options);
  }
};

