"use strict";
function init(){
    var stage = new createjs.Stage("g8iker");
    var stage_width = $(window).width();
    stage.canvas.width = stage_width;

    var background;
    var circle;

    var on_ready = function(){
        stage.addChild(circle);
        stage.addChild(background);
        stage.update();
    }

    var resize_stage = function(){

    }

    $(window).on('resize', function(){
        resize_stage();
    });

    var load_images = function(){
        var ready_counter = 0;

        var background_image = new Image();
        background_image.src = 'images/background.jpg';

        background_image.addEventListener('load', function(){
            background = new createjs.Bitmap(background_image);
            var resize_ratio = stage_width / background.image.width;
            // var window_height = $(window).height();
            // var window_width = stage_width;

            // var resize_ratio = window_height / background.image.height;
            // debugger;

            background.scaleX = resize_ratio;
            background.scaleY = resize_ratio;

            resize_stage();

            stage.canvas.height = background.image.height * resize_ratio;
            ready_counter++;
        });

        var circle_image = new Image();
        circle_image.src = 'images/circle.png';

        circle_image.addEventListener('load', function(){
            circle = new createjs.Bitmap(circle_image);
            ready_counter++;
        });

        var interval = setInterval(function(){
            if(ready_counter === 2){
                on_ready();
                clearInterval(interval);
            }
        }, 100);

    }();
}
