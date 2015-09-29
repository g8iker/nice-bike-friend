'use strict';
/*global createjs */
/*eslint no-loop-func: false*/
/*eslint-env es6*/

var stage, loader, w, h;
var drawed_lines = {};
var player_name;
var block_size = {
    w: 370,
    h: 225
};
// default rects for position
var rects = [];
(function(G){

    G.init_rects = function(){
        for (var x = 0; x < 5; x++) {
            rects[x] = [];
            for (var y = 0; y < 5; y++) {
                rects[x].push({
                    // x: x,
                    // y: y,
                    checked: false
                });
            }
        }
    }

    G.init_rects();

})(GAME || {});

var is_old_game = false;

// getting game data
(function(GAME){
    var api_path = 'http://events.g8iker.com/LayNxpNWR3/';
    var access_key = '2fd6c80d16278b094d4169afedc9aa7ad45b890e353cac2db323b553a2e8c1820e404da5fb24e050cfdb87fc61d61673683413dff735e5fbec4f2fedd37ac018';

    GAME.game_id = window.location.hash.substr(1);
    // console.log(GAME.game_id);

    var is_new_game = false;
    if( GAME.game_id.length === 0){
        is_new_game = true;
    }

    if(is_new_game){
        player_name = prompt('請輸入您的名字', '');
        console.log(player_name);
        $.ajax({
            url: api_path + '?access_key=' + access_key,
            success: function(res){
                GAME.game_id = res.id
                window.location.href = window.location.href + '#' + GAME.game_id;
                init();
            }
        });
    }else{
        $.ajax({
            url: api_path + GAME.game_id + '?access_key=' + access_key,
            success: function(res){
                GAME.game_id = res.id
                // debugger;
                var data = res.data;
                if( data != null ){
                    data = data.split('||||');
                    rects = JSON.parse(data[1]);
                    player_name = data[0];
                }

                is_old_game = true;

                init();

                $('body').on('click', function(){
                    if(confirm('要重新開始遊戲嗎?') ){
                        window.location.href = window.location.origin;
                    }
                });
            },
            error: function(){
                window.location.href = window.location.origin;
            }
        });
    }

    GAME.update_game_data = function(){
        // console.log(GAME);
        var data = player_name + "||||" + JSON.stringify(rects);
        $.ajax({
            url: api_path + GAME.game_id + '?access_key=' + access_key,
            method: "POST",
            dataType: "json",
            data: {data: data},
            success: function(res){
                // GAME.game_id = res.id
            }
        });
    }
})(GAME);

// function download_file(filename, imageData) {
//     var pom = document.createElement('a');
//     pom.href = imageData;
//     pom.download = filename;
//     document.body.appendChild(pom);
//     pom.click();
//     document.body.removeChild(pom);
// };


function init(){
    stage = new createjs.Stage('g8iker');

    stage.canvas.width = 1920;
    stage.canvas.height = 1440;

    w = stage.canvas.width;
    h = stage.canvas.height;

    var manifest = [
        {src: 'background.jpg', id: 'background'},
        {src: 'circle.png', id: 'circle'},
        {src: 'line_v.png', id: 'line_v'},
        {src: 'line_h.png', id: 'line_h'},
        {src: 'line_backslash.png', id: 'line_backslash'},
        {src: 'line_slash.png', id: 'line_slash'}
    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener('complete', GAME.handleComplete);
    loader.loadManifest(manifest, true, 'images/');
}
