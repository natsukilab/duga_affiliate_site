var express = require('express');
var path = require('path');
var router = express.Router();
const yaml = require('js-yaml');
const fs = require('fs');
const serverConfPath = path.join(process.cwd(), 'config', 'server.yml');
const serverData = yaml.load(fs.readFileSync(serverConfPath, 'utf-8'));
const appConfPath = path.join(process.cwd(), 'config', 'default.yml');
const conf = yaml.load(fs.readFileSync(appConfPath, 'utf-8'));
//DUGA動画検索
var DugaSearch = require("duga-search");
var duga_api = {
appid: conf.api.appid,
agentid: conf.api.agentid,
bannerid: conf.api.bannerid,
}
var duga = new DugaSearch(duga_api);

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
var duga_option1 = {
version: '1.2',
format: 'json',
hits: 40,
offset: 0,
adult: 1,
sort: sort,
category: '01,100025,02,03,0303,09,10,11,12,1301,100021,0602,19,21,22,23,100009,100010,100032',
keyword: encodeURI(serverData.keywordNg),
}
duga.search(duga_option1,function(data){
var hits = data.hits;
// データの個数を入れる
var count = data.count;
// データ個数 ÷ 1ページに表示するデータ数 (端数の切り上げ)
var max_page = Math.ceil(count / hits);
if(req.query.page !== undefined){
var page = req.query.page;
}else{
var page = 1;
}
if(page <= max_page){
var offset = ((page - 1)*40) + 1;
var duga_option2 = {
version: '1.2',
format: 'json',
hits: 40,
offset: offset,
adult: 1,
sort: sort,
category: '01,100025,02,03,0303,09,11,12,1301,100021,0602,19,21,22,23,100009,100010,100032',
keyword: encodeURI(serverData.keywordNg),
}
duga.search(duga_option2,function(data2){
res.render('index',
{
videos: data2,
max_page: max_page,
page:page,
query:'',
labelid:req.params.id,
datetime:datetime,
sort:sort,
conf:conf,
serverData:serverData
}
);
});
}
})
}else{
res.render("age",{
conf:conf,
serverData:serverData
});
}
});

module.exports = router;
