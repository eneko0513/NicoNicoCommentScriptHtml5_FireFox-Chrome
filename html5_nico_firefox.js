
javascript: (function(f, dd) {
	dd = document.createElement("script");
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
	var versions = "0.5"; 
	var uptext = '\n投下時のコマンドの中に全角文字が含まれている場合にエラーが出る問題を修正\n逆から投下時に末尾に改行が入っている場合にエラーが出る不具合の修正';
	$("div.NicoenqueteNotificationContainer").before("<div id='scriptdiv'><button id='auto_insert'>AUTO-ALL</button><button id='single_insert'>SINGLE</button><button id='clear'>CLEAR</button><span style='margin-right: 6em;'></span><button id='convert'>Dohmo->SINGLE</button><span style='margin-right: 10em;'></span><button id='version'>ver:" + versions +"(更新内容)</button><span style='margin-right: 6em;'></span><form><label for='id_aaa' >184投下</label><input id='check_184' type='checkbox' value='check_184'><span style='margin-right: 2em;'></span><label for='id_aaa' >下から投下</label><input id='check_return' type='checkbox' value='check_return'></form><br><textarea id='script_text_area' style='margin: 0px; width: 641px; height: 122px;'></textarea></div>");

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
		} else if (flag === false) {
			if ($("#script_text_area").val() == "") $("#auto_insert").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#single_insert").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#clear").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#script_text_area").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#convert").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#check_184").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#check_return").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#version").prop("disabled", false);
		} else {
			$("#auto_insert").prop("disabled", false);
			$("#single_insert").prop("disabled", false);
			$("#clear").prop("disabled", false);
			$("#script_text_area").prop("disabled", false);
			$("#convert").prop("disabled", false);
			$("#check_184").prop("disabled", false);
			$("#check_return").prop("disabled", false);
			$("#version").prop("disabled", false);
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
		var regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "[tab]");
		before = 'small';
		regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "[small");
		before = 'medium';
		regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "[medium");
		before = 'big';
		regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "[big");
		before = '#(.{6})(.{0})';
		regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "#$1]");
		before = '\n';
		regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "<br>\n");
		before = '#(.{7})(.{0})<br>';
		regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "#$1");
		before = '\n';
		regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "");
		before = '\\[small';
		regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "\n\[small");
		before = '\\[medium';
		regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "\n\[medium");
		before = '\\[big';
		regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "\n\[big");
		before = '\n';
		regExp = new RegExp(before, "");
		conText = conText.replace(regExp, "");
		$("#script_text_area").val();
		$("#script_text_area").val(conText);
	});
	function setCommandMment() {
		if ($("#script_text_area").val() == "") {
			clearInterval(posetSet);
		}
		var text = $("#script_text_area").val().replace(/\r\n|\r/g, "\n");
		var lines = text.split('\n');
		if($('#check_return').prop('checked')) {
			text = lines[lines.length - 1];
			
			if(text == ""){
				text = $("#script_text_area").val()
				text = text.replace(/\n+$/g,'');
				$("#script_text_area").val(text);
				text = $("#script_text_area").val().replace(/\r\n|\r/g, "\n");
				lines = text.split('\n');
				text = lines[lines.length - 1];
			}
			
			var text_length = text.length;
			var retext = $("#script_text_area").val();
			retext = retext.substr( 0, retext.length - text_length);
			retext = retext.replace(/\n+$/g,'');
		}else{
			text = lines[0];
			var retext = $("#script_text_area").val().replace(text, "");
			retext = retext.replace("\n", "");
		}

		$("#script_text_area").val(retext);
		if (text.match(/^\[(.+?)\](.*)/) != null) {
			ext = text.match(/^\[(.+?)\](.*)/);
			ext[2] = ext[2].replace(/<br>/gi, '\n');
			ext[2] = ext[2].replace(/<br \/>/gi, '\n');
			ext[2] = ext[2].replace(/\[tab\]/gi, '\t');
			if (ext[2].length > 75) {
				ext[2] = ext[2].slice(0, 75);
			}
			var elements_command = document.getElementsByClassName("CommentCommandInput")[0];
			j(elements_command, ext[1]);
			var elements_text = document.getElementsByClassName("CommentInput-textarea")[0];
			come(elements_text, ext[2]);
			var elements_post = document.getElementsByClassName("CommentPostButton")[0];
			window.setTimeout(function() {
				timers(elements_post);
			}, 1000);
			function j(elements_command, command) {
				if($('#check_184').prop('checked')) {
					elements_command.value = command;
				}else{
					elements_command.value = command + "　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　";
				}
				
				elements_command.dispatchEvent(new Event("input", {
					"bubbles": !0
				}));
			};
			function timers(a) {
				a.dispatchEvent(new MouseEvent("click", {
					"view": window,
					"bubbles": !0,
					"cancelable": !0
				}));
			};
			function come(elements_text, text) {
				elements_text.value = text;
				elements_text.dispatchEvent(new Event("input", {
					"bubbles": !0
				}));
			}
		} else {
			alert("not [COMMAND]COMMENT");
		}
	}
	$("#auto_insert").click(function() {
		var text = $("#script_text_area").val().replace(/\r\n|\r/g, "\n");
		var lines = text.split('\n');
		text = lines[0];
		if (text.match(/^\[(.+?)\](.*)/) != null) {
			var posetSet = setInterval(function() {
				if ($("#script_text_area").val() == "") {
					clearInterval(posetSet);
				}
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
	$("#single_insert").click(function() {
		var text = $("#script_text_area").val().replace(/\r\n|\r/g, "\n");
		var lines = text.split('\n');
		text = lines[0];
		if (text.match(/^\[(.+?)\](.*)/) != null) {
			button_disabled_change(true);
			setCommandMment();
			button_disabled_change("ok");
		} else {
			alert("not [COMMAND]COMMENT");
			button_disabled_change(false);
		}
	});
})
/*
javascript: (function(f, dd) {
	dd = document.createElement("script");
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
		if (text.match(/^\[[a-zA-z 0-9\#\.\(\)\+\-]+?\](.*)/) != null) {
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
	$("div.NicoenqueteNotificationContainer").before("<div id='scriptdiv'><button id='auto_insert'>AUTO-ALL</button><button id='single_insert'>SINGLE</button><button id='clear'>CLEAR</button><span style='margin-right: 6em;'></span><button id='convert'>Dohmo->SINGLE</button><span style='margin-right: 15em;'></span><label for='id_aaa'>ver0.3</label><span style='margin-right: 6em;'></span><form><label for='id_aaa' >184投下</label><input id='check_184' type='checkbox' value='check_184'><span style='margin-right: 2em;'></span><label for='id_aaa' >下から投下</label><input id='check_return' type='checkbox' value='check_return'></form><br><textarea id='script_text_area' style='margin: 0px; width: 641px; height: 122px;'></textarea></div>");

	function button_disabled_change(flag) {
		if (flag === true) {
			$("#auto_insert").prop("disabled", true);
			$("#single_insert").prop("disabled", true);
			$("#clear").prop("disabled", true);
			$("#script_text_area").prop("disabled", true);
			$("#convert").prop("disabled", true);
			$("#check_184").prop("disabled", true);
			$("#check_return").prop("disabled", true);
		} else if (flag === false) {
			if ($("#script_text_area").val() == "") $("#auto_insert").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#single_insert").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#clear").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#script_text_area").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#convert").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#check_184").prop("disabled", false);
			if ($("#script_text_area").val() == "") $("#check_return").prop("disabled", false);
		} else {
			$("#auto_insert").prop("disabled", false);
			$("#single_insert").prop("disabled", false);
			$("#clear").prop("disabled", false);
			$("#script_text_area").prop("disabled", false);
			$("#convert").prop("disabled", false);
			$("#check_184").prop("disabled", false);
			$("#check_return").prop("disabled", false);
		}
	}
	$("#clear").click(function() {
		$("#script_text_area").val("");
	});
	$("#convert").click(function() {
		var conText = $("#script_text_area").val();
		var before = '\t';
		var regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "[tab]");
		before = 'small';
		regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "[small");
		before = 'medium';
		regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "[medium");
		before = 'big';
		regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "[big");
		before = '#(.{6})(.{0})';
		regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "#$1]");
		before = '\n';
		regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "<br>\n");
		before = '#(.{7})(.{0})<br>';
		regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "#$1");
		before = '\n';
		regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "");
		before = '\\[small';
		regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "\n\[small");
		before = '\\[medium';
		regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "\n\[medium");
		before = '\\[big';
		regExp = new RegExp(before, "g");
		conText = conText.replace(regExp, "\n\[big");
		before = '\n';
		regExp = new RegExp(before, "");
		conText = conText.replace(regExp, "");
		$("#script_text_area").val();
		$("#script_text_area").val(conText);
	});

	function setCommandMment() {

		if ($("#script_text_area").val() == "") {
			clearInterval(posetSet);
		}
		var text = $("#script_text_area").val().replace(/\r\n|\r/g, "\n");
		var lines = text.split('\n');
		if($('#check_return').prop('checked')) {
			text = lines[lines.length - 1];
			var text_length = text.length;
			var retext = $("#script_text_area").val();
			retext = retext.substr( 0, retext.length - text_length);
			retext = retext.replace(/\n+$/g,'');
		}else{
			text = lines[0];
			var retext = $("#script_text_area").val().replace(text, "");
			retext = retext.replace("\n", "");
		}

		comand = text.match(/^\[[a-zA-z 0-9\#\.\(\)\+\-]+?\]/) + "";
		comand = comand.replace("[", "");
		comand = comand.replace("]", "");
		$("#script_text_area").val(retext);
		if (text.match(/^\[[a-zA-z 0-9\#\.\(\)\+\-]+?\](.*)/) != null) {
			ext = text.match(/^\[[a-zA-z 0-9\#\.\(\)\+\-]+?\](.*)/);
			ext[1] = ext[1].replace(/<br>/gi, '\n');
			ext[1] = ext[1].replace(/<br \/>/gi, '\n');
			ext[1] = ext[1].replace(/\[tab\]/gi, '\t');
			if (ext[1].length > 75) {
				ext[1] = ext[1].slice(0, 75);
			}
			var elements_command = document.getElementsByClassName("CommentCommandInput")[0];
			j(elements_command, comand);
			var elements_text = document.getElementsByClassName("CommentInput-textarea")[0];
			come(elements_text, ext[1]);
			var elements_post = document.getElementsByClassName("CommentPostButton")[0];
			window.setTimeout(function() {
				timers(elements_post);
			}, 1000);

			function j(elements_command, command) {
				if($('#check_184').prop('checked')) {
					elements_command.value = command;
				}else{
					elements_command.value = command + "　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　";
				}
				
				elements_command.dispatchEvent(new Event("input", {
					"bubbles": !0
				}));
			};

			function timers(a) {
				a.dispatchEvent(new MouseEvent("click", {
					"view": window,
					"bubbles": !0,
					"cancelable": !0
				}));
			};

			function come(elements_text, text) {
				elements_text.value = text;
				elements_text.dispatchEvent(new Event("input", {
					"bubbles": !0
				}));
			}
		} else {
			alert("not [COMMAND]COMMENT");
		}
	}
	$("#auto_insert").click(function() {
		var text = $("#script_text_area").val().replace(/\r\n|\r/g, "\n");
		var lines = text.split('\n');
		text = lines[0];
		if (text.match(/^\[[a-zA-z 0-9\#\.\(\)\+\-]+?\](.*)/) != null) {
			var posetSet = setInterval(function() {
				if ($("#script_text_area").val() == "") {
					clearInterval(posetSet);
				}
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
	$("#single_insert").click(function() {
		var text = $("#script_text_area").val().replace(/\r\n|\r/g, "\n");
		var lines = text.split('\n');
		text = lines[0];
		if (text.match(/^\[[a-zA-z 0-9\#\.\(\)\+\-]+?\](.*)/) != null) {
			button_disabled_change(true);
			setCommandMment();
			button_disabled_change("ok");
		} else {
			alert("not [COMMAND]COMMENT");
			button_disabled_change(false);
		}
	});
})
*/
