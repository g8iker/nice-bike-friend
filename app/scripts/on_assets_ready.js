(function(GAME){
    GAME.handleComplete = function(){
        // remove loading icon
        $('.sk-fading-circle').remove();
        // var circle = new createjs.Bitmap(loader.getResult("circle"));
        // var background = new createjs.Bitmap(loader.getResult("background"));
        var background = new createjs.Shape();
        background.graphics.beginBitmapFill(loader.getResult('background')).drawRect(0, 0, w, h);
        stage.addChild(background);

        GAME.create_fb_button();
        GAME.create_share_button();
        GAME.create_restart_button();
        GAME.create_player_name_text();

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
                        if(is_old_game){
                            return;
                        }
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
                        GAME.check_lines();
                        ga('send', 'event', 'clicks', 'click circle', '點圈圈');
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
        GAME.check_lines();
    }
})(GAME);