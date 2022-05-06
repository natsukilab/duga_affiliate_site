var express = require('express');
var path = require('path');
var router = express.Router();
const marked = require("marked");
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
fs.readFile('./views/about/about.md', { encoding: "utf8" }, (err, file) => {
if (err) {
console.error(err.message);
process.exit(1);
return;
}
// MarkdownファイルをHTML文字列に変換する
var html = marked.parse(file);
if(conf.app.name === null){
html = html.replaceAll("{SITENAME}",serverData.app.name).replaceAll("{agentId}",conf.api.agentid).replaceAll("{bannerId}",conf.api.bannerid);
}else{
html = html.replaceAll("{SITENAME}",conf.app.name).replaceAll("{agentId}",conf.api.agentid).replaceAll("{bannerId}",conf.api.bannerid);
}
res.render('about/about',
{
about:html,
query:'',
labelid:req.params.id,
datetime:datetime,
conf:conf,
serverData:serverData
}
);
});
}else{
res.render("age",{
conf:conf,
serverData:serverData
});
}
});

module.exports = router;
