var GAME = {};
(function(G){
    // debugger;

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    G.check_billy = function(line_types_length){
        var _counter = 0;
        for(var d in drawed_lines){
            _counter++;
        }

        if(_counter === line_types_length ){
            ga('send', 'event', 'billy', 'show billy', '看哲學');
            // alert('You got me mad now!');
            // var div = $('div').html();
            // var index = parseInt(getRandomArbitrary(0, 21));
            // debugger;
            // play all random
            // $('body').append('<iframe id="video-wrapper" width="560" height="315" src="https://www.youtube.com/embed/UBCqaAv0jYI?list=PLHVtMp_LI1HWw_d_QhFKpYOuYiq_gxP8i&autoplay=true&index=' + index + '" frameborder="0" allowfullscreen></iframe>');

            // 你好馬英九
            // $('body').append('<iframe id="video-wrapper" width="560" height="315" src="https://www.youtube.com/embed/dyKMijgm_RY?&autoplay=true" frameborder="0" allowfullscreen></iframe>')

            // boy next door
            $('body').append('<iframe id="video-wrapper" width="560" height="315" src="https://www.youtube.com/embed/_cyuktfkHEY?&autoplay=true" frameborder="0" allowfullscreen></iframe>')

            $('body').append('<div id="overlay"></div>');

            $('#overlay').on('click', function(){
                $("#overlay").remove();
                $('#video-wrapper').remove();
            });
        }
        // console.log('line_types_length', line_types_length);
        // console.log(_counter);
    }

    G.create_share_button = function(){
        var button = new createjs.Shape();
        button.addEventListener('click', function(){
            // var file_name = 'G8好車友_' + new Date().getTime() + '.png';
            // download_file(file_name, stage.toDataURL('image/png'));
            // var url = 'https://www.facebook.com/sharer/sharer.php?&u=' + encodeURIComponent(window.location.href);
            ga('send', 'event', 'clicks', 'FB share', 'FB分享');
            window.open('http://www.facebook.com/share.php?u='.concat(encodeURIComponent(window.location.href)));
            // window.open(url);
        });
        button.graphics.beginFill('#FFFFFF').drawRect(
            1660, 120, 220, 110
        );
        button.alpha = 0.1;

        stage.addChild(button);
    };

    G.create_restart_button = function(){
        var button = new createjs.Shape();
        button.addEventListener('click', function(){
            console.log('restart');
            // // G.init_rects();
            // var a = rects;
            // debugger;
            // location.reload();
            ga('send', 'event', 'clicks', 'click restart', '重新開始遊戲');
            window.location.href = window.location.origin;
        });
        button.graphics.beginFill('#FFFFFF').drawRect(
            1660, 20, 220, 110
        );
        button.alpha = 0.1;

        stage.addChild(button);
    };

    G.create_fb_button = function(){
        var button = new createjs.Shape();
        button.addEventListener('click', function(){
            ga('send', 'event', 'clicks', 'link to FB', '連到FB');
            window.open('https://www.facebook.com/G8ikercom?fref=ts');
        });

        // button.addEventListener('mouseover', function(){
        //     console.log('mouseover');
        //     $('canvas').css('cursor','pointer')
        // });

        // button.addEventListener('mouseleave', function(){
        //     console.log('mouseleave');
        //     $('canvas').css('cursor','auto');
        // });


        button.graphics.beginFill('#FFFFFF').drawRect(
            1050, 20, 575, 210
        );
        button.alpha = 0.1;

        stage.addChild(button);
    };

    G.create_player_name_text = function(){
         var text = new createjs.Text('' + player_name + ' 的', "44px Arial", "#000000");
         text.x = 42;
         text.y = -5;
         // text.textBaseline = "alphabetic";

        stage.addChild(text);
    };

})(GAME);