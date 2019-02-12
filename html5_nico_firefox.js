javascript: (function (f, dd) {
	dd = document.createElement("script");
	dd.src = "//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
	dd.onload = function () {
		f(jQuery.noConflict(true))
	};
	document.body.appendChild(dd)
})(function ($) {
	//$('div.NicoenqueteNotificationContainer').load("https://eneko0513.github.io/NicoNicoCommentTools/General.js");

	/*----------------------------------------------------------------------------------------------------
	[グローバル変数]
	----------------------------------------------------------------------------------------------------*/
	var CommentMaxLengthNormal = 75;
	var CommentMaxLengthAdmin = 1024;
	var CommentLimit = 0;

	var ModeAdmin = false;
	var AllPostNow = false;
	var CommentLimitOver = false;

	/*----------------------------------------------------------------------------------------------------
	[コンポーネント, CSSの配置]
	----------------------------------------------------------------------------------------------------*/
	$('div.NicoenqueteNotificationContainer').before("<style type='text/css'>" +
		".tab_wrap{" +
		"  margin:10px auto;" +
		"  }" +
		"  input[type='radio']{" +
		"	display:none;" +
		"  }" +
		"  .tab_area{" +
		"	font-size:0;" +
		"	margin:0 10px;" +
		"  }" +
		"  .tab_area label{" +
		"	width:150px;" +
		"	margin:0 5px;" +
		"	display:inline-block;" +
		"	padding:12px 0;" +
		"	color:#999;" +
		"	background:#ddd;" +
		"	text-align:center;" +
		"	font-size:13px;" +
		"	cursor:pointer;" +
		"	transition:ease 0.2s opacity;" +
		"	user-select: none; /* CSS3 */" +
		"	-webkit-user-select: none; /* Safari、Chromeなど */" +
		"  }" +
		"  .tab_area label:hover{" +
		"	opacity:0.5;" +
		"  }" +
		"  .panel_area{" +
		"	background:#fff;" +
		"  }" +
		"  .tab_panel{" +
		"	width:100%;" +
		"	padding:10px 0;" +
		"	padding-bottom: 50px;" +
		"	display:none;" +
		"	background-color: #b9b9b9;" +
		"  }" +
		"  .tab_panel p{" +
		"	font-size:14px;" +
		"	letter-spacing:1px;" +
		"	text-align:center;" +
		"  }" +
		"  #tab1:checked ~ .tab_area .tab1_label{" +
		"	background:#fff;" +
		"	color:#000;" +
		"  }" +
		"  #tab1:checked ~ .panel_area #panel1{" +
		"	display:block;" +
		"  }" +
		"  #tab2:checked ~ .tab_area .tab2_label{" +
		"	background:#fff;" +
		"	color:#000;" +
		"  }" +
		"  #tab2:checked ~ .panel_area #panel2{" +
		"	display:block;" +
		"  }" +
		"  #tab3:checked ~ .tab_area .tab3_label{" +
		"	background:#fff;" +
		"	color:#000;" +
		"  }" +
		"  #tab3:checked ~ .panel_area #panel3{" +
		"	display:block;" +
		"  }" +
		"  #tab4:checked ~ .tab_area .tab4_label{" +
		"	background:#fff;" +
		"	color:#000;" +
		"  }" +
		"  #tab4:checked ~ .panel_area #panel4{" +
		"	display:block;" +
		"  }" +
		"  " +
		"  input[type='checkbox'] {" +
		"	display: none; 	/* チェックボックスを非表示にする */" +
		"  }" +
		"  " +
		"  " +
		"  input[type='button'] {" +
		"	display: none; 	/* チェックボックスを非表示にする */" +
		"  }" +
		"  " +
		"  .label:hover {" +
		"	background-color: #E2EDF9; 	/* マウスオーバー時の背景色を指定する */ " +
		"  }" +
		"  " +
		"  input[type='checkbox']:checked + label {" +
		"	background: #31A9EE;/* マウス選択時の背景色を指定する */" +
		"	color: #ffffff; 	/* マウス選択時のフォント色を指定する */" +
		"  }" +
		"  input[type='button']:active + label {" +
		"	background: #ff73e1;/* マウス選択時の背景色を指定する */" +
		"	color: #ffffff; 	/* マウス選択時のフォント色を指定する */" +
		"  }" +
		"  " +
		"  .label {" +
		"  	display: block;		/* ブロックレベル要素化する */ " +
		"  	float: left;		/* 要素の左寄せ・回り込を指定する */ " +
		"  	margin: 5px;		/* ラベル外側の余白を指定する */" +
		"  	width: 160px;		/* ラベルの横幅を指定する */" +
		"  	height: 35px;		/* ラベルの高さを指定する */" +
		"  	text-align: center;	/* テキストのセンタリングを指定する */" +
		"  	line-height: 35px;	/* 行の高さを指定する */" +
		"  	padding-left: 5px;	/* ラベル内左側の余白を指定する */" +
		"  	padding-right: 5px;	/* ラベル内右側の余白を指定する */" +
		"  	cursor: pointer;		/* マウスカーソルの形（リンクカーソル）を指定する */" +
		"  	color: #000000;			/* フォントの色を指定 */" +
		"  	border: 2px solid #006DD9;/* ラベルの境界線を実線で指定する */" +
		"  	border-radius: 5px;		/* 角丸を指定する */" +
		"	user-select: none; /* CSS3 */" +
		"	-webkit-user-select: none; /* Safari、Chromeなど */" +
		"  }" +
		"  .label2 {" +
		"  	display: block;		/* ブロックレベル要素化する */ " +
		"  	float: left;		/* 要素の左寄せ・回り込を指定する */ " +
		"  	margin: 5px;		/* ラベル外側の余白を指定する */" +
		"  	width: 130px;		/* ラベルの横幅を指定する */" +
		"  	height: 35px;		/* ラベルの高さを指定する */" +
		"  	text-align: center;	/* テキストのセンタリングを指定する */" +
		"  	line-height: 35px;	/* 行の高さを指定する */" +
		"  	padding-left: 5px;	/* ラベル内左側の余白を指定する */" +
		"  	padding-right: 5px;	/* ラベル内右側の余白を指定する */" +
		"  	cursor: pointer;		/* マウスカーソルの形（リンクカーソル）を指定する */" +
		"  	color: #000000;			/* フォントの色を指定 */" +
		"  	border: 2px solid #ff50d9;/* ラベルの境界線を実線で指定する */" +
		"  	border-radius: 5px;		/* 角丸を指定する */" +
		"	user-select: none; /* CSS3 */" +
		"	-webkit-user-select: none; /* Safari、Chromeなど */" +
		"  }" +
		"  " +
		"  .label3 {" +
		"  	display: block;		/* ブロックレベル要素化する */ " +
		"  	float: left;		/* 要素の左寄せ・回り込を指定する */ " +
		"  	margin: 5px;		/* ラベル外側の余白を指定する */" +
		//"  	width: 120px;		/* ラベルの横幅を指定する */" +
		"  	height: 35px;		/* ラベルの高さを指定する */" +
		"  	text-align: center;	/* テキストのセンタリングを指定する */" +
		"  	line-height: 240%;	/* 行の高さを指定する */" +
		"  	padding-left: 5px;	/* ラベル内左側の余白を指定する */" +
		"  	padding-right: 5px;	/* ラベル内右側の余白を指定する */" +
		"  	cursor: pointer;		/* マウスカーソルの形（リンクカーソル）を指定する */" +
		"  	color: #000000;			/* フォントの色を指定 */" +
		"  	border: 2px solid #006DD9;/* ラベルの境界線を実線で指定する */" +
		"  	border-radius: 5px;		/* 角丸を指定する */" +
		"	user-select: none; /* CSS3 */" +
		"	-webkit-user-select: none; /* Safari、Chromeなど */" +
		"  }" +
		"	#ScriptTextArea {" +
		"		min-width: 555px;" +
		"		min-height: 116px;" +
		"	}" +
		"	#JsonORColorCodeArea {" +
		"		min-width: 555px;" +
		"		min-height: 116px;" +
		"	}" +
		"	.margins {" +
		"		margin-left: 30px;" +
		"	}" +
		"  " +
		"</style>		" +
		"<div class='tab_wrap'>		" +
		"  <input id='tab1' type='radio' name='tab_btn' checked=''>		" +
		"  <input id='tab2' type='radio' name='tab_btn'>		" +
		"  <input id='tab3' type='radio' name='tab_btn'>		" +
		"  <input id='tab4' type='radio' name='tab_btn'>		" +
		"  <div class='tab_area'>			" +
		"	<label id='tab1_2' class='tab1_label' for='tab1'>Comment Post" +
		"	</label>			" +
		"	<label id='tab2_2' class='tab2_label' for='tab2'>Comment Create" +
		"	</label>			" +
		"	<label id='tab3_2' class='tab3_label' for='tab3'>Other" +
		"	</label>		" +
		"	<label id='mode' class='tab5_label' for='tab5'><font color='#ff0000'>モード： </font>" +
		"	</label>		" +
		"	<label id='tab4_2' class='tab4_label' for='tab4'>Version:0.0.1" +
		"	</label>		" +
		"  </div>		" +
		"  <div class='panel_area'>			" +
		"	<div id='panel1' class='tab_panel'>				" +
		"		<p>" +
		"		<input type='checkbox'  name='Option' value='1' id='PostType'>" +
		"		<label id='PostType2' for='PostType' class='label'>184解除投下</label>" +
		"" +
		"		<input type='checkbox' name='Option' value='2' id='PostOrder'>" +
		"		<label id='PostOrder2' for='PostOrder' class='label'>下から投下</label>" +
		"" +
		"		<input type='checkbox' name='Option' value='3' id='PostUnLimited'>" +
		"		<label id='PostUnLimited2' for='PostUnLimited' class='label'>75文字突破</label>" +
		"" +
		"		<input type='checkbox' name='Option' value='4' id='PostPattisier'>" +
		"		<label id='PostPattisier2' for='PostPattisier' class='label'>pattisier付与</label>" +
		"		</p>" +
		"		<textarea id='ScriptTextArea' style='margin: 0px; width: 555px; height: 122px;' placeholder='[#color size position full font ender]Comment \\n Data'></textarea><br>" +
		"		<label id = 'FirstLineCommentCountLength'>1行目の文字数： 0 　　　</label>" +
		"		<label id = 'LastLineCommentCountLength'>最終行の文字数： 0 </label>" +
		"		<p>" +
		"		<input type='button' name='Post' value='5' id='SinglePost'>" +
		"		<label id='SinglePost2' for='SinglePost' class='label2'>1コメント投下</label>" +
		"" +
		"		<input type='button' name='Post' value='6' id='AllPost'>" +
		"		<label id='AllPost2' for='AllPost' class='label2'>全コメント投下</label>" +
		"" +
		"		<input type='button' name='Post' value='7' id='Clear'>" +
		"		<label id='Clear2' for='Clear' class='label2'>コメントクリア</label>" +
		"		</p>" +
		"	</div>			" +
		"	<div id='panel2' class='tab_panel'>				" +
		"	  <p>" +
		"		<input id='textColorChange' class='ActionButton TagEnterEditingButton TagContainer - editButton' type='button' /'>" +
		"		<label for='textColorChange' class='label'>選択レイヤー色変更</label>" +
		"		<input id='layerNameChange' class='ActionButton TagEnterEditingButton TagContainer - editButton' type='button' /'>" +
		"		<label for='layerNameChange' class='label'>レイヤーの名前設定</label>" +
		"		<input id='layerVisible' class='ActionButton TagEnterEditingButton TagContainer - editButton' type='button' /'>" +
		"		<label for='layerVisible' class='label'>レイヤー表示切替</label>" +
		"		<input id='layerAllVisible' class='ActionButton TagEnterEditingButton TagContainer - editButton' type='button' /'>" +
		"		<label for='layerAllVisible' class='label'>レイヤー一括切替</label>" +
		"		<input id='layerUp' class='ActionButton TagEnterEditingButton TagContainer - editButton' type='button' /'>" +
		"		<label for='layerUp' class='label'>選択レイヤーを上へ</label>" +
		"		<input id='layerDown' class='ActionButton TagEnterEditingButton TagContainer - editButton' type='button' /'>" +
		"		<label for='layerDown' class='label'>選択レイヤーを下へ</label><br><br><br>" +
		"		<select name='MyTrcSel' id='myTrcSel2' class='' size='2' style='height:100px; width:450px; padding:4px 8px; margin:1% 20px 2px 5px; border:none; float:left;' multiple='multiple'></select>" +
		"		<textarea id='outputCreateTxtarea' style='height:100px; width:450px; padding:4px 8px; margin:1% 20px 2px 5px; border:none; float:left;'></textarea>" +
		"		<select id='myTrcSel' class='myCmd' style='float:left; margin:1% 20px 2px 5px;'>" +
		"			<option value='big_ue_ender_full_gothic_W17_L9'>big ender 9</option>" +
		"			<option value='big_ue_ender_full_gothic_W18_L10_臨'>big ender 10 臨</option>" +
		"			<option value='big_ue_ender_full_gothic_W20_L11_臨'>big ender 11 臨</option>" +
		"			<option value='big_ue_ender_full_gothic_W22_L12_臨'>big ender 12 臨</option>" +
		"			<option value='big_ue_ender_full_gothic_W25_L13_臨'>big ender 13 臨</option>" +
		"			<option value='big_ue_ender_full_gothic_W29_L15_臨'>big ender 15 臨</option>" +
		"			<option value='big_ue_ender_full_gothic_W31_L16_臨'>big ender 16 臨</option>" +
		"			<option value='big_ue_full_gothic_W34_L16'>big 16</option>" +
		"			<option value='medium_ue_ender_full_gothic_W24_L14'>medium ender 14</option>" +
		"			<option value='medium_ue_ender_full_gothic_W34_L19_臨'>medium ender 19 臨</option>" +
		"			<option value='medium_ue_full_gothic_W40_L26'>medium 26</option>" +
		"			<option value='small_ue_ender_full_gothic_W37_L21'>small ender 21</option>" +
		"			<option value='small_ue_gothic_W24_L38'>small 38</option>" +
		"			<option value='medium_shita_full_gothic_W50_C22'>medium shita W50</option>" +
		"			<option value='small_ue_full_gothic_W37_L2_C9'>small ue W37 L2</option>" +
		"			<option value='small_shita_full_gothic_W37_L2_C9'>small shita W37 L2</option>" +
		"		</select><br><br><br><br><br>" +
		"		<input id='myTrcAdd' class='ActionButton TagEnterEditingButton TagContainer-editButton' type='button'/>" +
		"		<br><br><br><br><br><label for='myTrcAdd' class='label3'>レイヤー追加</label>" +
		"		<input id='myTrcDel' class='ActionButton TagEnterEditingButton TagContainer - editButton' type='button' /'>" +
		"		<label for='myTrcDel' class='label3'>レイヤー削除</label>" +
		"		<input id='ufile' name='ufile' type='file' accept='image/jpeg,image/png' style='display: none';></label>" +
		"		<label for='ufile' class='label3 margins'>画像読み込み</label>" +
		"		<input id='imageVisible' class='ActionButton TagEnterEditingButton TagContainer - editButton' type='button' /'>" +
		"		<label for='imageVisible' class='label3'>画像非表示</label>" +
		"		<input id='layerOutputAll' class='ActionButton TagEnterEditingButton TagContainer - editButton' type='button' /'>" +
		"		<label for='layerOutputAll' class='label3 margins'>全レイヤー出力</label>" +
		"		<input id='layerOutput' class='ActionButton TagEnterEditingButton TagContainer - editButton' type='button' /'>" +
		"		<label for='layerOutput' class='label3'>選択レイヤー出力</label>" +
		"		<input id='layerSave' class='ActionButton TagEnterEditingButton TagContainer - editButton' type='button' /'>" +
		"		<label for='layerSave' class='label3 margins'>レイヤー保存</label>" +
		"		<input id='layerLoad' class='ActionButton TagEnterEditingButton TagContainer - editButton' type='button' /'>" +
		"		<label for='layerLoad' class='label3'>レイヤー復元</label>" +
		"	  </p>			" +
		"	</div>			" +
		"	<div id='panel3' class='tab_panel'>				" +
		"	  <p>" +
		"		<input id='ufile' name='ufile' type='file' accept='image/jpeg,image/png' style='display: none';></label>" +
		"		<label for='ufile' class='label'>画像読み込み</label>" +
		"" +
		"		<input type='button' name='Support' value='1' id='JsonConvert'>" +
		"		<label for='JsonConvert' class='label'>JSON1行変換</label>" +
		"" +
		"" +
		"		<input type='button' name='Support' value='1' id='TEST'>" +
		"		<label for='TEST' class='label'>未実装</label>" +
		"" +
		"" +
		"		<input type='button' name='Support' value='1' id='TEST'>" +
		"		<label for='TEST' class='label'>未実装</label>" +
		"" +
		"	  </p>			" +
		"	  <textarea id='JsonORColorCodeArea' style='margin: 0px; width: 555px; height: 122px;' placeholder=''></textarea>" +
		"	</div>		" +
		"	<div id='panel4' class='tab_panel'>				" +
		"	  <textarea id='VersionHistory' style='margin: 0px; width: 555px; height: 122px;' placeholder=''></textarea>" +
		"	</div>		" +
		"  </div>	" +
		"</div>" +
		"<script type='text/javascript'>" +
		"</script>");

	/*----------------------------------------------------------------------------------------------------
	[バージョン情報]
	----------------------------------------------------------------------------------------------------*/
	$("#VersionHistory").val(
		"v0.0.1：コメント作成支援機能のベース作成中"
	);

	/*----------------------------------------------------------------------------------------------------
	[スクリプト起動時のモード判定処理]
	// (投稿者編集モードか通常モードか）
	----------------------------------------------------------------------------------------------------*/
	if ($('div').hasClass('GridCell OwnerEditMenuContainer-left')) {
		// 投コメモードの場合
		$("#mode").html("<font color='#ff0000'>モード： 投コメモード</font>");
		$('.OwnerCommentEditContainer-inlineEdit').css('width', '500%');
		$('div.OwnerEditPanelHeader-right').prepend('<button type="button" id="WidthChange" class="ActionButton OwnerEditButton">幅調整</button>');
		$('button.OwnerEditButton').css('min-width', '0px');
		ModeAdmin = true;
	} else {
		// 通常コメモードの場合
		$("#mode").html("<font color='#ff0000'>モード： 通常モード</font>");
		$('button.PlayerSkipNextButton').css('visibility', 'hidden');
		ModeAdmin = false;
	}

	/*----------------------------------------------------------------------------------------------------
	[コメント投稿時のモード判定処理]
	// (投稿者編集モードか通常モードか）
	----------------------------------------------------------------------------------------------------*/
	function ModeCheck() {
		if ($('div').hasClass('GridCell OwnerEditMenuContainer-left')) {
			// 投コメモードの場合
			$('.OwnerCommentEditContainer-inlineEdit').css('width', '500%');
			$('div.OwnerEditPanelHeader-right').prepend('<button type="button" id="WidthChange" class="ActionButton OwnerEditButton">幅調整</button>');
			$('button.OwnerEditButton').css('min-width', '0px');
			ModeAdmin = true;
		} else {
			// 通常コメモードの場合
			$("#mode").html("<font color='#ff0000'>モード： 通常モード</font>");
			$('button.PlayerSkipNextButton').css('visibility', 'hidden');
			ModeAdmin = false;
		}
	}

	/*----------------------------------------------------------------------------------------------------
	[幅調整ボタンを押したらコメント欄の横幅の広さを調整]
	----------------------------------------------------------------------------------------------------*/
	$("#WidthChange").click(function () {
		$('.OwnerCommentEditContainer-inlineEdit').css('width', '500%');
	});

	/*----------------------------------------------------------------------------------------------------
	[画像表示機能で使用するCanvasのレイヤーの設定]
	----------------------------------------------------------------------------------------------------*/
	$("div.MainVideoPlayer").before("<canvas id='myImg' position='absolute' width=640 height=360 ></canvas>");
	$('#myImg').css('position', 'absolute');
	$('#myImg').css('top', '0px');
	$('#myImg').css('left', '0px');
	$('#myImg').css('width', '100%');
	$('#myImg').css('height', '100%');
	$('#myImg').css('border', 'none');
	$('#myImg').css('display', 'none');
	$('#myImg').css('z-index', 2);

	/*----------------------------------------------------------------------------------------------------
	[投下用のテキストエリアの内容をクリアする処理]
	----------------------------------------------------------------------------------------------------*/
	$("#Clear").click(function () {
		$("#ScriptTextArea").val("");
	});

	/*----------------------------------------------------------------------------------------------------
	[画像読み込み機能]
	----------------------------------------------------------------------------------------------------*/
	$("#ufile").change(function () {
		if (!this.files.length) {
			$('#myImg').css('display', 'none');
			return;
		}
		$('#myImg').css('display', '');
		//canvasの情報取得
		var canvas = document.getElementById('myImg');
		//canvasのオブジェクトのタイプ(2dデータ)を宣言
		var ctx = canvas.getContext("2d");
		// 選択されたファイルを取得
		var file = this.files[0];
		// 画像ファイル以外は処理中止
		if (!file.type.match(/^image\/(png|jpeg|gif)$/)) return;
		//インスタンス生成2つ
		var image = new Image();
		var reader = new FileReader();
		// File APIを使用し、ローカルファイルを読み込む
		reader.onload = function (evt) {
			// 画像がloadされた後に、canvasに描画する
			image.onload = function () {
				//canvasのエリアのクリア
				ctx.clearRect(0, 0, 0, 0);
				//canvasサイズを(640,360)に設定
				canvas.width = 640;
				canvas.height = 360;
				//canvasに読み込んだ画像を表示
				ctx.drawImage(image, 0, 0, 640, 360);
			}
			image.src = reader.result;
		}
		// ファイルを読み込み、データをBase64でエンコードされたデータURLにして返す
		reader.readAsDataURL(file);
	})

	/*----------------------------------------------------------------------------------------------------
	[画像からカラーコードを取得する処理]
	// RGBから#ffffff形式へ変換する
	----------------------------------------------------------------------------------------------------*/
	function RGB2bgColor(r, g, b) {
		r = r.toString(16);
		if (r.length == 1) r = "0" + r;

		g = g.toString(16);
		if (g.length == 1) g = "0" + g;

		b = b.toString(16);
		if (b.length == 1) b = "0" + b;

		return '#' + r + g + b;
	}

	/*----------------------------------------------------------------------------------------------------
	[画像がクリックされた場合の座標を元にカラー情報を取得する]
	// RGBから#ffffff形式へ変換する
	----------------------------------------------------------------------------------------------------*/
	/*
	canvas_color.onclick = function (evt) {
		// マウス座標の取得
		var x = parseInt(evt.offsetX);
		var y = parseInt(evt.offsetY);

		// 指定座標のImageDataオブジェクトの取得
		var imagedata = ctx.getImageData(x, y, 1, 1);

		// RGBAの取得
		var r = imagedata.data[0];
		var g = imagedata.data[1];
		var b = imagedata.data[2];
		var a = imagedata.data[3];

		r = parseInt(r).toString(16);
		if (r.length == 1) r = "0" + r;

		g = parseInt(g).toString(16);
		if (g.length == 1) g = "0" + g;

		b = parseInt(b).toString(16);
		if (b.length == 1) b = "0" + b;

		var JsonORColorCodeArea = document.getElementById("JsonORColorCodeArea");
		JsonORColorCodeArea.value = "";
		JsonORColorCodeArea.value = "#" + r + "" + g + "" + b;
	}

	var canvas_color = document.getElementById("myImg");
	if (canvas_color.getContext) {
		// コンテキストの取得
		var ctx = canvas_color.getContext("2d");
	}
	*/

	/*----------------------------------------------------------------------------------------------------
	[75文字突破ボタンが押下された場合は、184を強制解除するが任意で切り替えられないように184投下ボタンを非表示にする]
	----------------------------------------------------------------------------------------------------*/
	$("#PostUnLimited").click(function () {
		// 75文字突破が押された時は184投下に強制チェックをする
		if ($('#PostUnLimited').prop('checked')) {
			$("#PostType").prop("checked", true);
			$("#PostType2").css("visibility", "hidden");
		} else {
			$("#PostType2").css("visibility", "visible");
		}
	});

	/*----------------------------------------------------------------------------------------------------
	[1コメントを投下する]
	----------------------------------------------------------------------------------------------------*/
	$("#SinglePost").click(function () {
		// コメント投下時に投稿者モードか判定する
		//ModeCheck();

		// 75文字突破にチェックが入っているか判定
		if ($('#PostUnLimited').prop('checked')) {
			CommentLimit = CommentMaxLengthAdmin;
			$("#PostType").prop("checked", false);
		} else {
			CommentLimit = CommentMaxLengthNormal;
		}
		// 先頭行と最終行の文字カウント
		TextCheckCountFirstLast();
		setCommandMment();
	});

	/*----------------------------------------------------------------------------------------------------
	[全コメント投下する]
	----------------------------------------------------------------------------------------------------*/
	$("#AllPost").click(function () {

		// コメント投下時に投稿者モードか判定する
		//ModeCheck();

		if ((AllPostNow)) {
			// 投下を中断する
			//alert("TEST 終了");
			AllPostNow = false;
			ButtonEnabledTrue();
			$("#AllPost2").css("visibility", "visible");
		} else {
			// 全コメント投下中フラグ(途中終了の処理に用いる)
			AllPostNow = true;
			ButtonEnabledFalse();
		}

		var text = $("#ScriptTextArea").val().replace(/\r\n|\r/g, "\n");
		var lines = text.split('\n');
		text = lines[0];

		// 全投下終わったらフラグを戻す
		if (text == "") {
			AllPostNow = false;
			ButtonEnabledTrue();
		}

		if (ModeAdmin) {
			//クソ適当な投コメモード対応
			if (text.match(/^\[(.+?)\](.*)/) != null) {
				var posetSet = setInterval(function () {
					if (($("#ScriptTextArea").val() === "") || !AllPostNow || CommentLimitOver) {
						clearInterval(posetSet);
						ButtonEnabledTrue();
					} else {
						// 先頭行と最終行の文字カウント
						TextCheckCountFirstLast();

						setCommandMment();

					}
					//button_disabled_change(false);
				}, 2250);
			} else {
				alert("形式に誤りがあります [コマンド]コメント の形式にして下さい");
				ButtonEnabledTrue();
			}
		} else {
			if (text.match(/^\[(.+?)\](.*)/) != null) {
				var posetSet = setInterval(function () {
					if (($("#ScriptTextArea").val() === "") || !AllPostNow || CommentLimitOver) {
						clearInterval(posetSet);
						ButtonEnabledTrue();
					} else {
						// 先頭行と最終行の文字カウント
						TextCheckCountFirstLast();

						setCommandMment();
					}
				}, 6000);
			} else {
				alert("形式に誤りがあります [コマンド]コメント の形式にして下さい");
				ButtonEnabledTrue();
			}
		}
	});

	/*----------------------------------------------------------------------------------------------------
	[コメントの文字数をカウントする]
	----------------------------------------------------------------------------------------------------*/
	function TextCountCheck() {
		if ($('#PostUnLimited').prop('checked')) {
			CommentLimit = CommentMaxLengthAdmin;
		} else {
			CommentLimit = CommentMaxLengthNormal;
		}

		var Text = $("#ScriptTextArea").val().replace(/\r\n|\r/g, "\n");
		var Lines = Text.split('\n');
		var TextArray = new Array();
		var CheckFlag = false;
		var OverText = "";
		for (var c = 0; c < Lines.length; c++) {
			//textArray.push( lines[c] );
			if (Lines[c].match(/^\[(.+?)\](.*)/) != null) {
				ext_check = Lines[c].match(/^\[(.+?)\](.*)/);

				//alert(ext_check[2].substr(ext_check[2].length-4,4));
				if ('<br>' == ext_check[2].substr(ext_check[2].length - 4, 4)) {
					ext_check[2] = ext_check[2].substr(0, ext_check[2].length - 4);
				}

				if ('[A0]' == ext_check[2].substr(ext_check[2].length - 4, 4)) {
					ext_check[2] = ext_check[2].substr(0, ext_check[2].length - 4);
				}

				if ('[a0]' == ext_check[2].substr(ext_check[2].length - 4, 4)) {
					ext_check[2] = ext_check[2].substr(0, ext_check[2].length - 4);
				}

				if ('[tab]' == ext_check[2].substr(ext_check[2].length - 4, 5)) {
					ext_check[2] = ext_check[2].substr(0, ext_check[2].length - 5);
				}

				if ('[tb]' == ext_check[2].substr(ext_check[2].length - 4, 4)) {
					ext_check[2] = ext_check[2].substr(0, ext_check[2].length - 4);
				}

				ext_check[2] = ext_check[2].replace(/<br>/gi, '\n');
				ext_check[2] = ext_check[2].replace(/<br \/>/gi, '\n');
				ext_check[2] = ext_check[2].replace(/\[tab\]/gi, '	');
				ext_check[2] = ext_check[2].replace(/\[tb\]/gi, '	');
				ext_check[2] = ext_check[2].replace(/\[A0\]/gi, ' ');
				ext_check[2] = ext_check[2].replace(/\[a0\]/gi, ' ');
				//alert(ext_check[2].length);
				if (ext_check[2].length > CommentLimit) {
					CheckFlag = true;
					OverText += (c + 1) + "行目のコメントが" + CommentLimit + "より" + (ext_check[2].length - CommentLimit) + "文字オーバーしています\n";
				}
			}
		}

		if (CheckFlag == true) {
			alert(OverText);
			CommentLimitOver = true;
			//AllPostNow = true;
			//$("#AllPost2").css("visibility", "hidden");
			//exit;
		}
		return CheckFlag;
	}

	/*----------------------------------------------------------------------------------------------------
	[コマンド、コメントをそれぞれの入力欄にセットする]
	----------------------------------------------------------------------------------------------------*/
	function setCommandMment() {
		// コメント投下時に投稿者モードか判定する
		//ModeCheck();
		var Temp_184 = "　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　184解除";
		var Pattisier = "pattisier ";

		var Start = false;
		Start = TextCountCheck();

		// 先頭行と最終行の文字カウント
		TextCheckCountFirstLast();

		if (!Start) {
			if ($("#ScriptTextArea").val() == "") {
				clearInterval(posetSet);
			}
			var text = $("#ScriptTextArea").val().replace(/\r\n|\r/g, "\n");
			var lines = text.split('\n');
			if ($('#PostOrder').prop('checked')) {
				text = lines[lines.length - 1];

				if (text == "") {
					text = $("#ScriptTextArea").val()
					text = text.replace(/\n+$/g, '');
					$("#ScriptTextArea").val(text);
					text = $("#ScriptTextArea").val().replace(/\r\n|\r/g, "\n");
					lines = text.split('\n');
					text = lines[lines.length - 1];
				}

				var text_length = text.length;
				var retext = $("#ScriptTextArea").val();
				retext = retext.substr(0, retext.length - text_length);
				retext = retext.replace(/\n+$/g, '');
			} else {
				text = lines[0];
				var retext = $("#ScriptTextArea").val().replace(text, "");
				retext = retext.replace("\n", "");
			}

			$("#ScriptTextArea").val(retext);
			TextCheckCountFirstLast();

			if (text.match(/^\[(.+?)\](.*)/) != null) {
				ext = text.match(/^\[(.+?)\](.*)/);
				ext[2] = ext[2].replace(/<br>/gi, '\n');
				ext[2] = ext[2].replace(/<br \/>/gi, '\n');
				ext[2] = ext[2].replace(/\[tab\]/gi, '	');
				ext[2] = ext[2].replace(/\[A0\]/gi, ' ');
				ext[2] = ext[2].replace(/\[a0\]/gi, ' ');
				ext[2] = ext[2].replace(/\[tb\]/gi, '	');

				if (ext[2].length > CommentLimit) {
					ext[2] = ext[2].slice(0, CommentLimit);
				}

				var elements_command = document.getElementsByClassName("CommentCommandInput")[0];
				j(elements_command, ext[1]);
				var elements_text = document.getElementsByClassName("CommentInput-textarea")[0];
				come(elements_text, ext[2]);
				var elements_post = document.getElementsByClassName("CommentPostButton")[0];

				window.setTimeout(function () {
					timers(elements_post);
				}, 1000);
				function j(elements_command, command) {
					if ($('#PostType').prop('checked')) {
						//elements_command.value = command;
					} else {
						// 投コメモードだったらつけない
						if (!ModeAdmin) {
							command = command + Temp_184;
						}
					}

					if ($('#PostPattisier').prop('checked')) {
						command = Pattisier + command;
					}

					Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(elements_command, command), elements_command.dispatchEvent(new Event("input", {
						bubbles: !0
					}));
				};
				function timers(a) {
					a.dispatchEvent(new MouseEvent("click", {
						view: window,
						bubbles: !0,
						cancelable: !0
					}))
				};
				function come(elements_text, text) {
					Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set.call(elements_text, text), elements_text.dispatchEvent(new Event("input", {
						bubbles: !0
					}))
				}
			} else {
				alert("形式に誤りがあります [コマンド]コメント の形式にして下さい");
			}
		}
	}

	/*----------------------------------------------------------------------------------------------------
	[コメントの最初の行と最終行の文字数をカウントしてテキストエリアの下部に表示](未使用)
	----------------------------------------------------------------------------------------------------*/
	function TextLengthCountFirstAndLast() {
		if ($('#PostUnLimited').prop('checked')) {
			CommentLimit = CommentMaxLengthAdmin;
		} else {
			CommentLimit = CommentMaxLengthNormal;
		}

		var text = $("#ScriptTextArea").val().replace(/\r\n|\r/g, "\n");
		var lines = text.split('\n');
		var textArray = new Array();
		var checkFlag = false;
		var overText = "";
		for (var c = 0; c < lines.length; c++) {
			//textArray.push( lines[c] );
			if (lines[c].match(/^\[(.+?)\](.*)/) != null) {
				ext_check = lines[c].match(/^\[(.+?)\](.*)/);

				//alert(ext_check[2].substr(ext_check[2].length-4,4));
				if ('<br>' == ext_check[2].substr(ext_check[2].length - 4, 4)) {
					ext_check[2] = ext_check[2].substr(0, ext_check[2].length - 4);
				}

				if ('[A0]' == ext_check[2].substr(ext_check[2].length - 4, 4)) {
					ext_check[2] = ext_check[2].substr(0, ext_check[2].length - 4);
				}

				if ('[a0]' == ext_check[2].substr(ext_check[2].length - 4, 4)) {
					ext_check[2] = ext_check[2].substr(0, ext_check[2].length - 4);
				}

				if ('[tab]' == ext_check[2].substr(ext_check[2].length - 4, 5)) {
					ext_check[2] = ext_check[2].substr(0, ext_check[2].length - 5);
				}

				if ('[tb]' == ext_check[2].substr(ext_check[2].length - 4, 4)) {
					ext_check[2] = ext_check[2].substr(0, ext_check[2].length - 4);
				}

				ext_check[2] = ext_check[2].replace(/<br>/gi, '\n');
				ext_check[2] = ext_check[2].replace(/<br \/>/gi, '\n');
				ext_check[2] = ext_check[2].replace(/\[tab\]/gi, '	');
				ext_check[2] = ext_check[2].replace(/\[tb\]/gi, '	');
				ext_check[2] = ext_check[2].replace(/\[A0\]/gi, ' ');
				ext_check[2] = ext_check[2].replace(/\[a0\]/gi, ' ');


			}
			try {
				lines[c] = ext_check[2];
			} catch (e) {
			}
		}
		//$("#first_line_length").text("先頭行文字数:" + lines[0].length);
		//$("#last_line_length").text("最終行文字数:" + lines[lines.length -1].length);
	}

	/*----------------------------------------------------------------------------------------------------
	[自動投下中は停止ボタン以外を非表示にするようにする]
	----------------------------------------------------------------------------------------------------*/
	function ButtonEnabledFalse() {
		// 別パネルの方にあるボタンは考慮しない
		// テキストエリア
		$("#ScriptTextArea").prop("disabled", true);

		//$("#tab1_2").css("visibility", "hidden");
		$("#tab2_2").css("visibility", "hidden");
		$("#tab3_2").css("visibility", "hidden");
		$("#tab4_2").css("visibility", "hidden");

		// ボタン郡
		$("#PostType2").css("visibility", "hidden");
		$("#PostOrder2").css("visibility", "hidden");
		$("#PostUnLimited2").css("visibility", "hidden");
		$("#PostPattisier2").css("visibility", "hidden");
		$("#SinglePost2").css("visibility", "hidden");
		$("#Clear2").css("visibility", "hidden");

		// 全コメント投下ボタンのテキスト変更
		$("#AllPost2").text("投下停止");
	}

	/*----------------------------------------------------------------------------------------------------
	[停止ボタンを押下または投下が終わったら非表示にしていたボタンを戻す]
	----------------------------------------------------------------------------------------------------*/
	function ButtonEnabledTrue() {
		// 別パネルの方にあるボタンは考慮しない
		// パネル郡

		// テキストエリア
		$("#ScriptTextArea").prop("disabled", false);

		//$("#tab1_2").css("visibility", "hidden");
		$("#tab2_2").css("visibility", "visible");
		$("#tab3_2").css("visibility", "visible");
		$("#tab4_2").css("visibility", "visible");

		// ボタン郡
		$("#PostType2").css("visibility", "visible");
		$("#PostOrder2").css("visibility", "visible");
		$("#PostUnLimited2").css("visibility", "visible");
		$("#PostPattisier2").css("visibility", "visible");
		$("#SinglePost2").css("visibility", "visible");
		$("#Clear2").css("visibility", "visible");

		// 全コメント投下ボタンのテキスト変更
		$("#AllPost2").text("全コメント投下");
	}

	/*----------------------------------------------------------------------------------------------------
	[投下済みの投稿者コメントの内容を1行形式のjsonに変換する]
	----------------------------------------------------------------------------------------------------*/
	$("#JsonConvert").click(function () {
		var elements_json = document.getElementsByClassName("ActionButton OwnerEditButton")[1];
		elements_json.click();
		var json_text = $('.OwnerCommentEditEditorContainer-textarea').text();
		var before = '\n';
		var regExp = new RegExp(before, "g");
		regExp = new RegExp(before, "g");
		json_text = json_text.replace(regExp, "");
		before = '},';
		regExp = new RegExp(before, "g");
		json_text = json_text.replace(regExp, "},\n");
		before = '\\[';
		regExp = new RegExp(before, "g");
		json_text = json_text.replace(regExp, "\[\n");
		before = '\\]';
		regExp = new RegExp(before, "g");
		json_text = json_text.replace(regExp, "\n\]");
		elements_json = document.getElementById("JsonORColorCodeArea");
		elements_json.innerText = json_text;
		elements_json = document.getElementsByClassName("ActionButton OwnerEditButton")[2];
		elements_json.click();
	});

	/*----------------------------------------------------------------------------------------------------
	[コメントの最初の行と最終行の文字数をカウントしてテキストエリアの下部に表示]
	----------------------------------------------------------------------------------------------------*/
	$(function () {
		$("#ScriptTextArea").bind('keydown keyup keypress change', function () {
			if ($('#PostUnLimited').prop('checked')) {
				CommentLimit = CommentMaxLengthAdmin;
			} else {
				CommentLimit = CommentMaxLengthNormal;
			}

			var text = $("#ScriptTextArea").val().replace(/\r\n|\r/g, "\n");
			var lines = text.split('\n');
			var textArray = new Array();
			var checkFlag = false;
			var overText = "";
			for (var c = 0; c < lines.length; c++) {
				//textArray.push( lines[c] );
				if (lines[c].match(/^\[(.+?)\](.*)/) != null) {
					ext_check = lines[c].match(/^\[(.+?)\](.*)/);

					//alert(ext_check[2].substr(ext_check[2].length-4,4));
					if ('<br>' == ext_check[2].substr(ext_check[2].length - 4, 4)) {
						ext_check[2] = ext_check[2].substr(0, ext_check[2].length - 4);
					}

					if ('[A0]' == ext_check[2].substr(ext_check[2].length - 4, 4)) {
						ext_check[2] = ext_check[2].substr(0, ext_check[2].length - 4);
					}

					if ('[a0]' == ext_check[2].substr(ext_check[2].length - 4, 4)) {
						ext_check[2] = ext_check[2].substr(0, ext_check[2].length - 4);
					}

					if ('[tab]' == ext_check[2].substr(ext_check[2].length - 4, 5)) {
						ext_check[2] = ext_check[2].substr(0, ext_check[2].length - 5);
					}

					if ('[tb]' == ext_check[2].substr(ext_check[2].length - 4, 4)) {
						ext_check[2] = ext_check[2].substr(0, ext_check[2].length - 4);
					}

					ext_check[2] = ext_check[2].replace(/<br>/gi, '\n');
					ext_check[2] = ext_check[2].replace(/<br \/>/gi, '\n');
					ext_check[2] = ext_check[2].replace(/\[tab\]/gi, '\t');
					ext_check[2] = ext_check[2].replace(/\[tb\]/gi, '\t');
					ext_check[2] = ext_check[2].replace(/\[A0\]/gi, ' ');
					ext_check[2] = ext_check[2].replace(/\[a0\]/gi, ' ');
				}
				try {
					lines[c] = ext_check[2];
				} catch (e) {
				}
			}
			$("#FirstLineCommentCountLength").text("1行目の文字数： " + lines[0].length + "　　　");
			$("#LastLineCommentCountLength").text("最終行の文字数： " + lines[lines.length - 1].length);
		});
	});

	/*----------------------------------------------------------------------------------------------------
	[コメントの最初の行と最終行の文字数をカウントしてテキストエリアの下部に表示]
	----------------------------------------------------------------------------------------------------*/
	function TextCheckCountFirstLast() {
		if ($('#PostUnLimited').prop('checked')) {
			CommentLimit = CommentMaxLengthAdmin;
		} else {
			CommentLimit = CommentMaxLengthNormal;
		}

		var text = $("#ScriptTextArea").val().replace(/\r\n|\r/g, "\n");
		var lines = text.split('\n');
		var textArray = new Array();
		var checkFlag = false;
		var overText = "";
		for (var c = 0; c < lines.length; c++) {
			//textArray.push( lines[c] );
			if (lines[c].match(/^\[(.+?)\](.*)/) != null) {
				ext_check = lines[c].match(/^\[(.+?)\](.*)/);

				//alert(ext_check[2].substr(ext_check[2].length-4,4));
				if ('<br>' == ext_check[2].substr(ext_check[2].length - 4, 4)) {
					ext_check[2] = ext_check[2].substr(0, ext_check[2].length - 4);
				}

				if ('[A0]' == ext_check[2].substr(ext_check[2].length - 4, 4)) {
					ext_check[2] = ext_check[2].substr(0, ext_check[2].length - 4);
				}

				if ('[a0]' == ext_check[2].substr(ext_check[2].length - 4, 4)) {
					ext_check[2] = ext_check[2].substr(0, ext_check[2].length - 4);
				}

				if ('[tab]' == ext_check[2].substr(ext_check[2].length - 4, 5)) {
					ext_check[2] = ext_check[2].substr(0, ext_check[2].length - 5);
				}

				if ('[tb]' == ext_check[2].substr(ext_check[2].length - 4, 4)) {
					ext_check[2] = ext_check[2].substr(0, ext_check[2].length - 4);
				}

				ext_check[2] = ext_check[2].replace(/<br>/gi, '\n');
				ext_check[2] = ext_check[2].replace(/<br \/>/gi, '\n');
				ext_check[2] = ext_check[2].replace(/\[tab\]/gi, '\t');
				ext_check[2] = ext_check[2].replace(/\[tb\]/gi, '\t');
				ext_check[2] = ext_check[2].replace(/\[A0\]/gi, ' ');
				ext_check[2] = ext_check[2].replace(/\[a0\]/gi, ' ');
			}
			try {
				lines[c] = ext_check[2];
			} catch (e) {
			}
		}
		$("#FirstLineCommentCountLength").text("1行目の文字数： " + lines[0].length + "　　　");
		$("#LastLineCommentCountLength").text("最終行の文字数： " + lines[lines.length - 1].length);
	}

	/*----------------------------------------------------------------------------------------------------
	[レイヤー追加処理]
	----------------------------------------------------------------------------------------------------*/
	var layerCount = 0;
	$("#myTrcAdd").click(function () {
		var a = $('#myTrcSel').val();
		a = a.split('_');
		var b = 1;
		//ループ回数チェック
		for (var i = 0; i < a.length; i++) {
			if (a[i].slice(0, 1) == 'C') {
				b = a[i].slice(1);
			}
		}
		//var m = $('#myTrcSel2').children('option').length;
		var m = layerCount;
		var j = 0;
		var n;
		for (var i = 0; i < b; i++) {
			//m = m + 1;
			m = layerCount + 1;
			layerCount++;
			var t = document.createElement('textarea');
			var myinnerTxt;
			//widht = font*w+1px
			//height = lineheight *L+2px
			//t.id = 'myTxt_' + m;
			t.id = 'myTxt_' + (layerCount);
			t.className = 'myTxtClass';
			myinnerTxt = '' +
				'background-color: rgba(0,0,0,0);' +
				'position:absolute;' +
				'font-weight: 400;' +
				'width: 1000px;' +
				'border: none;' +
				'z-index:4;' +
				'margin: 0;' +
				'padding: 0;' +
				//'text-shadow:' +
				//'1px 1px 0px rgba(0,0,0,0.2),' +
				//'-1px 1px 0px rgba(0,0,0,0.2),' +
				//'1px -1px 0px rgba(0,0,0,0.2),' +
				//'-1px -1px 0px rgba(0,0,0,0.2),' +
				//' 1px 0px 0px rgba(0,0,0,0.2),' +
				//'-1px 0px 0px rgba(0,0,0,0.2),' +
				//'0px 1px 0px rgba(0,0,0,0.2),' +
				//'0px -1px 0px rgba(0,0,0,0.2);' +
				'';
			switch ($('#myTrcSel').val()) {
				case 'big_ue_ender_full_gothic_W17_L9':
					myinnerTxt = myinnerTxt +
						'height: 380px;' +
						'font-family: \'游ゴシック\', SimHei, Arial, \'ＭＳ Ｐゴシック\', sans-serif;' +
						'font-size: 36.55px;' +
						'line-height: 42px;' +
						'top:4px;' +
						'left:9px;' +
						'width:623px;' +
						'transform-origin: 0 0;' +
						'transform: scale( 1.000 , 1.010);';
					break;
				case 'big_ue_ender_full_gothic_W18_L10_臨':
					myinnerTxt = myinnerTxt +
						'height: 420px;' +
						'font-family: \'游ゴシック\', SimHei, Arial, \'ＭＳ Ｐゴシック\', sans-serif;' +
						'font-size: 34px;' +
						'line-height: 40px;' +
						'top:3px;' +
						'left:1px;' +
						'width:640px;' +
						'transform-origin: 0 0;' +
						'transform: scale( 1.020 , 1.014);';
					break;
				case 'big_ue_ender_full_gothic_W20_L11_臨':
					myinnerTxt = myinnerTxt +
						'height: 420px;' +
						'font-family: \'游ゴシック\', SimHei, Arial, \'ＭＳ Ｐゴシック\', sans-serif;' +
						'font-size: 30px;' +
						'line-height: 36px;' +
						'top:2px;' +
						'left:-1px;' +
						'width:640px;' +
						'transform-origin: 0 0;' +
						'transform: scale( 1.030 , 1.000);';
					break;
				case 'big_ue_ender_full_gothic_W22_L12_臨':
					myinnerTxt = myinnerTxt +
						'height: 420px;' +
						'font-family: \'游ゴシック\', SimHei, Arial, \'ＭＳ Ｐゴシック\', sans-serif;' +
						'font-size: 28px;' +
						'line-height: 33px;' +
						'top:2px;' +
						'left:0px;' +
						'width:640px;' +
						'transform-origin: 0 0;' +
						'transform: scale( 1.004 , 0.995);';
					break;
				case 'big_ue_ender_full_gothic_W25_L13_臨':
					myinnerTxt = myinnerTxt +
						'height: 420px;' +
						'font-family: \'游ゴシック\', SimHei, Arial, \'ＭＳ Ｐゴシック\', sans-serif;' +
						'font-size: 25px;' +
						'line-height: 30px;' +
						'top:3px;' +
						'left:2px;' +
						'width:640px;' +
						'transform-origin: 0 0;' +
						'transform: scale( 1.012 , 0.989);';
					break;
				case 'big_ue_ender_full_gothic_W29_L15_臨':
					myinnerTxt = myinnerTxt +
						'height: 420px;' +
						'font-family: \'游ゴシック\', SimHei, Arial, \'ＭＳ Ｐゴシック\', sans-serif;' +
						'font-size: 21px;' +
						'line-height: 26px;' +
						'top:1px;' +
						'left:6px;' +
						'width:640px;' +
						'transform-origin: 0 0;' +
						'transform: scale( 1.026 , 0.985);';
					break;
				case 'big_ue_ender_full_gothic_W31_L16_臨':
					myinnerTxt = myinnerTxt +
						'height: 420px;' +
						'font-family: \'游ゴシック\', SimHei, Arial, \'ＭＳ Ｐゴシック\', sans-serif;' +
						'font-size: 20px;' +
						'line-height: 24px;' +
						'top:1px;' +
						'left:-1px;' +
						'width:640px;' +
						'transform-origin: 0 0;' +
						'transform: scale( 1.030 , 0.997);';
					break;
				case 'big_ue_full_gothic_W34_L16':
					myinnerTxt = myinnerTxt +
						'height: 370px;' +
						'font-family: \'游ゴシック\', SimHei, Arial, \'ＭＳ Ｐゴシック\', sans-serif;' +
						'font-size: 18.40px;' + //18.40
						'line-height: 23px;' + //23
						'top:2px;' + //2
						'left:0px;' +
						'width:627px;' +
						'transform-origin: 0 0;' +
						'transform: scale( 1.019 , 0.973);'; //1.019/0.973
					break;
				case 'medium_ue_ender_full_gothic_W24_L14':
					myinnerTxt = myinnerTxt +
						'height: 380px;' +
						'font-family: \'游ゴシック\', SimHei, Arial, \'ＭＳ Ｐゴシック\', sans-serif;' +
						'font-size: 25.30px;' +
						'line-height: 27px;' +
						'top:3px;' +
						'left:16px;' +
						'width:609px;' +
						'transform-origin: 0 0;' +
						'transform: scale( 1.000 , 1.003);';
					break;
				case 'medium_ue_ender_full_gothic_W34_L19_臨':
					myinnerTxt = myinnerTxt +
						'height: 420px;' +
						'font-family: \'游ゴシック\', SimHei, Arial, \'ＭＳ Ｐゴシック\', sans-serif;' +
						'font-size: 17px;' +
						'line-height: 20px;' +
						'top:1px;' +
						'left:10px;' +
						'width:609px;' +
						'transform-origin: 0 0;' +
						'transform: scale( 1.046 , 0.991);';
					break;
				case 'medium_ue_full_gothic_W40_L26':
					myinnerTxt = myinnerTxt +
						'height: 366px;' +
						'font-family: \'游ゴシック\', SimHei, Arial, \'ＭＳ Ｐゴシック\', sans-serif;' +
						'font-size: 14px;' +
						'line-height: 14px;' +
						'top:1px;' +
						'left:56px;' +
						'width:561px;' +
						'transform-origin: 0 0;' +
						'transform: scale( 0.938 , 1.006);';
					break;
				case 'small_ue_ender_full_gothic_W37_L21':
					myinnerTxt = myinnerTxt +
						'height: 338px;' +
						'font-family: \'游ゴシック\', SimHei, Arial, \'ＭＳ Ｐゴシック\', sans-serif;' +
						'font-size: 16px;' +
						'line-height: 16px;' +
						'top:3px;' +
						'left:8px;' +
						'width:593px;' +
						'transform-origin: 0 0;' +
						'transform: scale( 1.055 , 1.060);';
					break;
				case 'small_ue_gothic_W24_L38':
					myinnerTxt = myinnerTxt +
						'height: 382px;' +
						'font-family: \'游ゴシック\', SimHei, Arial, \'ＭＳ Ｐゴシック\', sans-serif;' +
						'font-size: 10px;' + //これ以上は小さくならん模様
						'line-height: 10px;' +
						'top:2px;' +
						'left:207px;' +
						'width:241px;' +
						'transform-origin: 0 0;' +
						'transform: scale( 0.936 , 0.942);';
					break;
				case 'medium_shita_full_gothic_W50_C22':
					n = 345 - (16.2 * (j));
					myinnerTxt = myinnerTxt +
						'height: 16px;' +
						'font-family: \'游ゴシック\', SimHei, Arial, \'ＭＳ Ｐゴシック\', sans-serif;' +
						'font-size: 12.8px;' +
						'line-height: 16px;' +
						'top:' + n + 'px;' +
						'left:14px;' +
						'width:641px;' +
						'transform-origin: 0 0;' +
						'transform: scale( 0.952 , 1.000);';
					j++;
					break;
				case 'small_ue_full_gothic_W37_L2_C9':
					n = 2 + (38.7 * (j));
					myinnerTxt = myinnerTxt +
						'height: 37px;' +
						'font-family: \'游ゴシック\', SimHei, Arial, \'ＭＳ Ｐゴシック\', sans-serif;' +
						'font-size: 16px;' +
						'line-height: 17px;' +
						'top:' + n + 'px;' +
						'left:7px;' +
						'width:593px;' +
						'transform-origin: 0 0;' +
						'transform: scale( 1.055 , 1.040);';
					j++;
					break;
				case 'small_shita_full_gothic_W37_L2_C9':
					n = 324 - (38.7 * (j));
					myinnerTxt = myinnerTxt +
						'height: 37px;' +
						'font-family: \'游ゴシック\', SimHei, Arial, \'ＭＳ Ｐゴシック\', sans-serif;' +
						'font-size: 16px;' +
						'line-height: 17px;' +
						'top:' + n + 'px;' +
						'left:7px;' +
						'width:593px;' +
						'transform-origin: 0 0;' +
						'transform: scale( 1.055 , 1.040);';
					j++;
					break;
			}
			t.style.cssText = myinnerTxt;
			//t.style.color = '#' + parseInt($('myTxtR').value).toString(16).replace(/^[0-9A-F]$/, '0$&') + parseInt($('myTxtG').value).toString(16).replace(/^[0-9A-F]$/, '0$&') + parseInt($('myTxtB').value).toString(16).replace(/^[0-9A-F]$/, '0$&');
			document.getElementsByClassName('CommentRenderer')[0].before(t);
			t.addEventListener('focus', myTxtSelect, false);

			// selectタグのID取得
			var select = document.getElementById('myTrcSel2');
			// option要素の宣言
			var option = document.createElement('option');
			// option要素のvalue属性に値をセット
			option.setAttribute('value', ($('#myTrcSel2').children('option').length + 1) + ' ' + $('#myTrcSel').val() + ' ● ');
			option.id = "option_" + m;
			// option要素に値をセット
			option.innerHTML = ($('#myTrcSel2').children('option').length + 1) + ' ' + $('#myTrcSel').val() + ' ● ';
			// 作成したoption要素をselectタグに追加
			select.appendChild(option);
			//$('#myTrcSel2').append($('<option>').html('').val(m + ' ' + $('#myTrcSel').val() + ' ●'));

			//$('#myTrcSel2').add( (new Option(m + ' ' + $('#myTrcSel').val() + ' ●')) );
			//$('myTrcSel2')[m-1].style.color = '#' + parseInt($('myTxtR').value).toString(16).replace(/^[0-9A-F]$/, '0$&') + parseInt($('myTxtG').value).toString(16).replace(/^[0-9A-F]$/, '0$&') + parseInt($('myTxtB').value).toString(16).replace(/^[0-9A-F]$/, '0$&');

		}
		$('#myTrcSel2').val(($('#myTrcSel2').children('option').length) + ' ' + $('#myTrcSel').val() + ' ● ');

		t.focus();
		//$('myFontSize').value = t.style.fontSize
		//$('myLineHeight').value = parseInt(t.style.lineHeight);
		//$('myTop').value = parseInt(t.style.top);
		//$('myLeft').value = parseInt(t.style.left);
		//$('myTransX').value  = t.style.transform.match(/\d+\.*\d*/g)[0];
		//$('myTransY').value  = t.style.transform.match(/\d+\.*\d*/g)[1];
	});

	/*----------------------------------------------------------------------------------------------------
	[レイヤーの表示されているテキストボックスからレイヤーを選んだら実行する処理]
	----------------------------------------------------------------------------------------------------*/
	$('#myTrcSel2').change(function () {
		var texts = $('option:selected').text();
		if (!ModeAdmin) {
			// 投稿者コメントモードでなければ 通常コメント という文字列が入ってしまうので除去する
			texts = texts.slice(6);	// 通常コメント という文字列が入っていたら消す
		}

		var a;// = (String(aa)).split(' ');
		var c = $('#myTrcSel2').children('option');
		// セレクトボックスの中身を全て判定し、押されたレイヤー以外をzIndex3, 太字解除する
		for (var i = 0; i < $('#myTrcSel2').children('option').length; i++) {
			a = c[i].text;
			a = (String(a)).split(' ');
			var b = c[i].id;
			b = (String(b)).split('_');
			if (a[2] === '●') {
				$("#myTxt_" + b[1]).css('z-index', '3');
			} else {
				$("#myTxt_" + b[1]).css('z-index', '0');
			}
			$("#myTrcSel2 option:nth-child(" + a[0] + ")").css("font-weight", "");
		}
		var layerNo = $('[name=MyTrcSel] option:selected')[i];
		//layerNo = layerNo.id.split("_")[1];

		texts = (String(texts)).split(' ');

		var layerNo = $("#myTrcSel2 option:nth-child(" + texts[0] + ")").attr("id");
		if ($("#myTrcSel2 option:nth-child(" + texts[0] + ")").text().match(/●/)) {
			layerNo = (String(layerNo)).split('_')[1];
			$("#myTxt_" + layerNo).css('z-index', '4');
		}
		$("#myTrcSel2 option:nth-child(" + texts[0] + ")").css("font-weight", "bold");

	});

	/*----------------------------------------------------------------------------------------------------
    [text選択時の処理]
    ----------------------------------------------------------------------------------------------------*/
	function myTxtSelect() {
		var nameSetId = 0;
		a = document.activeElement;
		for (var i = 0; i < $('#myTrcSel2').children('option').length; i++) {
			if ($("#myTxt_" + (i + 1)).css('zIndex') == '4') {
				$("#myTxt_" + (i + 1)).css('zIndex', '3');
			}
		}

		if (a.style.zIndex == "0") {
			$('#myTrcTxtDisp').val("表示");
		} else {
			$('#myTrcTxtDisp').val("非表示");
			a.style.zIndex = '4';
		}

		// slice(6)は myTxt_ の文字数(length)
		$('#myTrcSel2').val(a.id.slice(6) - 1);
		//$('#myTrcSel2')[a.id.slice(6)-1].selected= true;

		// セレクトボックスの中身を全て判定し、押されたレイヤー以外をzIndex3, 太字解除する
		for (var i = 0; i < $('#myTrcSel2').children('option').length; i++) {
			//$("#myTxt" + (i + 1)).css('z-index', '3');
			$("#myTrcSel2 option:nth-child(" + (i + 1) + ")").css("font-weight", "");
		}

		if ((a.id.slice(6) - 1) == -1) {
			$("#myTrcSel2 option:nth-child(" + 0 + ")").css("font-weight", "bold");
		} else {
			var layerNo = a.id.slice(6);

			//layerNo = (String(layerNo)).split('_')[1];
			$("#option_" + layerNo).css("font-weight", "bold");
			//var temp = 'nth-child(' + (a.id.slice(6)) + ')';

			//$("#myTrcSel2 option:" + temp).css("font-weight", "bold");
		}

		for (var i = 0; i < $('#myTrcSel2').children('option').length; i++) {
			var layerNos = $("#myTrcSel2 option:nth-child(" + (i + 1) + ")").attr("id");
			if ($("#myTrcSel2 option:nth-child(" + (i + 1) + ")").css("font-weight") == "bold" ||
				$("#myTrcSel2 option:nth-child(" + (i + 1) + ")").css("font-weight") == "700") {
				// 太字のレイヤーのidを取得する
				layerNos = (String(layerNos)).split('_')[1];
				$("#myTxt_" + layerNos).css('zIndex', '4');
			} else {
				$("#myTxt_" + layerNos).css('zIndex', '3');
			}
		}
	}

    /*----------------------------------------------------------------------------------------------------
    [選択レイヤーの削除]
    ----------------------------------------------------------------------------------------------------*/
	$("#myTrcDel").click(function () {
		//
		if ($('#myTrcSel2').val() === null) { return; }
		var q = confirm("選択中のレイヤーを削除します。")
		if (q === false) { return; }

		//選択中レイヤを削除し全部1つ前に詰める
		//var a = document.getElementById("myTxt" + (String($('#myTrcSel2').val())).split(" ")[0]);
		//a.parentNode.removeChild(a);
		//

		// 削除対象のカウント
		var loopCount = $('#myTrcSel2').children().length;

		// 関連するtextareaの削除
		//$('#myTxt1').remove();

		//選択中レイヤを削除し全部1つ前に詰める
		DeleteMyTxtLayer();


		// 削除対象の行数
		var temp = $('#myTrcSel2 > option:selected').remove().length;

		// 選択されているoption要素を全消去
		$('#myTrcSel2 > option:selected').remove();


		// レイヤーのNoを小さい数字から対応していく
		// (原則は小さい数字が下の方にある)
		for (var i = 1; i <= loopCount; i++) {
			// textareaのidの再割り振り
			//$("#myTxt_" + i).id = ("myTxt_" + (i + 1));
		}

		// レイヤー番号とテキストの数値部分の詰め
		var op = $('#myTrcSel2').children();
		var temp;
		for (var i = 0; i < op.length; i++) {
			var val = op.eq(i).val().split(" ");
			var tex = op.eq(i).text().split(" ");
			//op.eq(i)[0].id = "option_" + (i + 1);
			//temp = temp.split("_")[1];

			//temp = 
			// valueとtextを変更
			$("#myTrcSel2 > option:eq(" + i + ")").prop("value", (i + 1) + " " + val[1] + " " + val[2]);
			$("#myTrcSel2 > option:eq(" + i + ")").prop("text", (i + 1) + " " + val[1] + " " + val[2] + " " + tex[3]);
			//$("#option_" + temp).id = "option_" + i;
		}

		//var list = [];
		//$(".myTxtClass").each(function () {
		//	list.push($(this).attr('id'));
		//});

		//var obj;
		//for (var j = 0; j < list.length; j++) {
		//	obj = document.getElementById(list[j]);
		//	//obj.id = "myTxt_" + (j + 1);
		//}
		//$("#myTxt_" + list.length).css('zIndex', '4');
		//$("#myTrcSel2 option:nth-child(" + list.length + ")").css("font-weight", "bold");
	});

	/*----------------------------------------------------------------------------------------------------
	[レイヤー削除処理]
	----------------------------------------------------------------------------------------------------*/
	function DeleteMyTxtLayer() {
		var fruit = $('#myTrcSel2').val();
		console.log(fruit);

		//var layerNo = $("#myTrcSel2 option:nth-child(" + (i + 1) + ")")[0].id;
		//layerNo = $('[name=MyTrcSel] option:selected')[i];
		//layerNo = layerNo.id.split("_")[1];

		// 要素の数だけループ
		var deleteIdCount = fruit.length;
		var a;
		var layerNo;
		for (i = 0; i < deleteIdCount; i++) {
			// layerNo = $("#myTrcSel2 option:nth-child(" + (i + 1) + ")")[0].id;
			layerNo = $('[name=MyTrcSel] option:selected')[i];
			layerNo = layerNo.id.split("_")[1];

			// deleteId = (String(fruit[i])).split(" ");
			a = document.getElementById("myTxt_" + layerNo);
			a.parentNode.removeChild(a);
		}
	}


    /*----------------------------------------------------------------------------------------------------
    [スライダーの代わりの画像から色データを取得する処理]
    ----------------------------------------------------------------------------------------------------*/
	var flags = false;
	var temp_zIndex = [];
	$('#textColorChange').click(function () {
		var layerNo;
		if (flags == false) {
			flags = true;
			$("label[for*='textColorChange']").html("色の反映");
			//全レイヤーを一番下に(擬似的に非表示にする)
			for (i = 0; i < $('#myTrcSel2').children('option').length; i++) {
				temp_zIndex[i] = $("#myTxt_" + $('#myTrcSel2').children('option')[i].id.split("_")[1]).css('zIndex');
				$("#myTxt_" + $('#myTrcSel2').children('option')[i].id.split("_")[1]).css('zIndex', '0');
			}
		} else {
			flags = false;
			$("label[for*='textColorChange']").html("選択レイヤー色変更");
			//全レイヤーを表示にする（元から非表示のものは非表示のままに）
			for (i = 0; i < $('#myTrcSel2').children('option').length; i++) {
				$("#myTxt_" + $('#myTrcSel2').children('option')[i].id.split("_")[1]).css('zIndex', temp_zIndex[i]);
				//$("myTxt" + (i+1)).style.zIndex = '4';
			}
		}
	});

	/*----------------------------------------------------------------------------------------------------
	[色取得処理]
	----------------------------------------------------------------------------------------------------*/
	function RGB2bgColor(r, g, b) {
		r = r.toString(16);
		if (r.length == 1) r = "0" + r;

		g = g.toString(16);
		if (g.length == 1) g = "0" + g;

		b = b.toString(16);
		if (b.length == 1) b = "0" + b;

		return '#' + r + g + b;
	}

	var canvas_color = document.getElementById("myImg");
	if (canvas_color.getContext) {
		// コンテキストの取得
		var ctx = canvas_color.getContext("2d");
	}

	canvas_color.onclick = function (evt) {
		if (flags == true) {
			//  マウス座標の取得
			var x = parseInt(evt.offsetX);
			var y = parseInt(evt.offsetY);

			//  指定座標のImageDataオブジェクトの取得
			var imagedata = ctx.getImageData(x, y, 1, 1);

			//  RGBAの取得
			var r = imagedata.data[0];
			var g = imagedata.data[1];
			var b = imagedata.data[2];
			var a = imagedata.data[3];

			r = parseInt(r).toString(16);
			if (r < 10) r = "0" + r;

			g = parseInt(g).toString(16);
			if (g < 10) g = "0" + g;

			b = parseInt(b).toString(16);
			if (b < 10) b = "0" + b;

			var colorSetLayerNo = 0;
			var layerNo;
			//layerNo = $('#myTrcSel2').children('option')[i];
			//layerNo = layerNo.id.split("_")[1];
			// セレクトボックスの中身を全て判定し、押されたレイヤー以外をzIndex3, 太字解除する
			for (i = 0; i < $('#myTrcSel2').children('option').length; i++) {
				layerNo = $('#myTrcSel2').children('option')[i];
				layerNo = layerNo.id.split("_")[1];
				//alert($("#myTrcSel2 option:nth-child(" + (i + 1) + ")").css("font-weight"));
				if ($("#option_" + layerNo).css("font-weight") == "bold" ||
					$("#option_" + layerNo).css("font-weight") == "700") {
					colorSetLayerNo = layerNo;
				}
			}
			var t = document.getElementById("myTxt_" + colorSetLayerNo)
			t.style.color = "#" + r + "" + g + "" + b;
			var u = document.getElementById("option_" + colorSetLayerNo)
			var tempCommand = u.value.split(" ");
			tempCommand[4] = "#" + r + "" + g + "" + b;
			u.value = tempCommand[0] + " " + tempCommand[1] + " " + tempCommand[2] + " " + tempCommand[3] + " " + tempCommand[4];
			//$("label[for*='textColorChange']").html("色の反映:" + "#" + r + "" + g + "" + b);
		}
	}

	/*----------------------------------------------------------------------------------------------------
	[レイヤーの表示を切り替えする処理]
	----------------------------------------------------------------------------------------------------*/
	$('#layerVisible').click(function () {
		if ($('[name=MyTrcSel]').val() == null) { return; }
		var fruit = $('[name=MyTrcSel] option:selected');

		// 要素の数だけループ
		var dispChange;
		for (i = 0; i < fruit.length; i++) {
			dispChange = fruit[i].innerHTML.split(" ");
			// optionIDを取得する
			var layerNo;
			layerNo = $('[name=MyTrcSel] option:selected')[i];
			layerNo = layerNo.id.split("_")[1];

			// zIndexが4or3なら0に、0なら4or3に
			if ($("#myTxt_" + layerNo).css('zIndex') == '4' || $("#myTxt_" + layerNo).css('zIndex') == '3') {
				$("#myTxt_" + layerNo).css('zIndex', '0');
				//$("#myTrcSel2 option:nth-child(" + layerNo + ")").text($("#myTrcSel2 option:nth-child(" + layerNo + ")").text().replace('●', '○'));
				$("#option_" + layerNo).text($("#option_" + layerNo).text().replace('●', '○'));
			} else {
				if ($("#myTrcSel2 option:nth-child(" + (i + 1) + ")").css("font-weight") == "bold" ||
					$("#myTrcSel2 option:nth-child(" + (i + 1) + ")").css("font-weight") == "700") {
					$("#myTxt_" + layerNo).css('zIndex', '4');
					$("#option_" + layerNo).text($("#option_" + layerNo).text().replace('○', '●'));
					//$("#myTrcSel2 option:nth-child(" + layerNo + ")").text($("#myTrcSel2 option:nth-child(" + layerNo + ")").text().replace('○', '●'));
				} else {
					$("#myTxt_" + layerNo).css('zIndex', '3');
					$("#option_" + layerNo).text($("#option_" + layerNo).text().replace('○', '●'));
					//$("#myTrcSel2 option:nth-child(" + layerNo + ")").text($("#myTrcSel2 option:nth-child(" + layerNo + ")").text().replace('○', '●'));
				}
			}
		}
	});

	/*----------------------------------------------------------------------------------------------------
	[レイヤーの表示を一括で切り替えする処理]
	// レイヤーの表示を選択状態に関わらず反転させる処理
	----------------------------------------------------------------------------------------------------*/
	$('#layerAllVisible').click(function () {
		if ($('#myTrcSel2').val() == null) { return; }
		// 要素の数だけループ
		for (i = 0; i < $('#myTrcSel2').children('option').length; i++) {
			//dispChange = (String(fruit[i])).split(" ");
			// optionIDを取得する
			var layerNo;
			layerNo = $('#myTrcSel2').children('option')[i];
			layerNo = layerNo.id.split("_")[1];
			// zIndexが4or3なら0に、0なら4or3に
			if ($("#myTxt_" + (layerNo)).css('zIndex') == '4' || $("#myTxt_" + (layerNo)).css('zIndex') == '3') {
				$("#myTxt_" + (layerNo)).css('zIndex', '0');
				$("#option_" + layerNo).text($("#option_" + layerNo).text().replace('●', '○'));
			} else {
				if ($("#myTrcSel2 option:nth-child(" + (layerNo) + ")").css("font-weight") == "bold" ||
					$("#myTrcSel2 option:nth-child(" + (layerNo) + ")").css("font-weight") == "700") {
					$("#myTxt_" + (layerNo)).css('zIndex', '4');
					$("#option_" + layerNo).text($("#option_" + layerNo).text().replace('○', '●'));
				} else {
					$("#myTxt_" + (layerNo)).css('zIndex', '3');
					$("#option_" + layerNo).text($("#option_" + layerNo).text().replace('○', '●'));
				}
			}
		}
	});

	/*----------------------------------------------------------------------------------------------------
	[レイヤーに対して名前を設定する処理]
	----------------------------------------------------------------------------------------------------*/
	$('#layerNameChange').click(function () {
		if ($('#myTrcSel2').val() == null) { return; }
		var nameSetId = 0;
		var fruit;
		var layerNo;
		var count;
		var layerTemps;
		for (i = 0; i < $('#myTrcSel2').children('option').length; i++) {
			if ($("#option_" + $('#myTrcSel2').children('option')[i].id.split("_")[1]).css("font-weight") == "bold" ||
				$("#option_" + $('#myTrcSel2').children('option')[i].id.split("_")[1]).css("font-weight") == "700") {
				//nameSetId = $('#myTrcSel2').children('option')[i].id.split("_")[1];
				count = i + 1;
				fruit = $("#option_" + $('#myTrcSel2').children('option')[i].id.split("_")[1]).val();
				layerTemps = $('#myTrcSel2').children('option')[i].id.split("_")[1];
			}
		}
		layerName = window.prompt(count + "番目のレイヤー名を設定します。\nレイヤー名を入力してください。\n※半角スペースと,と●と○は使えません", "");
		if (layerName.match(/○/) || layerName.match(/●/)|| layerName.match(/ /)|| layerName.match(/,/)) {
			window.alert('禁止文字が使われています。');
		} else {
			var layerTemp = fruit
			layerNo = (String(fruit)).split(" ");
			layerNo[3] = layerName;
			// 設定処理
			dispChange = (String(fruit)).split(" ");
			$("#option_" + layerTemps).text(
				dispChange[0] + " " + dispChange[1] + " " + dispChange[2] + " " + layerName);
			$("#option_" + layerTemps).val(dispChange[0] + " " + dispChange[1] + " " + dispChange[2] + " " + layerNo[3]);
		}
	});

	/*----------------------------------------------------------------------------------------------------
	[選択レイヤーの順番を上にあげる処理]
	// 上にあげるのでidが小さくなるイメージ。
	// つまり他のやつが1つ数字があがる
	----------------------------------------------------------------------------------------------------*/
	$('#layerUp').click(function () {
		var dispChange;
		var nameSetId = 0;
		var fruit;

		for (i = 0; i < $('#myTrcSel2').children('option').length; i++) {
			if ($("#myTrcSel2 option:nth-child(" + (i + 1) + ")").css("font-weight") == "bold" ||
				$("#myTrcSel2 option:nth-child(" + (i + 1) + ")").css("font-weight") == "700") {
				nameSetId = (i + 1);	// 現時点の選択されているレイヤーの番号を取得
			}
		}

		// 先頭が選択されていたら処理しない
		if (nameSetId == 1) { return; }

		// 動画上のトレース用レイヤーのIDも一つあげる
		var list = [];
		$(".myTxtClass").each(function () {
			list.push($(this).attr('id'));
		});

		var tempLayer;
		// 選択されているレイヤーの情報を取得
		for (i = 0; i < $('#myTrcSel2').children('option').length; i++) {
			fruit = $("#myTrcSel2 option:nth-child(" + (i + 1) + ")").text();		// 元が下のやつ
			dispChange = (String(fruit)).split(" ");
			if ($("#myTrcSel2 option:nth-child(" + (i + 1) + ")").css("font-weight") == "bold" ||
				$("#myTrcSel2 option:nth-child(" + (i + 1) + ")").css("font-weight") == "700") {
				//dispChange = (String(fruit)).split(" ");
				tempLayer = $("#myTrcSel2 option:nth-child(" + i + ")").text();	// 元が上のやつ
				tempLayer = (String(tempLayer)).split(" ");	// テキスト区切り
				var tempObj_up = document.getElementById(list[nameSetId - 1]);
				var tempObj_down = document.getElementById(list[nameSetId - 2]);

				nameSetId = (i + 1);	// 現時点の選択されているレイヤーの番号を取得

				//tempObj_down.id = "myTxt_" + (nameSetId) + "_temp";
				fruit = $("#myTrcSel2 option:nth-child(" + nameSetId + ")").text();
				// レイヤー番号を変更
				$("#myTrcSel2 option:nth-child(" + nameSetId + ")").text((nameSetId - 1) + " " + dispChange[1] + " " + dispChange[2] + " " + dispChange[3]);
				// レイヤーの配置を一つ上にあげる
				$("#myTrcSel2 option:nth-child(" + (nameSetId - 1) + ")").before($("#myTrcSel2 option:nth-child(" + (nameSetId) + ")"));
				//tempObj_up.id = "myTxt_" + (nameSetId - 1);
				//tempObj_down.id = "myTxt_" + (nameSetId);

				// 入れ替え
				//$("#myTxt_" + (nameSetId + 1)).before($("#myTxt_" + nameSetId));

				//$("#myTrcSel2 option:nth-child(" + nameSetId + ")").text((nameSetId - 1) + " " + dispChange[1] + " " + dispChange[2] + " " + dispChange[3]);
				// 下がったレイヤーの番号を変更する
				$("#myTrcSel2 option:nth-child(" + nameSetId + ")").text((nameSetId) + " " + tempLayer[1] + " " + tempLayer[2] + " " + tempLayer[3]);
			}
		}

		var list = [];
		$(".myTxtClass").each(function () {
			list.push($(this).attr('id'));
		});

		var obj;
		for (var j = 0; j < list.length; j++) {
			obj = document.getElementById(list[j]);
			//obj.id = "myTxt_" + (j + 1);
		}

		// レイヤーのNoを小さい数字から対応していく
		// (原則は小さい数字が下の方にある)
		//for (var i = 1; i <= loopCount; i++) {
		//	// textareaのidの再割り振り
		//	$("#myTxt_" + i).id = ("myTxt_" + (i + 1));
		//}

		//// レイヤー番号とテキストの数値部分の詰め
		//var op = $('#myTrcSel2').children();
		//for (var i = 0; i < op.length; i++) {
		//	var val = op.eq(i).val().split(" ");
		//	var tex = op.eq(i).text().split(" ");
		//	// valueとtextを変更
		//	$("#myTrcSel2 > option:eq(" + i + ")").prop("value", (i + 1) + " " + val[1] + " " + val[2]);
		//	$("#myTrcSel2 > option:eq(" + i + ")").prop("text", (i + 1) + " " + val[1] + " " + val[2] + " " + tex[3]);
		//}

		//var list = [];
		//$(".myTxtClass").each(function () {
		//	list.push($(this).attr('id'));
		//});

		//var obj;
		//for (var j = 0; j < list.length; j++) {
		//	obj = document.getElementById(list[j]);
		//	obj.id = "myTxt_" + (j + 1);
		//}
	});

	/*----------------------------------------------------------------------------------------------------
	[選択レイヤーの順番を下にする処理]
	// 下にさげるのでidが大きくなるイメージ。
	// つまり他のやつが1つ数字が下がる
	----------------------------------------------------------------------------------------------------*/
	$('#layerDown').click(function () {
		var dispChange;
		var nameSetId = 0;
		var fruit;

		for (i = 0; i < $('#myTrcSel2').children('option').length; i++) {
			if ($("#myTrcSel2 option:nth-child(" + (i + 1) + ")").css("font-weight") == "bold" ||
				$("#myTrcSel2 option:nth-child(" + (i + 1) + ")").css("font-weight") == "700") {
				nameSetId = (i + 1);	// 現時点の選択されているレイヤーの番号を取得
			}
		}

		// 一番下のレイヤーが選択されていたら処理しない
		if (nameSetId == $('#myTrcSel2').children('option').length) { return; }

		// 動画上のトレース用レイヤーのIDも一つあげる
		var list = [];
		$(".myTxtClass").each(function () {
			list.push($(this).attr('id'));
		});

		var tempLayer;
		var changeFlag = true;
		// 選択されているレイヤーの情報を取得
		for (i = 0; i < $('#myTrcSel2').children('option').length; i++) {
			fruit = $("#myTrcSel2 option:nth-child(" + (i + 1) + ")").text();		// 元が下のやつ
			dispChange = (String(fruit)).split(" ");
			if (changeFlag) {
				if ($("#myTrcSel2 option:nth-child(" + (i + 1) + ")").css("font-weight") == "bold" ||
					$("#myTrcSel2 option:nth-child(" + (i + 1) + ")").css("font-weight") == "700") {
					//dispChange = (String(fruit)).split(" ");
					tempLayer = $("#myTrcSel2 option:nth-child(" + (i + 2) + ")").text();	// 元が下のやつ
					tempLayer = (String(tempLayer)).split(" ");	// テキスト区切り
					var tempObj_up = document.getElementById(list[nameSetId - 2]);
					var tempObj_down = document.getElementById(list[nameSetId]);

					nameSetId = (i + 1);	// 現時点の選択されているレイヤーの番号を取得

					//tempObj_down.id = "myTxt_" + (nameSetId) + "_temp";
					fruit = $("#myTrcSel2 option:nth-child(" + nameSetId + ")").text();
					// レイヤー番号を変更
					$("#myTrcSel2 option:nth-child(" + nameSetId + ")").text((nameSetId + 1) + " " + dispChange[1] + " " + dispChange[2] + " " + dispChange[3]);
					// レイヤーの配置を一つ上にあげる
					$("#myTrcSel2 option:nth-child(" + (nameSetId) + ")").before($("#myTrcSel2 option:nth-child(" + (nameSetId + 1) + ")"));
					//tempObj_up.id = "myTxt_" + (nameSetId - 1);
					//tempObj_down.id = "myTxt_" + (nameSetId);

					// 入れ替え
					//$("#myTxt_" + (nameSetId + 1)).before($("#myTxt_" + nameSetId));

					//$("#myTrcSel2 option:nth-child(" + nameSetId + ")").text((nameSetId - 1) + " " + dispChange[1] + " " + dispChange[2] + " " + dispChange[3]);
					// 下がったレイヤーの番号を変更する
					$("#myTrcSel2 option:nth-child(" + nameSetId + ")").text((nameSetId) + " " + tempLayer[1] + " " + tempLayer[2] + " " + tempLayer[3]);
					changeFlag = false;
				}
			}
		}


		var list = [];
		$(".myTxtClass").each(function () {
			list.push($(this).attr('id'));
		});

		var obj;
		for (var j = 0; j < list.length; j++) {
			obj = document.getElementById(list[j]);
			//obj.id = "myTxt_" + (j + 1);
		}

		// レイヤーのNoを小さい数字から対応していく
		// (原則は小さい数字が下の方にある)
		//for (var i = 1; i <= loopCount; i++) {
		//	// textareaのidの再割り振り
		//	$("#myTxt_" + i).id = ("myTxt_" + (i + 1));
		//}

		//// レイヤー番号とテキストの数値部分の詰め
		//var op = $('#myTrcSel2').children();
		//for (var i = 0; i < op.length; i++) {
		//	var val = op.eq(i).val().split(" ");
		//	var tex = op.eq(i).text().split(" ");
		//	// valueとtextを変更
		//	$("#myTrcSel2 > option:eq(" + i + ")").prop("value", (i + 1) + " " + val[1] + " " + val[2]);
		//	$("#myTrcSel2 > option:eq(" + i + ")").prop("text", (i + 1) + " " + val[1] + " " + val[2] + " " + tex[3]);
		//}

		//var list = [];
		//$(".myTxtClass").each(function () {
		//	list.push($(this).attr('id'));
		//});

		//var obj;
		//for (var j = 0; j < list.length; j++) {
		//	obj = document.getElementById(list[j]);
		//	obj.id = "myTxt_" + (j + 1);
		//}
	});

	/*----------------------------------------------------------------------------------------------------
	[選択レイヤーの順番を下にする処理]
	// 下にさげるのでidが大きくなるイメージ。
	// つまり他のやつが1つ数字が下がる
	----------------------------------------------------------------------------------------------------*/
	var count = 0;
	var AllClick = false;
	$('#layerOutputAll').click(function () {
		count = 0;
		AllClick = true;
		for (var i = 0; i <= $('#myTrcSel2').length; i++) {
			//$('#myTrcSel2')[i].selected = true;
			$('#layerOutput').click();
		}
		// 最後に全出力からを判定するフラグをfalseに戻す
		AllClick = false;
	});
	$('#layerOutput').click(function () {
		if (!AllClick) {
			count = 0;
		}

		if ($('#myTrcSel2').val() === null) { return; }

		var layerNo;
		//layerNo = $('#myTrcSel2').children('option')[i];
		//layerNo = layerNo.id.split("_")[1];

		// 全体
		var a;
		var All = true;
		try {
			// 全行出力の場合はこちら
			//a = $("#myTxt_" + $('myTrcSel2')[count - 1].value.split(" ")[0]).value;
			//a = $("#myTxt_" + $('myTrcSel2')[count - 1].value.split(" ")[0]);
			layerNo = $('#myTrcSel2').children('option')[count];
			layerNo = layerNo.id.split("_")[1];
			a = $("#myTxt_" + layerNo).val();
			All = true;
		} catch (e) {
			// 個別出力の場合はこちら
			//a = $("#myTxt_" + $('myTrcSel2').value.split(" ")[0]).value;
			layerNo = $('#myTrcSel2').children('option')[count];
			layerNo = layerNo.id.split("_")[1];
			a = $("#myTxt_" + layerNo).val();
			All = false;
		}
		count++;

		//半スペ、A0が含まれていたらNG
		if (a.indexOf('\u00A0') != -1) {
			alert('u00A0が' + (a.indexOf('\u00A0') + 1) + '文字目にあるので出力を停止します。')
			return;
		}
		if (a.indexOf('\u0020') != -1) {
			alert('u0020が' + (a.indexOf('\u0020') + 1) + '文字目にあるので出力を停止します。')
			return;
		}
		//全角空白は全て2003へ
		a = a.replace(/[\u2001]/g, '\u2003');
		a = a.replace(/[\u3000]/g, '\u2003');
		a = a.replace(/[\u2000]/g, '\u2002');
		//空白の最適化 200Aを使う
		a = a.replace(/[\u2003]/g, Array(12 + 1).join('\u200A'));
		a = a.replace(/[\u2002]/g, Array(6 + 1).join('\u200A'));
		a = a.replace(/[\u2004]/g, Array(4 + 1).join('\u200A'));
		a = a.replace(/[\u2005]/g, Array(3 + 1).join('\u200A'));
		a = a.replace(/[\u2006]/g, Array(2 + 1).join('\u200A'));
		//戻す
		a = a.replace(/[\u200A]{12}/g, '\u2003');
		a = a.replace(/[\u200A]{6}/g, '\u2002');
		a = a.replace(/[\u200A]{4}/g, '\u2004');
		a = a.replace(/[\u200A]{3}/g, '\u2005');
		a = a.replace(/[\u200A]{2}/g, '\u2006');
		//余りの処理　パターンは3つ
		a = a.replace(/[\u2003][\u200A]/g, '\u2002' + '\u2004' + '\u2005');
		a = a.replace(/[\u2002][\u200A]/g, '\u2004' + '\u2005');
		a = a.replace(/[\u2004][\u200A]/g, '\u2005' + '\u2006');

		var b = a.split(/[\n\r]/g);
		var c;//調査文字

		var d;
		if (All) {
			//d = $('myTrcSel2')[count - 1].value.split(" ")[1].split("_");
			d = $('#myTrcSel2').children('option')[count - 1].value;
			d = d.split("_");
		} else {
			//d = $('myTrcSel2').value.split(" ")[1].split("_");
			d = $('#myTrcSel2').children('option')[count - 1].value;
			d = d.split("_");
		}
		var w = 0; //=  //あとでWから取得するように
		var l = 0; //=  //あとでlから取得するように
		var e;//計算用
		var f;
		var n = [];//長さ、左空白幅格納配列
		var nd = [];//処理用
		var z;//出力用
		var zi;//出力文字数
		var p;//ループ用
		var q;//ループ用
		var r;//ループスイッチ用
		//色
		var u = "#FFFFFF";
		if (All) {
			try {
				u = $('#myTrcSel2').children('option')[count - 1].value.split(" ")[4];
				//u = "#" + parseInt($("myTxt" + $('myTrcSel2')[count - 1].value.split(" ")[0]).style.color.match(/\d+/g)[0]).toString(16).replace(/^[0-9A-F]$/, "0$&")
				//	+ parseInt($("myTxt" + $('myTrcSel2')[count - 1].value.split(" ")[0]).style.color.match(/\d+/g)[1]).toString(16).replace(/^[0-9A-F]$/, "0$&")
				//	+ parseInt($("myTxt" + $('myTrcSel2')[count - 1].value.split(" ")[0]).style.color.match(/\d+/g)[2]).toString(16).replace(/^[0-9A-F]$/, "0$&");
			} catch (e) {
				u = "色未設定です";
			}
		} else {
			try {
				u = $('#myTrcSel2').children('option')[count - 1].value.split(" ")[4];
				//u = "#" + parseInt($("myTxt" + $('myTrcSel2').value.split(" ")[0]).style.color.match(/\d+/g)[0]).toString(16).replace(/^[0-9A-F]$/, "0$&")
				//	+ parseInt($("myTxt" + $('myTrcSel2').value.split(" ")[0]).style.color.match(/\d+/g)[1]).toString(16).replace(/^[0-9A-F]$/, "0$&")
				//	+ parseInt($("myTxt" + $('myTrcSel2').value.split(" ")[0]).style.color.match(/\d+/g)[2]).toString(16).replace(/^[0-9A-F]$/, "0$&");
			} catch (e) {
				u = "色未設定です";
			}
		}
		if(u == null){
			u = "色情報が未設定です";
		}

		var v = '';//コマンド
		r = true;

		//サイズチェック
		for (var i = 0; i < d.length; i++) {
			if (d[i].slice(0, 1) == "W") {
				w = d[i].slice(1) * 12;
			} else if (d[i].slice(0, 1) == "L") {
				l = d[i].slice(1);
				var tempL = l.split(" ");
				l = tempL[0];
			} else if (d[i].slice(0, 1) == "C") {
				//
			} else {
				v += d[i] + " ";
			}
		}
		v = "[" + u + " " + v.slice(0, -1) + "]";

		for (var i = 0; i < b.length; i++) {

			//文字を分解し幅を調べて行く
			c = b[i].split("")
			p = 0; q = 0; //g= ''
			for (var m = 0; m < c.length; m++) {
				switch (c[m]) {
					case '\u2003':
						p += 12;
						if (r === true) {
							q += 12;
							//g += Array(12+1).join('\uA003');
						}
						break;
					case '\u2002':
						p += 6;
						if (r === true) {
							q += 6;
							//g += Array(6+1).join('\uA003');
						}
						break;
					case '\u2004':
						p += 4;
						if (r === true) {
							q += 4;
							//g += Array(4+1).join('\uA003');
						}
						break;
					case '\u2005':
						p += 3;
						if (r === true) {
							q += 3;
							//g += Array(3+1).join('\uA003');
						}
						break;
					case '\u2006':
						p += 2;
						if (r === true) {
							q += 2;
							//g += Array(2+1).join('\uA003');
						}
						break;
					case '\u200A':
						p += 1;
						if (r === true) {
							q += 1;
							//g += Array(2+1).join('\uA003');
						}
						break;
					case '\u005F':
					case '\u00AF':
					case '\u2216':
					case '\uFFE8':
						p += 6;
						r = false;
						break;
					case '\u2580':
					case '\u2590':
						p += 8.5;
						r = false;
						break;
					case '\u2043':
						p += 3.692307;
						r = false;
						break;
					case '\u01C0':
						p += 3.111111;
						r = false;
						break;
					case '\u207B':
					case '\u208B':
						p += 3.466666;
						r = false;
						break;
					case '\u002F':
						p += 5.647058;
						r = false;
						break;
					default:
						//未登録文字を検討、塗り用として割り切るか
						p += 12;
						r = false;
						break;
				}
			}
			//終わった時点でr=true;なら空白しか無い行。さよならする
			if (r !== true) {
				n[i] = {};
				n[i].LINE = i;
				//切り上げないと臨界幅超えたら怖いが微妙なずれは発生する
				n[i].WIDTH = Math.ceil(p);
				n[i].LEFTSPACE = q;
				n[i].TEXT = b[i];
				r = true;
				//この時点でw<pなら終了
				if (p > w) {
					alert('テンプレ幅超えてます');
					return;
				}
			}
		}

		//幅順ソート
		n.sort(function (x, y) {
			if (x.WIDTH > y.WIDTH) return -1;
			if (x.WIDTH < y.WIDTH) return 1;
			return 0;
		});

		//配列なくなるまでループ
		while (n[0] != undefined) {
			//出力用テンプレのセット
			for (i = 0; i < l; i++) {
				if (i == l - 1) {
					nd[i] = '\uA001'
				} else {
					if (i == 0 || (i % 3) == 0) {
						nd[i] = '\uA001' + '\uA002'
					} else {
						nd[i] = '\uA002'
					}
				}
			}

			//左空白少ない順ソート
			n.sort(function (x, y) {
				if (x.LEFTSPACE < y.LEFTSPACE) return -1;
				if (x.LEFTSPACE > y.LEFTSPACE) return 1;
				return 0;
			});
			//左空白削り
			p = n[0].LEFTSPACE;

			//幅順ソート
			n.sort(function (x, y) {
				if (x.WIDTH > y.WIDTH) return -1;
				if (x.WIDTH < y.WIDTH) return 1;
				return 0;
			});
			//右空白削り
			q = w - n[0].WIDTH;

			//どちらか。左の方が削れるサイズが大きければ右スペース分を削る
			if (p > q) {
				p = q;
			} else {
				//右の方が削れるならば幅順に並べて左スペースをすべて消す
				n.sort(function (x, y) {
					if (x.LEFTSPACE < y.LEFTSPACE) return -1;
					if (x.LEFTSPACE > y.LEFTSPACE) return 1;
					return 0;
				});
			}
			//l==0なら1行改行無しなので右に追加するしかない
			if (l == 0) {
				p = 0;
			}


			//すべてに対して左削り
			if (p != 0) {
				w -= p * 2;
				for (var i = 0; i < n.length; i++) {
					if (n[i] == undefined) { break; }
					n[i].WIDTH -= p;
					n[i].LEFTSPACE -= p;
					for (var m = 0; m < p; m++) {
						//n[i].WIDTH -= 1;
						//n[i].LEFTSPACE -= 1;
						//文字によって処理がことなる
						switch (n[i].TEXT.slice(0, 1)) {
							case '\u2003':
								//12-11
								//n[i].TEXT = Array(12).join('\uA003') + n[i].TEXT.slice(1);
								n[i].TEXT = '\u2002' + '\u2005' + '\u2006' + n[i].TEXT.slice(1);
								break;
							case '\u2002':
								//6-5
								//n[i].TEXT = Array(6).join('\uA003') + n[i].TEXT.slice(1);
								n[i].TEXT = '\u2005' + '\u2006' + n[i].TEXT.slice(1);
								break;
							case '\u2004':
								//4-3
								//n[i].TEXT = Array(4).join('\uA003') + n[i].TEXT.slice(1);
								n[i].TEXT = '\u2005' + n[i].TEXT.slice(1);
								break;
							case '\u2005':
								//3-2
								//n[i].TEXT = Array(3).join('\uA003') + n[i].TEXT.slice(1);
								n[i].TEXT = '\u2006' + n[i].TEXT.slice(1);
								break;
							case '\u2006':
								//2-1
								n[i].TEXT = Array(2).join('\u200A') + n[i].TEXT.slice(1);
								break;
							case '\u200A':
								n[i].TEXT = n[i].TEXT.slice(1);
								break;
							default:
								break;
						}
					}
					//端数処理及び途中の空白含む再変換
					n[i].TEXT = n[i].TEXT.replace(/[\u2003]/g, Array(12 + 1).join('\u200A'));
					n[i].TEXT = n[i].TEXT.replace(/[\u2002]/g, Array(6 + 1).join('\u200A'));
					n[i].TEXT = n[i].TEXT.replace(/[\u2004]/g, Array(4 + 1).join('\u200A'));
					n[i].TEXT = n[i].TEXT.replace(/[\u2005]/g, Array(3 + 1).join('\u200A'));
					n[i].TEXT = n[i].TEXT.replace(/[\u2006]/g, Array(2 + 1).join('\u200A'));

					n[i].TEXT = n[i].TEXT.replace(/[\u200A]{12}/g, '\u2003');
					n[i].TEXT = n[i].TEXT.replace(/[\u200A]{6}/g, '\u2002');
					n[i].TEXT = n[i].TEXT.replace(/[\u200A]{4}/g, '\u2004');
					n[i].TEXT = n[i].TEXT.replace(/[\u200A]{3}/g, '\u2005');
					n[i].TEXT = n[i].TEXT.replace(/[\u200A]{2}/g, '\u2006');
					//余りの処理
					n[i].TEXT = n[i].TEXT.replace(/[\u2003][\u200A]/g, '\u2002' + '\u2004' + '\u2005');
					n[i].TEXT = n[i].TEXT.replace(/[\u2002][\u200A]/g, '\u2004' + '\u2005');
					n[i].TEXT = n[i].TEXT.replace(/[\u2004][\u200A]/g, '\u2005' + '\u2006');
					//1pxに泣く　左の1は0にする
					//n[i].TEXT = n[i].TEXT.replace(/[\uA003]/g,'');
				}
			}

			//n[0].WIDTH;は繰り上げの為qが狭くなる
			//その分リードの右が少なくなり右に寄る
			//微調整で+1してみるかwidthを繰り下げるか
			q = w - n[0].WIDTH;

			//リードの処理の右追加　//q = w - n[0].WIDTH;
			if (q != 0) {
				n[0].WIDTH += q;
				n[0].TEXT = n[0].TEXT + Array(q + 1).join('\u200A')

				//端数処理及び途中の空白含む再変換
				n[0].TEXT = n[0].TEXT.replace(/[\u200A]{12}/g, '\u2003');
				n[0].TEXT = n[0].TEXT.replace(/[\u200A]{6}/g, '\u2002');
				n[0].TEXT = n[0].TEXT.replace(/[\u200A]{4}/g, '\u2004');
				n[0].TEXT = n[0].TEXT.replace(/[\u200A]{3}/g, '\u2005');
				n[0].TEXT = n[0].TEXT.replace(/[\u200A]{2}/g, '\u2006');
				//余りの処理
				n[0].TEXT = n[0].TEXT.replace(/[\u2003][\u200A]/g, '\u2002' + '\u2004' + '\u2005');
				n[0].TEXT = n[0].TEXT.replace(/[\u2002][\u200A]/g, '\u2004' + '\u2005');
				n[0].TEXT = n[0].TEXT.replace(/[\u2004][\u200A]/g, '\u2005' + '\u2006');
				//1pxに泣く　右の1はゼロにする　なんとかしたい
				//n[0].TEXT = n[0].TEXT.replace(/[\uA003]/g,'');
			}

			//タブに置換
			myTab = false;
			if (myTab === true) {
				n[0].TEXT = n[0].TEXT.replace(/[\u2003]{2}/g, '\u0009')
				if (n[0].TEXT.slice(-1).match(/[\u0009]/)) {
					n[0].TEXT += '\u200C'
				}
			}
			//出力用に入れる l==0なら1コメ改行無しだが
			if (l == 0) {
				nd[n[0].LINE] = n[0].TEXT;
			} else {
				if (n[0].LINE == l - 1) {
					nd[n[0].LINE] = n[0].TEXT;
				} else {
					nd[n[0].LINE] = n[0].TEXT + '\uA002';
				}
			}
			n.splice(0, 1);

			//出力チェック
			z = ""
			for (var i = 0; i < nd.length; i++) {
				z += nd[i]
			}
			zi = z.length;

			// 投コメモード対応
			var element = document.getElementsByClassName('GridCell OwnerEditMenuContainer-left');
			if (element.length == 1) {
				//この時点で突破してたら処理終了
				if (1024 < zi) {
					alert('突破しちゃいます。' + z.length);
					return;
				}
			} else {
				//この時点で突破してたら処理終了
				if (75 < zi) {
					alert('突破しちゃいます。' + z.length);
					return;
				}
			}

			//リード決定後追加の処理
			while (n[0] != undefined) {
				//左空白が無い、かつ幅が狭い順にソート
				n.sort(function (x, y) {
					if (x.WIDTH < y.WIDTH) return -1;
					if (x.WIDTH > y.WIDTH) return 1;
					if (x.LEFTSPACE < y.LEFTSPACE) return -1;
					if (x.LEFTSPACE > y.LEFTSPACE) return 1;
					return 0;
				});

				//タブに置換
				if (myTab === true) {
					n[0].TEXT = n[0].TEXT.replace(/[\u2003]{2}/g, '\u0009')
				}

				// 投コメモード対応
				var element = document.getElementsByClassName('GridCell OwnerEditMenuContainer-left');
				if (element.length == 1) {
					//1025超えないなら
					if (1025 > zi + n[0].TEXT.length) {
						if (n[0].LINE == l - 1) {
							nd[n[0].LINE] = n[0].TEXT;
						} else {
							nd[n[0].LINE] = n[0].TEXT + '\uA002';
						}
						n.splice(0, 1);
						z = ""
						for (var i = 0; i < nd.length; i++) {
							z += nd[i]
						}
						zi = z.length;
					} else {
						//超えてたらタブを戻す
						if (myTab === true) {
							n[0].TEXT = n[0].TEXT.replace(/[\u0009]/g, '\u2003' + '\u2003');
						}
						break;
					}
				} else {
					//76超えないなら
					if (76 > zi + n[0].TEXT.length) {
						if (n[0].LINE == l - 1) {
							nd[n[0].LINE] = n[0].TEXT;
						} else {
							nd[n[0].LINE] = n[0].TEXT + '\uA002';
						}
						n.splice(0, 1);
						z = ""
						for (var i = 0; i < nd.length; i++) {
							z += nd[i]
						}
						zi = z.length;
					} else {
						//超えてたらタブを戻す
						if (myTab === true) {
							n[0].TEXT = n[0].TEXT.replace(/[\u0009]/g, '\u2003' + '\u2003');
						}
						break;
					}
				}
			}
			// a001だけ半角になってしまう・・。
			z = z.replace(/\uA001/g, ' ');
			z = z.replace(/\uA002/g, '<br>');
			z = z.replace(/\u0009/g, '[tb]');
			z = z.replace(/\u200A/g, '[0A]');

			var LayerName = d[6].split(" ");
			
			v = v.split(" ");
			//v[1] = d[5];
			//if (v != ''){
			v[1] = LayerName[2];
			var command = "";
			for(cc = 0;cc < v.length;cc++){
				command += v[cc] + ",";
			}
			command = command.replace(/,/g , " ");
			command = command.slice(0, -1);
			z = command + z;
			//v = '';
			//}
			if ($('#outputCreateTxtarea').val() == '') {
				$('#outputCreateTxtarea').val(z);
			} else {
				$('#outputCreateTxtarea').val($('#outputCreateTxtarea').val() + '\n' + z);
			}
			//n配列なくなるまでループ
		}
	});
})