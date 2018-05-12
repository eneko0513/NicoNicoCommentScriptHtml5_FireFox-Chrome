# NicoNicoCommentScriptHtml5_FireFox&Chrome<br>
<br>
最終更新：2018/05/12  

使い方：<br>
javascript:(function(){var%20s=document.createElement('script');s.src='https://eneko0513.github.io/NicoNicoCommentScriptHtml5_FireFox-Chrome/html5_nico_firefox.js';document.getElementsByTagName('head')[0].appendChild(s);})();



初回の使い方:  
1. 上の文字列をコピーして、FireFoxかChromeのブックマークに追加(URLの部分に上の内容でタイトルは適当に)  
※呼び出したのに検索結果に飛んでしまう場合は、URLの先頭の「**javascript:**」が消えていないか確認して下さい。  
稀にブラウザによっては、先頭のjavascript:が消されてしまう時があるらしいとのことです。  

2. HTML5プレイヤーの動画再生画面上で１で登録したブックマークを選択して下さい
3. プレイヤー下部に新規でウィンドウが表示されます


説明:
 投下形式:  
 ①1行コメントモードのみ対応 <br>
 example1) <br>
 [コマンド]コメント<ｂｒ><ｂｒ>コメント[tab]コメント<br>  

 example2) <br>
 [コマンド]コメントコメントコメントコメントコメントコメントコメントコメント  
 75文字または1024文字まで、モード時の上限数を超えていたら投下できません。  
 ※投稿者コメントモードでは1024文字まで対応, また75文字突破ボタンを選択すると1024文字まで一般コメでも投下可能

 ②自動投下<br>
 上記の1行形式が複数行入力されていれば コメントセット→6秒待機→投下　→　6秒待機　→コメントセット..　をします<br>
 コメントがなくなるまで入力を行う入力処理中は他処理を行いません。  
 ※投稿者モードの場合は2.5秒間隔で待機、投下をします。

 ③空行について<br>
 空行がある場合、形式が違いますと表示されてしまうので空行が無い形で投下ボタンを押して下さい  

 作成者＆連絡先：@ene_KoH0513_CA  