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
router.get('/', function(req, res, next) {
var date = new Date();
var datetime = date.getTime();
var age = req.cookies.agecheck;
if(age !== undefined){
var sort = req.query.sort;
if(sort == undefined){
sort = 'new';
}
var query = encodeURI(req.query.q + ' ' + serverData.keywordNg);
var options = {
url: 'http://affapi.duga.jp/search?version=1.1&appid='+conf.api.appid+'&agentid='+conf.api.agentid+'&bannerid=01&format=json&hits=50&adult=1&sort='+sort+'&category=01,100025,02,03,0303,09,10,11,12,1301,100021,0602,19,21,22,23,100009,100010,100032&keyword='+query,
method: 'GET',
json:true
}
request(options, function (error, response, body) {
var hits = body.hits;
var count = body.count;
if(count >= 1){
var max_page = Math.ceil(count / hits);
if(req.query.page !== undefined){
var page = req.query.page;
}else{
var page = 1;
}
if(page <= max_page){
var offset = ((page - 1)*50) + 1;
var options2 = {
url: 'http://affapi.duga.jp/search?version=1.1&appid='+conf.api.appid+'&agentid='+conf.api.agentid+'&bannerid=01&format=json&offset='+offset+'&hits=50&adult=1&sort='+sort+'&category=01,100025,02,03,0303,09,10,11,12,1301,100021,0602,19,21,22,23,100009,100010,100032&keyword='+query,
method: 'GET',
json:true
}
request(options2, function (error, response, body2) {
res.render('search',
{
videos: body2,
max_page: max_page,
page:page,
query: decodeURI(query).replace(' -スカトロ -SM -熟女 -浣腸 -辱め',''),
datetime:datetime,
sort:sort,
conf:conf,
serverData:serverData
}
);
});
}
}else{
res.render('search',
{
videos: null,
max_page: 0,
page:0,
query: "",
datetime:datetime,
sort:sort,
conf:conf,
serverData:serverData
}
);
}
});
}else{
res.render("age",{
conf:conf,
serverData:serverData
});
}
});

module.exports = router;
