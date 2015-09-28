"use strict";

var stage, loader, w, h;

var rects = [];
(function(){
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            rects.push({
                x: i,
                y: j,
            });
        };
    };
})();

function init(){
    stage = new createjs.Stage("g8iker");

    stage.canvas.width = 1920;
    stage.canvas.height = 1440;

    w = stage.canvas.width;
    h = stage.canvas.height;

    var manifest = [
        {src: "background.jpg", id: "background"},
        {src: "circle.png", id: "circle"}
    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest, true, "images/");
}


function handleComplete (){
    var circle = new createjs.Bitmap(loader.getResult("circle"));
    // var background = new createjs.Bitmap(loader.getResult("background"));

    var background = new createjs.Shape();
    background.graphics.beginBitmapFill(loader.getResult("background")).drawRect(0, 0, w, h);

    stage.addChild(circle);
    stage.addChild(background);

    var start_x = 0;
    var start_y = 0;
    stage.update();
}
