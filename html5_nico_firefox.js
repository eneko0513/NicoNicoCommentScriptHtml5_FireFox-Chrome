	dd.src = "//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
	dd.onload = function() {
		f(jQuery.noConflict(true))
	};
	document.body.appendChild(dd)
})(function($) {
	
	$("#auto_insert").click(function() {
		
		var text = $("#script_text_area").val().replace(/\r\n|\r/g, "\n");
		var lines = text.split('\n');
		text = lines[0];
		if (text.match(/^\[(.+?)\](.*)/) != null) {
			var posetSet = setInterval(function() {
				if ($("#script_text_area").val() == "") clearInterval(posetSet);
				button_disabled_change(false);
			}, 6000);
			setCommandMment();
			button_disabled_change(true);
			var posetSet = setInterval(function() {
				setCommandMment();
			}, 6000);
		} else {
			alert("not [COMMAND]COMMENT");
		}
		
		
	});
	
	var comment_limit = 75;
	var versions = "0.8"; 
	var uptext = '\n75文字突破機能の実装\n(※悪用対策として184コメント時は不可,各自使い方は自己責任)';
	$("div.NicoenqueteNotificationContainer").before("<div id='scriptdiv'><button id='auto_insert'>AUTO-ALL</button><button id='single_insert'>SINGLE</button><button id='clear'>CLEAR</button><span style='margin-right: 6em;'></span><button id='convert'>Dohmo->SINGLE</button><span style='margin-right: 10em;'></span><button id='version'>ver:" + versions +"(更新内容)</button><span style='margin-right: 6em;'></span><form><label for='id_aaa' >184投下</label><input id='check_184' type='checkbox' value='check_184'><span style='margin-right: 2em;'></span><label for='id_aaa' >下から投下</label><input id='check_return' type='checkbox' value='check_return'><span style='margin-right: 2em;'></span><label for='id_aaa' >1024投下</label><input id='check_over75' type='checkbox' value='check_over75'></form><br><textarea id='script_text_area' style='margin: 0px; width: 641px; height: 122px;'></textarea></div>");

	function button_disabled_change(flag) {
		
		if (flag === true) {
			$("#auto_insert").prop("disabled", true);
			$("#single_insert").prop("disabled", true);
			$("#clear").prop("disabled", true);
			$("#script_text_area").prop("disabled", true);
			$("#convert").prop("disabled", true);
			$("#check_184").prop("disabled", true);
			$("#check_return").prop("disabled", true);
			$("#version").prop("disabled", true);
			$("#check_over75").prop("disabled", true);
		} else if (flag === false) {
			if ($("#script_text_area").val() == "") $("#auto_insert").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#single_insert").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#clear").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#script_text_area").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#convert").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#check_184").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#check_return").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#version").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#check_over75").prop("disabled", false);
		} else {
			$("#auto_insert").prop("disabled", false);
			$("#single_insert").prop("disabled", false);
			$("#clear").prop("disabled", false);
			$("#script_text_area").prop("disabled", false);
			$("#convert").prop("disabled", false);
			$("#check_184").prop("disabled", false);
			$("#check_return").prop("disabled", false);
			$("#version").prop("disabled", false);
			$("#check_over75").prop("disabled", false);
		}
	}
	
	$("#clear").click(function() {
		$("#script_text_area").val("");
	});
	
	$("#version").click(function() {
		alert('ver:' + versions + ':' + uptext);
	});
	
	$("#convert").click(function() {
		var conText = $("#script_text_area").val();
		var before = '\t';
