function fitImage() {

  $(".fit-image").each(function(){
      var $image = $(this),
      theWindow = $image.parent(),
      aspectRatio = $image.width() / $image.height();


    if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
        $image
          .removeClass('bgheight')
          .addClass('bgwidth');
    } else {
        $image
          .removeClass('bgwidth')
          .addClass('bgheight');
    }
  });
}

module.exports = fitImage;
