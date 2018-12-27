$(function() {
	//添加时间委托
	//监听歌曲的移入移出事件
	$(".content_list").delegate(".list_music", "mouseenter", function() {
		//显示子菜单
		$(this).find(".list_menu").stop().fadeIn(100);
		$(this).find(".list_time a").stop().fadeIn(100);
		//隐藏时长
		$(this).find(".list_time span").stop().fadeOut(100);
	})
	$(".content_list").delegate(".list_music", "mouseleave", function() {
		//隐藏子菜单
		$(this).find(".list_menu").stop().fadeOut(100);
		$(this).find(".list_time a").stop().fadeOut(100);
		//显示时长
		$(this).find(".list_time span").stop().fadeIn(100);
	})
	//监听复选框事件
	$(".content_list").delegate(".list_check", "click", function() {
		$(this).toggleClass("list_checked");
	})
	var musicPlay = $(".music_play");
	//添加子菜单播放按钮的监听
	$(".content_list").delegate(".list_menu_play", "click", function() {
		//切换播放图标
		$(this).toggleClass("list_menu_play2");
		//复原其他播放图标
		$(this).parents(".list_music").siblings().find(".list_menu_play").removeClass("list_menu_play2");
		//同步下方播放键
		if($(this).attr("class").indexOf("list_menu_play2") != -1) {
			//当前子菜单播放按钮是播放的状态
			musicPlay.addClass("music_play2");
			//让文字高亮
			$(this).parents(".list_music").find("div").css("color", "#fff");
			$(this).parents(".list_music").siblings().find("div").css("color", "rgba(255,255,255,.5)");
		} else {
			//当前子菜单播放按钮不是播放状态
			musicPlay.removeClass("music_play2");
			//让文字不高亮
			$(this).parents(".list_music").find("div").css("color", "rgba(255,255,255,.5)");
		}
		//切换序号的状态
		$(this).parents(".list_music").find(".list_number").toggleClass("list_number2");
		//排他
		$(this).parents(".list_music").siblings().find(".list_number").removeClass("list_number2")
	})
	$(".content_list").mCustomScrollbar();
	
	//加载歌曲
	getPlayerList();
	function getPlayerList() {
		$.ajax({
			url: "song/music.json",
			dataType: "json",
			success: function (data) {
				//遍历获取到的数据，创建每一条音乐
				var musicList = $(".content_list ul")
				$.each(data, function(index, ele) {
					var item = createMusicItem(index, ele);
					musicList.append(item);
				})
			},
			error: function (e) {
				console.log(e);
			}
		});
	}
	
	//定义一个方法，创建一条音乐
	function createMusicItem(index, music) {
		var item = $("<li class='list_music'><div class='list_check'><i></i></div><div class='list_number'>" + (index + 1) + "</div><div class='list_name'>" + music.name + "<div class='list_menu'><a href='javascript:;' title='播放' class='list_menu_play'></a><a href='javascript:;' title='添加'></a><a href='javascript:;' title='下载'></a><a href='javascript:;'' title='分享'></a></div></div><div class='list_singer'>" + music.singer + "</div><div class='list_time'><span>" + music.time + "</span><a href='javascript:;' title='删除'></a></div></li>")
		return item;
	}
})