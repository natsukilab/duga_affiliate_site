var express = require('express');
var path = require('path');
var router = express.Router();
var request = require('request');
const yaml = require('js-yaml');
const fs = require('fs');
const serverConfPath = path.join(process.cwd(), 'config', 'server.yml');
const serverData = yaml.load(fs.readFileSync(serverConfPath, 'utf-8'));
const appConfPath = path.join(process.cwd(), 'config', 'default.yml');
const conf = yaml.load(fs.readFileSync(appConfPath, 'utf-8'));

/* GET home page. */
router.get('/:id', function(req, res, next) {
var date = new Date();
var datetime = date.getTime();
var options = {
url: 'http://affapi.duga.jp/search?version=1.1&appid='+conf.api.appid+'&agentid='+conf.api.agentid+'&bannerid=01&format=json&hits=40&adult=1&sort=release&keyword='+req.params.id,
method: 'GET',
json:true
}
request(options, function (error, response, body) {
res.render('twplayer',{
video:body,
datetime:datetime,
query:"",
conf:conf,
serverData:serverData
})
});
});
module.exports = router;