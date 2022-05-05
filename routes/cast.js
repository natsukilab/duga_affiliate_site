var express = require('express');
var path = require('path');
var router = express.Router();
var request = require('request');
const yaml = require('js-yaml');
const fs = require('fs');
const { encode } = require('punycode');
const serverConfPath = path.join(process.cwd(), 'config', 'server.yml');
const serverData = yaml.load(fs.readFileSync(serverConfPath, 'utf-8'));
const appConfPath = path.join(process.cwd(), 'config', 'default.yml');
const conf = yaml.load(fs.readFileSync(appConfPath, 'utf-8'));

/* GET home page. */
router.get('/:id/:name', function(req, res, next) {
var date = new Date();
var datetime = date.getTime();
var age = req.cookies.agecheck;
if(age !== undefined){
var sort = req.query.sort;
if(sort == undefined){
sort = 'new';
}
var options = {
url: 'http://affapi.duga.jp/search?version=1.2&appid='+conf.api.appid+'&agentid='+conf.api.agentid+'&bannerid=01&format=json&hits=40&adult=1&sort='+sort+'&performerid='+req.params.id,
method: 'GET',
json:true
}
request(options, function (error, response, body) {
var hits = body.hits;
// データの個数を入れる
var count = body.count;
// データ個数 ÷ 1ページに表示するデータ数 (端数の切り上げ)
var max_page = Math.ceil(count / hits);
if(req.query.page !== undefined){
var page = req.query.page;
}else{
var page = 1;
}
if(page <= max_page){
var offset = ((page - 1)*40) + 1;
var options2 = {
url: 'http://affapi.duga.jp/search?version=1.2&appid='+conf.api.appid+'&agentid='+conf.api.agentid+'&bannerid=01&format=json&offset='+offset+'&hits=40&adult=1&sort='+sort+'&performerid='+req.params.id,
method: 'GET',
json:true
}
request(options2, function (error, response, body2) {
res.render('cast',
{
videos: body2,
max_page: max_page,
page:page,
query:'',
castid:req.params.id,
castName:req.params.name,
datetime:datetime,
sort:sort,
conf:conf,
serverData:serverData
}
);
});
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
