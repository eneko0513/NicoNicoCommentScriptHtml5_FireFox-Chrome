﻿# NicoNicoCommentScriptHtml5_FireFox&Chrome<br>
<br>
最終更新：2020/03/21  

■概要:  
このスクリプトは、ニコニコ動画のコメントを自動投稿をすることをメインの機能としたスクリプトです。  
**Firefoxでは投下機能のみサポートしています**  
**Chromeでは、コメント作成機能(下記のレイヤー管理機能の項目を参照)が使用できます。**


# サポート終了  
新しいやつ作ったりするのでサポートとしては今後は行いません。  

↓ここから古い情報

# 初回の使い方:  
```html
javascript:(function(){var%20s=document.createElement('script');s.src='https://eneko0513.github.io/NicoNicoCommentScriptHtml5_FireFox-Chrome/html5_nico_firefox.js';document.getElementsByTagName('head')[0].appendChild(s);})();
```
1. 上の文字列をコピーして、FireFoxかChromeのブックマークに追加(URLの部分に上の内容でタイトルは適当に)  
※呼び出したのに検索結果に飛んでしまう場合は、URLの先頭の「**javascript:**」が消えていないか確認して下さい。  
稀にブラウザによっては、先頭のjavascript:が消されてしまう時があるらしいとのことです。    
[![https://gyazo.com/cf6eaad3811f438b7a1a5bf716897e00](https://i.gyazo.com/cf6eaad3811f438b7a1a5bf716897e00.gif)](https://gyazo.com/cf6eaad3811f438b7a1a5bf716897e00)<br>
※Chromeでの登録の例

　また、ブックマーク登録時に半角文字が全角になってしまう問題が発生している環境があるようです。  
　起動ができない場合はその点のご確認もお願いいたします。

2. HTML5プレイヤーの動画再生画面上で１で登録したブックマークを選択して下さい
3. プレイヤー下部に新規でウィンドウが表示されます

<h2>特徴</h2>
<ol>
 	<li>レイヤー管理機能</li>
 	<li>画像読み込み機能</li>
 	<li>レイヤー保存機能</li>
 	<li>レイヤー復元機能</li>
 	<li>自動バックアップ機能</li>
 	<li>ページ遷移時のアラート表示機能</li>
</ol>
<h3>■レイヤー管理機能</h3>
<img src="https://i.gyazo.com/a450011985b279216dd30163cfa2d360.png" />

画面下部がスクリプトを実行した際に表示されるウィンドウとなります。

基本的な操作の流れは、左下にある「レイヤー追加」ボタンを押下するとレイヤーが作成されます。

セレクトボックス内のテンプレートのフォーマットでレイヤーが作成されると、動画画面上にテキストエリアが表示されるようになります。

補助的な機能として下記の内容があります。
<ul>
 	<li>選択したレイヤーの文字色の変更（画像読み込みした内容に対して）</li>
 	<li>レイヤーへの名前の設定</li>
 	<li>レイヤーの表示切り替え</li>
 	<li>レイヤーの表示順番の変更</li>
 	<li>レイヤーの削除</li>
</ul>
<h3>■画像読み込み機能</h3>
画像読み込みボタンを押下するとファイル選択ダイアログが表示されます。

<img src="https://i.gyazo.com/9457051097cdd52ffa4c22d1f94e9c8a.png" />画像を選択して開くことで、動画再生画面の部分に画像が読み込まれます。
<h4>■読み込み後</h4>
<img src="https://i.gyazo.com/9f31fd3acba97aae5655a07c36aa55ae.png" />

白背景画像を読み込んだので上のように表示されました。
<h3>■レイヤー保存機能</h3>
作成途中にどうしてもブラウザを閉じる必要や、飽きてしまったが途中まで作成したので残しておきたい（可能ならまた途中から作りたい）という場合は、レイヤー保存機能を押下することで復元用のテキストが出力されます。

<img src="https://i.gyazo.com/610f875f69caa779451e39c4e8611d0b.png" />

画面右側のテキストエリアに復元用のテキストデータが表示されました。
<h4>■出力テキストの情報</h4>
<img src="https://i.gyazo.com/17818d1b78371f70f4aba45399d792d3.png" />
<ul>
 	<li>layerId -&gt; レイヤーの固有の番号です。</li>
 	<li>html -&gt; レイヤー一覧ボックスに表示されるテキスト情報です。</li>
 	<li>visible -&gt; レイヤーの表示の設定です。　● -&gt; 表示　○ -&gt; 非表示</li>
 	<li>value -&gt; 表には出てこない情報です。</li>
 	<li>textValue -&gt; テキスト情報です。</li>
</ul>
基本的には設定は変更しないようにして、やむを得ず変更する場合はカラーコードとtextValueのみ変更してください。

それ以外の箇所を変更した場合は動作がおかしくなる可能性があります。
<h3>■レイヤー復元機能</h3>
レイヤー保存機能で出力されたテキストを元に復元することができます。

<img src="https://i.gyazo.com/c02a008fb1f85ac32641cc6cfd010874.gif" />
<h3>■自動バックアップ機能</h3>
突然のクラッシュや、レイヤー保存をしていない状態でブラウザを閉じてしまった場合などの緊急対処として一定操作ごとに自動バックアップを行います。

復元内容が存在していれば、バックアップ復元ボタンを押下することでテキストの内容が出力されます。

<img src="https://i.gyazo.com/6d9d60b6eaaff5d162418961180fa769.gif" />

ただし、タイミング次第では保存がされないこともあるかもしれないので、定期的なバックアップのほどお願いします。また、色情報などが破損してしまう可能性があります。その際は色情報などの再設定をしてください。
<h3>■ページ遷移時のアラート表示</h3>
<img src="https://i.gyazo.com/d6eede8511b9959946a42814d53f90d5.gif" />

スクリプト起動中は、ページ遷移時にアラートを表示します。誤遷移の防止にお使いください。  

また、ご不明点やバグがございましたらぜひご連絡お願いします。

連絡先：<a href="https://twitter.com/ene_KoH0513_CA">@ene_KoH0513_CA</a> または <a href="https://twitter.com/ene_KoH0513">@ene_KoH0513</a>
