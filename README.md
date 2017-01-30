# NicoNicoCommentScriptHtml5_FireFox<br>
<br>
導入:

javascript:(function(){var%20s=document.createElement('script');s.src='https://eneko0513.github.io/NicoNicoCommentScriptHtml5_FireFox/html5_nico_firefox.js';document.getElementsByTagName('head')[0].appendChild(s);})();

<br>上の文字列をコピーして、FireFoxのブックマークに追加(URLの部分に上の内容で他は適当に)<br><br>
使い方:<br>スクリプトを用いたい動画再生ページ上でブックマークに追加したスクリプトを選択<br>
プレイヤー下にテキストエリアとボタンが3種類表示される<br>
<br>
説明:<br>
<br>
 投下形式:<br>
 1.1行コメントモードのみ対応 
 example1) 
 [コマンド]コメント<br>コメント[tab]コメント 

 example2) 
 [コマンド]コメントコメントコメントコメントコメントコメントコメントコメント 
 75文字まで、それ以降はカットされて投稿される<br>
 <br>
 2.自動投下
 上記の1行形式が複数行入力されていれば コメントセット→2秒待機→投下　→　6秒待機　→コメントセット..　を
 コメントがなくなるまで入力を行う入力処理中は他処理を行わない 
 3.空行について
 空行がある場合、形式が違いますと表示されてしまうので空行が無い形で投下ボタンを押して下さい
 <br>
 ver0.1 : FireFox版とりあえず公開
