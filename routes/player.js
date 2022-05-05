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
router.get('/:id', function(req, res, next) {
var date = new Date();
var datetime = date.getTime();
var duga_option1 = {
version: '1.2',
format: 'json',
hits: 40,
offset: 0,
adult: 1,
keyword: req.params.id,
}
duga.search(duga_option1,function(data){
res.render('twplayer',{
video:data,
datetime:datetime,
query:"",
conf:conf,
serverData:serverData
})
});
});
module.exports = router;