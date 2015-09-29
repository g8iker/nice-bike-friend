(function(GAME){
    // debugger;

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    GAME.check_billy = function(line_types_length){
        var _counter = 0;
        for(var d in drawed_lines){
            _counter++;
        }

        if(_counter === line_types_length ){
            // alert('You got me mad now!');
            // var div = $('div').html();
            // var index = parseInt(getRandomArbitrary(0, 21));
            // debugger;
            // $('body').append('<iframe id="video-wrapper" width="560" height="315" src="https://www.youtube.com/embed/UBCqaAv0jYI?list=PLHVtMp_LI1HWw_d_QhFKpYOuYiq_gxP8i&autoplay=true&index=' + index + '" frameborder="0" allowfullscreen></iframe>');
            $('body').append('<iframe id="video-wrapper" width="560" height="315" src="https://www.youtube.com/embed/dyKMijgm_RY?&autoplay=true" frameborder="0" allowfullscreen></iframe>')
            $('body').append('<div id="overlay"></div>');

            $('#overlay').on('click', function(){
                $("#overlay").remove();
                $('#video-wrapper').remove();
            });
        }
        console.log('line_types_length', line_types_length);
        console.log(_counter);
    }
})(GAME);