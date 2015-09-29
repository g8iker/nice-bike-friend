(function(GAME){
    GAME.handleComplete = function(){
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
                        GAME.check_lines();
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