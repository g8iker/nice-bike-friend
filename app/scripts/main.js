'use strict';
/*global createjs */
/*eslint no-loop-func: false*/
/*eslint-env es6*/
var stage, loader, w, h;

var rects = [];
(function(){
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            rects.push({
                x: i,
                y: j
            });
        }
    }
})();


var download_file = function(filename, imageData) {
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

    for (var i = rects.length - 1; i >= 0; i--) {
        // (function(){ eslint no-loop-func: 2
            var block = new createjs.Shape();

            var x = 36 + (rects[i].x * block_size.w);
            var y = 245 + (rects[i].y * block_size.h);

            var is_clicked = false;

            var circle_image = loader.getResult('circle');
            // var circle = new createjs.Shape();
            var circle = new createjs.Bitmap(circle_image);

            block.position = {
                x: x,
                y: y
            };

            block.addEventListener('click', function(e){
                // console.log('x/y', x, y);

                if(is_clicked){
                    stage.removeChild(circle);
                }else{
                    circle.x = e.target.position.x + 65;
                    circle.y = e.target.position.y + 20;
                    stage.addChild(circle);
                }

                stage.update();
                is_clicked = !is_clicked;
            });

            block.graphics.beginFill('#FFFFFF').drawRect(
                x, y, block_size.w, block_size.h
            );

            block.alpha = 0.1;

            stage.addChild(block);

        // })();
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
