'use strict';
/*global createjs */
/*eslint no-loop-func: false*/
/*eslint-env es6*/

var GAME = {};
var stage, loader, w, h;
var drawed_lines = {};

var block_size = {
    w: 370,
    h: 225
};
// default rects for position
var rects = [];
(function(){
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
})();


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
                if( res.data != null ){
                    rects = JSON.parse(res.data);
                }

                init();
            },
        });
    }

    GAME.update_game_data = function(){
        // console.log(GAME);
        $.ajax({
            url: api_path + GAME.game_id + '?access_key=' + access_key,
            method: "POST",
            dataType: "json",
            data: {data: JSON.stringify(rects)},
            success: function(res){
                // GAME.game_id = res.id
            }
        });
    }
})(GAME);


function check_lines(){
    var lines = [
        // verticle lines
        [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 0, y: 4}],
        [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4}],
        [{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3}, {x: 2, y: 4}],
        [{x: 3, y: 0}, {x: 3, y: 1}, {x: 3, y: 2}, {x: 3, y: 3}, {x: 3, y: 4}],
        [{x: 4, y: 0}, {x: 4, y: 1}, {x: 4, y: 2}, {x: 4, y: 3}, {x: 4, y: 4}],
        // hozitional lines
        [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}],
        [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 4, y: 1}],
        [{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2}],
        [{x: 0, y: 3}, {x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}, {x: 4, y: 3}],
        [{x: 0, y: 4}, {x: 1, y: 4}, {x: 2, y: 4}, {x: 3, y: 4}, {x: 4, y: 4}],
        // cross lines
        [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}, {x: 4, y: 4}],
        [{x: 4, y: 0}, {x: 3, y: 1}, {x: 2, y: 2}, {x: 1, y: 3}, {x: 0, y: 4}]
    ];

    var line_types = [
        'line_v',
        'line_v',
        'line_v',
        'line_v',
        'line_v',
        'line_h',
        'line_h',
        'line_h',
        'line_h',
        'line_h',
        'line_backslash',
        'line_slash',
    ];

    for (var d in drawed_lines) {
        stage.removeChild(drawed_lines[d]);
    }

    for (var i = lines.length - 1; i >= 0; i--) {
        var line = lines[i];
        var uncheck_counter = 0;
        var x, y;
        for(var l in line){
            x = line[l].x;
            y = line[l].y;
            if(!rects[x][y].checked){
                uncheck_counter++;
            }
        }

        if(uncheck_counter === 0){
            var line_type = line_types[i];
            var start = {
                x: lines[i][0].x,
                y: lines[i][0].y,
            }

            // var end = {
            //     x: lines[i][lines[i].length - 1].x,
            //     y: lines[i][lines[i].length - 1].y,
            // }

            var drawing_line = new createjs.Bitmap(loader.getResult(line_type));
            switch(line_type){
                case 'line_v':
                    drawing_line.x = (start.x * block_size.w) + (block_size.w / 2) - 40;
                    // drawing_line.y = (start.y * block_size.h) + (block_size.h / 2);
                    drawing_line.y = 250;
                    break;
                case 'line_h':
                        drawing_line.x = (start.x * block_size.w) + 40;
                        drawing_line.y = (start.y * block_size.h) + (block_size.h / 2) + 180;
                        // drawing_line.y = 250;
                    break;
                case 'line_slash':
                case 'line_backslash':
                        // drawing_line.x = (start.x * block_size.w) + 40;
                        // drawing_line.y = (start.y * block_size.h) + 0;
                        drawing_line.x = 50;
                        drawing_line.y = 270;
                        // drawing_line.y = 250;
                    break;
            }

            drawed_lines[i] = drawing_line;

            stage.addChild(drawing_line);
            stage.update();
        }else{
            // stage.removeChild(drawed_lines[i]);
        }



    }

    // for (var i = rects.length - 1; i >= 0; i--) {
    //     if(typeof rects[i].checked === 'boolean'){
    //         if(!rects[i].checked){
    //             break;
    //         }

    //         for (var l = lines.length - 1; l >= 0; l--) {
    //             lines[l]
    //         };
    //     }
    // };
}

// function download_file(filename, imageData) {
//     var pom = document.createElement('a');
//     pom.href = imageData;
//     pom.download = filename;
//     document.body.appendChild(pom);
//     pom.click();
//     document.body.removeChild(pom);
// };


function handleComplete (){
    // var circle = new createjs.Bitmap(loader.getResult("circle"));
    // var background = new createjs.Bitmap(loader.getResult("background"));
    var background = new createjs.Shape();
    background.graphics.beginBitmapFill(loader.getResult('background')).drawRect(0, 0, w, h);
    stage.addChild(background);

    var download = new createjs.Shape();
    download.addEventListener('click', function(){
        // var file_name = 'G8好車友_' + new Date().getTime() + '.png';
        // download_file(file_name, stage.toDataURL('image/png'));
        // var url = 'https://www.facebook.com/sharer/sharer.php?&u=' + encodeURIComponent(window.location.href);
        window.open('http://www.facebook.com/share.php?u='.concat(encodeURIComponent(window.location.href)));
        // window.open(url);
    });

    download.graphics.beginFill('#FFFFFF').drawRect(
        1672, 96, 216, 150
    );

    download.alpha = 0.1;

    stage.addChild(download);

    // var blocks = [];

    for (var x = 0; x < rects.length; x++) {
        for (var y = 0; y < rects[x].length; y++) {
            (function(x, y){ //eslint no-loop-func: 2
                var block = new createjs.Shape();

                // var x = 36 + (rects[i].x * block_size.w);
                // var y = 245 + (rects[i].y * block_size.h);

                var x_axis = 36 + (x * block_size.w);
                var y_axis = 245 + (y * block_size.h);

                // var is_clicked = false;

                var circle_image = loader.getResult('circle');
                // var circle = new createjs.Shape();
                var circle = new createjs.Bitmap(circle_image);

                // setup circle position
                circle.x = x_axis + 65;
                circle.y = y_axis + 20;

                if(rects[x][y].checked){
                    stage.addChild(circle);
                }

                block.addEventListener('click', function(){
                    console.log('x/y', x, y);

                    if(rects[x][y].checked){
                        stage.removeChild(circle);
                    }else{
                        stage.addChild(circle);
                    }

                    stage.update();
                    // is_clicked = !is_clicked;

                    rects[x][y].checked = !rects[x][y].checked;
                    GAME.update_game_data();
                    check_lines();
                });

                block.graphics.beginFill('#FFFFFF').drawRect(
                    x_axis, y_axis, block_size.w, block_size.h
                );

                block.alpha = 0.1;

                stage.addChild(block);

            })(x, y);
        }
    }

    // var block = new createjs.Shape();

    // block.graphics.beginFill("DeepSkyBlue").drawRect(36, 245, 370, 225);
    // stage.addChild(block);

    stage.update();

    // init drawed lines
    check_lines();
}

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
    loader.addEventListener('complete', handleComplete);
    loader.loadManifest(manifest, true, 'images/');
}
