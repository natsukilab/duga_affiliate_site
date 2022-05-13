# DUGA AFFILIATE SITE

## DEMO

オリジナルnpmパッケージ duga-search を活用したデモサイトを下記URLにて運営しております。

https://oppai.love

## Features

誰でも簡単にアフィリエイトサイトの作成ができることを目的としています。

duga-search というnpmパッケージは、DUGA様が提供しているWEBサービスAPIを使用した商品情報検索に特化したパッケージです。

動画検索サイトのようなサイトデザインによるアフィリエイトサイトの構築が簡単にできるように制作しています。

# Usage

DEMOの実行方法など、"hoge"の基本的な使い方を説明する

```bash
git clone https://github.com/natsukilab/duga_affiliate_site #git clone
cd duga_affiliate_site #ディレクトリ移動
yarn #npmパッケージのインストール
cp config/example.yml config/default.yml #設定サンプルファイルをコピー
nano config/default.yml #設定ファイルを編集
```

設定ファイルは下記の内容になります

```
app:
    url: http://localhost/ (あなたが使用するURLに変更)
    name: DUGA AFFILIATE SITE (あなたが使用するサイト名に変更)
#DUGAウェブサービスのAPIアクセス情報
api:
    appid: 
    agentid: 
    bannerid:
```

# Note

当リポジトリで使用しているduga-searchは、予告なく仕様が変更になることがございます。

変更した段階で、当リポジトリもアップデートを行います。

# Author

* 作成者：月城 夏葵

* https://twitter.com/natsukilab

# License

[MIT license](https://en.wikipedia.org/wiki/MIT_License).