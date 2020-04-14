# swagger のお勉強

## 事の顛末

どの案件でも、大なり小なり Database （以降 DB）とのやりとりがあって、DB があると大概、管理画面というものが存在する。

で、管理画面が存在すると、ウチ（CODIANZ）の場合、RESTful API （以降 RESTAPI）をどこかに実装する。（Serverless だったり、そうじゃなかったり）

ほんで、今までだと O/R Mapper （以降 ORM）を使いたいんで Model を作るようになった（Modelは作るとご利益があるのは知っているが面倒だったりする [^1]）けど、RESTAPI のドキュメントはこの世に存在していない。

最近では、Visual Studio Code （以降 VSCode） の "REST Client" なる機能拡張を入れて、http ファイルをこさえて、「こんな感じで呼べまっせ」的なものを作るようになったけど、それでも、「RESTAPIの仕様は http ファイルと、ORM の Model 見てね。あ、最悪コード見てね💛」的なスパルタ状態だったりする。

そんな中、●●君（以降　かっちゃん）が、swagger なるものを提案。

見てみると、「なかなか面白そう」って事で、調べてみました。


[^1]: なんせ、C++でreactive使ってboostでメタプログラミングなんかやっていると、header変更で芋づるビルドが発生した日にゃ、コーヒー３杯くらい飲めるからね。


## このプロジェクトは

* VSCode で [swagger](https://marketplace.visualstudio.com/items?itemName=Arjun.swagger-viewer)をインストール。
* コンソールを開いて、いつも通り、```npm i```したら [F5] キーで実行。
* すると http://localhost:10080 が開きます。
* api.yml を開いて [shift] + [alt] + P を押す。
  * すると何かカッコイイ画面が開くので、それがAPI仕様書で、しかも実行できたりします。
* 写経の元になったプロジェクトはSQLite使っていたけど、面倒だったので、配列でやってみた。（ら、余計面倒だった罠）
* あと、写経の元になっていたプロジェクトは諸々問題があったので適宜修正している。


## 何となく分かったこと

* yaml か json で作成した schema から、コード展開できるかも。
  * 今日はどんな感じで動くか知りたかったので、写経と改造してみた。
* MVC 構成で、Model と Controller を実装する感じ。
* Microsoft Entity Framework のアレとは違い、コードから勝手に API 仕様ページを生成してくれるものではなく、仕様のネタを書くと仕様書とコードができるイメージ。
  * 考えてみれば、その方が、環境に依存しないものになるのでメリット大きい。（コードは必須だけどね）
* nodejs の場合、express にプラグイン（という表現が正しいか不明）して、schema を喰わせれば、パラメータのチェックをしてくれる優れモノ。
  * あ、でも、DB の attribute には展開されないので、それは自力でガリガリ書くけど。

## 次にやること

* 何となく動きは分かったけど、この eco system は一般的にどういう手順で作るんだ？


## 結論

採用


## 参考にさせていただいたもの

* https://github.com/BcRikko/express-openapi-sample
* https://kuroeveryday.blogspot.com/2017/05/express-openapi-with-typescript.html



