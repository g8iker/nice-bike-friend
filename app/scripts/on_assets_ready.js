'use strict';
(function(GAME){
    var CIRCLES = [
        ['參加大會師', '會上網分享自己的心得給大家', '時常拍自己的車並上傳到臉書', '會提昇人身部品的等級', '會開始注意並學習各種騎乘技巧'],
        ['車行師父修愛車的時候會尊在旁邊學習', '參加過小型的車友聚會', '透過朋友找推薦的車行', '會找車友一起出遊', '常常上論壇去看車友分享的技術文章'],
        ['會揪車友一起喝咖啡', '會替自己的車取匿稱', '曾參加地緣車種相關的臉書社團', '會跟車友討論改裝品', '自己騎車覺得還好，被人載就覺得很恐怖'],
        ['路上會仔細注意同車種', '上論壇找推薦的車行', '會定時洗愛車', '車上有低調卻很實用的改裝品', '會特地去知名的山路騎車'],
        ['希望找到可以一起騎車的另一半', '會找車友揪團一起洗車', '想自己DIY修車', '會注意並討論車友的改裝', '會上臉書追教社團注意是否有被追焦']
    ];

    GAME.handleComplete = function(){

        // remove loading icon
        $('.sk-fading-circle').remove();
        // var circle = new createjs.Bitmap(loader.getResult("circle"));
        // var background = new createjs.Bitmap(loader.getResult("background"));
        var background = new createjs.Shape();
        background.graphics.beginBitmapFill(loader.getResult('background')).drawRect(0, 0, w, h);
        stage.addChild(background);

        stage.update();

        if(is_new_game){
            player_name = prompt('請輸入您的名字', '');
            if( typeof player_name !== 'string' || player_name.length <= 0){
                player_name = '哥哥你好英俊';
            }
        }

        console.log('player_name', player_name);

        GAME.create_fb_button();
        GAME.create_share_button();
        GAME.create_restart_button();
        GAME.create_player_name_text();

        // var blocks = [];

        for (var x = 0; x < rects.length; x++) {
            for (var y = 0; y < rects[x].length; y++) {
                (function(_x, _y){ //eslint no-loop-func: 2
                    var block = new createjs.Shape();

                    // var x = 36 + (rects[i].x * block_size.w);
                    // var y = 245 + (rects[i].y * block_size.h);

                    var x_axis = 36 + (_x * block_size.w);
                    var y_axis = 245 + (_y * block_size.h);

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
                        if(!is_new_game){
                            return;
                        }
                        console.log('x/y', _x, _y);

                        if(rects[_x][_y].checked){
                            stage.removeChild(circle);
                        }else{
                            stage.addChild(circle);
                        }

                        stage.update();
                        // is_clicked = !is_clicked;

                        rects[_x][_y].checked = !rects[_x][_y].checked;
                        GAME.update_game_data();
                        GAME.check_lines();
                        // ga('send', 'event', 'clicks', 'click circle', '點圈圈');
                        // ga('send', 'event', 'clicks', '點圈圈', CIRCLES[_x][_y]);
                        ga('send', 'event', 'clicks', CIRCLES[_x][_y], '點圈圈');
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
    };
})(GAME);
