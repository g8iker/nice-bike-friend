'use strict';
/*global createjs */
/*eslint no-loop-func: false*/
/*eslint-env es6*/
var stage, loader, w, h;

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

(function(){
    var api_path = 'http://g8iker-events.dev/LayNxpNWR3/';
    $.ajax({

    });
})();

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

    for (var i = lines.length - 1; i >= 0; i--) {
        var line = lines[i];
        for(var l in line){
            var x = line[l].x;
            var y = line[l].y;
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

function download_file(filename, imageData) {
    var pom = document.createElement('a');
    pom.href = imageData;
    pom.download = filename;
    document.body.appendChild(pom);
    pom.click();
    document.body.removeChild(pom);
};


function handleComplete (){
    // var circle = new createjs.Bitmap(loader.getResult("circle"));
    // var background = new createjs.Bitmap(loader.getResult("background"));

    var background = new createjs.Shape();
    background.graphics.beginBitmapFill(loader.getResult('background')).drawRect(0, 0, w, h);
    stage.addChild(background);

    var download = new createjs.Shape();
    download.addEventListener('click', function(){
        var file_name = 'G8好車友_' + new Date().getTime() + '.png';
        download_file(file_name, stage.toDataURL('image/png'));
    });

    download.graphics.beginFill('#FFFFFF').drawRect(
        1672, 96, 216, 150
    );

    download.alpha = 0.1;

    stage.addChild(download);

    // var blocks = [];
    var block_size = {
        w: 370,
        h: 225
    };

    for (var x = 0; x < rects.length; x++) {
        for (var y = 0; y < rects[x].length; y++) {
            (function(x, y){ //eslint no-loop-func: 2
                var block = new createjs.Shape();

                // var x = 36 + (rects[i].x * block_size.w);
                // var y = 245 + (rects[i].y * block_size.h);

                var x_axis = 36 + (x * block_size.w);
                var y_axis = 245 + (y * block_size.h);

                var is_clicked = false;

                var circle_image = loader.getResult('circle');
                // var circle = new createjs.Shape();
                var circle = new createjs.Bitmap(circle_image);

                // block.position = {
                //     x: x,
                //     y: y
                // };

                block.addEventListener('click', function(){
                    console.log('x/y', x, y);

                    if(is_clicked){
                        stage.removeChild(circle);
                    }else{
                        circle.x = x_axis + 65;
                        circle.y = y_axis + 20;
                        stage.addChild(circle);
                    }

                    stage.update();
                    is_clicked = !is_clicked;

                    // rects[x][y].checked = is_clicked;

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
}

function init(){
    stage = new createjs.Stage('g8iker');

    stage.canvas.width = 1920;
    stage.canvas.height = 1440;

    w = stage.canvas.width;
    h = stage.canvas.height;

    var manifest = [
        {src: 'background.jpg', id: 'background'},
        {src: 'circle.png', id: 'circle'}
    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener('complete', handleComplete);
    loader.loadManifest(manifest, true, 'images/');
}

init();
