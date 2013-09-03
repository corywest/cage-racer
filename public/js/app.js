start = null;

// $("#form").submit();

function checkForWin(avatar) {

  if (avatar.outerWidth(true) >= 1295) {
    end = new Date();
    console.log((end-start));
    $('#time').html((end-start) / 1000);
    var time = ((end-start) / 1000).toString();
    console.log(time);

    $.post('/save_time',{duration: time});
    $('#winner').slideDown( 1000 ).delay( 5000 ).slideUp( 1000 );
    $(document).unBind('#cage1', 'cage2');
    // $(document).unBind('#cage2');
    
  }
  else if (start === null) {
    start = new Date();
    console.log(start);
  }
  else {
    console.log(avatar.outerWidth(true));
  }
}

$(document).ready(function() {


    $('#winner').hide();

    $(document).keyup(function(key) {
      switch(parseInt(key.which,10)) {
      case 16:
        $('#cage1 img').animate({marginLeft: "+=20px"}, 10, function() {
          checkForWin($('#cage1 img'));
        });
    }
    });

    $(document).keyup(function(key) {
      switch(parseInt(key.which,10)) {
      case 13:
        $('#cage2 img').animate({marginLeft: '+=20px'}, 10, function(){
          checkForWin($('#cage2 img'));
        });
    }

    });
      
});
