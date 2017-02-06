# NicoNicoCommentScriptHtml5_FireFox&Chrome<br>
<br>
導入:<br>
正式版：<br>
javascript:(function(){var%20s=document.createElement('script');s.src='https://eneko0513.github.io/NicoNicoCommentScriptHtml5_FireFox-Chrome/html5_nico_firefox.js';document.getElementsByTagName('head')[0].appendChild(s);})();

<br>上の文字列をコピーして、FireFoxかChromeのブックマークに追加(URLの部分に上の内容で他は適当に)<br><br>
使い方:<br>スクリプトを用いたい動画再生ページ上でブックマークに追加したスクリプトを選択<br>
プレイヤー下にテキストエリアとボタンが4種類表示される<br>
<br>
説明:<br>
<br>
 投下形式:<br>
 1.1行コメントモードのみ対応 <br>
 example1) <br>
 [コマンド]コメント\<br>コメント[tab]コメント<br>
<br>
 example2) <br>
 [コマンド]コメントコメントコメントコメントコメントコメントコメントコメント <br>
 75文字まで、それ以降はカットされて投稿される<br>
 <br>
 2.自動投下<br>
 上記の1行形式が複数行入力されていれば コメントセット→2秒待機→投下　→　6秒待機　→コメントセット..　を<br>
 コメントがなくなるまで入力を行う入力処理中は他処理を行わない <br>
 3.空行について<br>
 空行がある場合、形式が違いますと表示されてしまうので空行が無い形で投下ボタンを押して下さい<br>
 <br>
 4.どーも形式->1行形式変換<br>
 <br>
 small ue #FFFFFF<br>
 ああああ<br>
 　ああああ<br>
  <br>
 という形式のテキストがあった場合、上のテキストをテキストエリアに追加した状態で変換ボタンを実行すると<br>
 [small ue #FFFFFF]ああああ\<br>　ああああ\<br><br>
 という形式に変換される。その状態でのみ投下が可能。<br>
 ※注意:<br>
 コマンドの最初が サイズ、最後が #カラーコード でないと正常に変換されない<br>
 example)small ue mincho full #ff00ff -> small , #ff00ffでサイズと色が最初と最後についている形式<br>
 ue mincho #ff00ff -> 最初がueなので正常に変換されないので注意<br>
 <br>
 ver0.1 : FireFox&Chrome版とりあえず公開<br>
 ver0.2 : 184投下切り替え機能追加<br>
 ver0.3 : 逆から投下機能追加<br>
 ver0.4 : コマンドに全角文字が含まれていた場合にエラーになる不具合の修正<br>
 ver0.5 : 逆から投下の末尾に改行が存在していた場合にエラーになる不具合の修正<br>
 ver0.6 : 75文字をオーバーしたコメントがある場合はアラートを表示し、コメント投下しない形式に変更
<br>
---<br>

<br>
<br>
