"use strict";var GAME={};!function(e){e.check_billy=function(e){var a=0;for(var i in drawed_lines)a++;a===e&&(ga("send","event","billy","show billy","看哲學"),$("body").append('<iframe id="video-wrapper" width="560" height="315" src="https://www.youtube.com/embed/_cyuktfkHEY?&autoplay=true" frameborder="0" allowfullscreen></iframe>'),$("body").append('<div id="overlay"></div>'),$("#overlay").on("click",function(){$("#overlay").remove(),$("#video-wrapper").remove()}))},e.create_share_button=function(){var e=new createjs.Shape;e.addEventListener("click",function(){ga("send","event","clicks","FB share","FB分享"),window.open("http://www.facebook.com/share.php?u=".concat(encodeURIComponent(window.location.href)))}),e.graphics.beginFill("#FFFFFF").drawRect(1660,120,220,110),e.alpha=.1,stage.addChild(e)},e.create_restart_button=function(){var e=new createjs.Shape;e.addEventListener("click",function(){console.log("restart"),ga("send","event","clicks","click restart","重新開始遊戲"),window.location.href=window.location.origin}),e.graphics.beginFill("#FFFFFF").drawRect(1660,20,220,110),e.alpha=.1,stage.addChild(e)},e.create_fb_button=function(){var e=new createjs.Shape;e.addEventListener("click",function(){ga("send","event","clicks","link to FB","連到FB"),window.open("https://www.facebook.com/G8ikercom?fref=ts")}),e.graphics.beginFill("#FFFFFF").drawRect(1050,20,575,210),e.alpha=.1,stage.addChild(e)},e.create_player_name_text=function(){var e=new createjs.Text(""+player_name+" 的","bold 44px Arial","#000000");e.x=42,e.y=-5,stage.addChild(e)}}(GAME),function(e){var a=[[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:0,y:3},{x:0,y:4}],[{x:1,y:0},{x:1,y:1},{x:1,y:2},{x:1,y:3},{x:1,y:4}],[{x:2,y:0},{x:2,y:1},{x:2,y:2},{x:2,y:3},{x:2,y:4}],[{x:3,y:0},{x:3,y:1},{x:3,y:2},{x:3,y:3},{x:3,y:4}],[{x:4,y:0},{x:4,y:1},{x:4,y:2},{x:4,y:3},{x:4,y:4}],[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:4,y:0}],[{x:0,y:1},{x:1,y:1},{x:2,y:1},{x:3,y:1},{x:4,y:1}],[{x:0,y:2},{x:1,y:2},{x:2,y:2},{x:3,y:2},{x:4,y:2}],[{x:0,y:3},{x:1,y:3},{x:2,y:3},{x:3,y:3},{x:4,y:3}],[{x:0,y:4},{x:1,y:4},{x:2,y:4},{x:3,y:4},{x:4,y:4}],[{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:3,y:3},{x:4,y:4}],[{x:4,y:0},{x:3,y:1},{x:2,y:2},{x:1,y:3},{x:0,y:4}]],i=["line_v","line_v","line_v","line_v","line_v","line_h","line_h","line_h","line_h","line_h","line_backslash","line_slash"];e.check_lines=function(){!function(){for(var e in drawed_lines){var a=drawed_lines[e];stage.removeChild(a)}stage.update(),drawed_lines={}}();for(var n=a.length-1;n>=0;n--){var c,t,r=a[n],l=0;for(var s in r)c=r[s].x,t=r[s].y,rects[c][t].checked||l++;if(0===l){var o=i[n],d={x:a[n][0].x,y:a[n][0].y},y=new createjs.Bitmap(loader.getResult(o));switch(o){case"line_v":y.x=d.x*block_size.w+block_size.w/2-40,y.y=250;break;case"line_h":y.x=d.x*block_size.w+40,y.y=d.y*block_size.h+block_size.h/2+180;break;case"line_slash":case"line_backslash":y.x=50,y.y=270}drawed_lines[n]=y,stage.addChild(y),stage.update()}}e.check_billy(i.length)}}(GAME),function(e){e.handleComplete=function(){$(".sk-fading-circle").remove();var a=new createjs.Shape;a.graphics.beginBitmapFill(loader.getResult("background")).drawRect(0,0,w,h),stage.addChild(a),stage.update(),player_name=prompt("請輸入您的名字",""),"string"!=typeof player_name&&(player_name="哥哥你好英俊"),console.log(player_name),e.create_fb_button(),e.create_share_button(),e.create_restart_button(),e.create_player_name_text();for(var i=0;i<rects.length;i++)for(var n=0;n<rects[i].length;n++)!function(a,c){var t=new createjs.Shape,r=36+a*block_size.w,l=245+c*block_size.h,s=loader.getResult("circle"),o=new createjs.Bitmap(s);o.x=r+65,o.y=l+20,rects[i][n].checked&&stage.addChild(o),t.addEventListener("click",function(){is_old_game||(console.log("x/y",a,c),rects[i][n].checked?stage.removeChild(o):stage.addChild(o),stage.update(),rects[i][n].checked=!rects[i][n].checked,e.update_game_data(),e.check_lines(),ga("send","event","clicks","click circle","點圈圈"))}),t.graphics.beginFill("#FFFFFF").drawRect(r,l,block_size.w,block_size.h),t.alpha=.1,stage.addChild(t)}(i,n);stage.update(),e.check_lines()}}(GAME);var stage,loader,w=1920,h=1440,drawed_lines={},is_old_game=!1,block_size={w:370,h:225},player_name,rects=[];!function(e){e.init_rects=function(){for(var e=0;5>e;e++){rects[e]=[];for(var a=0;5>a;a++)rects[e].push({checked:!1})}},e.init_rects(),e.init=function(){stage=new createjs.Stage("g8iker"),stage.canvas.width=w,stage.canvas.height=h;var e=[{src:"background.jpg",id:"background"},{src:"circle.png",id:"circle"},{src:"line_v.png",id:"line_v"},{src:"line_h.png",id:"line_h"},{src:"line_backslash.png",id:"line_backslash"},{src:"line_slash.png",id:"line_slash"}];loader=new createjs.LoadQueue(!1),loader.addEventListener("complete",GAME.handleComplete),loader.loadManifest(e,!0,"images/")}}(GAME||{}),function(e){var a="http://events.g8iker.com/LayNxpNWR3/",i="2fd6c80d16278b094d4169afedc9aa7ad45b890e353cac2db323b553a2e8c1820e404da5fb24e050cfdb87fc61d61673683413dff735e5fbec4f2fedd37ac018";e.game_id=window.location.hash.substr(1);var n=!1;0===e.game_id.length&&(n=!0),n?$.ajax({url:a+"?access_key="+i,success:function(a){e.game_id=a.id,window.location.href=window.location.href+"#"+e.game_id,e.init()}}):$.ajax({url:a+e.game_id+"?access_key="+i,success:function(a){e.game_id=a.id;var i=a.data;null!=i&&(i=i.split("||||"),rects=JSON.parse(i[1]),player_name=i[0]),is_old_game=!0,e.init(),$("body").on("click",function(){confirm("要重新開始遊戲嗎?")&&(window.location.href=window.location.origin)})},error:function(){window.location.href=window.location.origin}}),e.update_game_data=function(){var n=player_name+"||||"+JSON.stringify(rects);$.ajax({url:a+e.game_id+"?access_key="+i,method:"POST",dataType:"json",data:{data:n},success:function(){}})}}(GAME);