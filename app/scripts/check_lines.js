(function(GAME){
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

    GAME.check_lines = function(){
        // reset all lines
        (function(){
            for (var d in drawed_lines) {
                var l = drawed_lines[d];
                stage.removeChild(l);
                console.log('removed', l);
            }
            stage.update();
            drawed_lines = {};
        })();


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
        // you got me mad now!
        GAME.check_billy(line_types.length);
    }
})(GAME);