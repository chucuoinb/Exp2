var positionSlide = 2;
var positionTimeout;
var autoSlideInterval;
var speedAutoChangeSlide = 5000;
$(document).ready(function () {

    // auto change slide
    startAutoChangeSlide();

    //click change banner
    $(".position").click(function () {
        stopAutoChangeSlide();
        changeSlide($(".position").index(this));
        startAutoChangeSlide();
    })

    //hover slide
    $("#slide").hover(function () {
        stopAutoChangeSlide()
    }, function () {
        startAutoChangeSlide()
    });

    //click next banner
    // $("#next_banner").click(function () {
    //    if (positionSlide ==4)
    //        positionSlide=0;
    //    else positionSlide++;
    //    changeSlide(positionSlide);
    // });
    //
    // //click pre banner
    // $("#pre_banner").click(function () {
    //     if (positionSlide ==0)
    //         positionSlide=4;
    //     else positionSlide--;
    //     changeSlide(positionSlide);
    // });

    //next item
    $("#bt_next").click(function () {

    });
});

function stopAutoChangeSlide() {
    clearInterval(autoSlideInterval);
}
function startAutoChangeSlide() {
    autoSlideInterval = window.setInterval(function () {

        if (positionSlide == 4)
            positionSlide = 0;
        else
            positionSlide++;
        changeSlide(positionSlide);
    }, speedAutoChangeSlide);
}
function changeSlide(position) {
    var listPosition = $(".position");
    listPosition.css("background-color", "#71a3a7");
    $(listPosition[position]).css("background-color", "white");
    var image = $("#img_slide");
    image.fadeOut('fast', function () {
        image.attr("src", "../images/slide" + position + ".jpg");
        image.fadeIn('fast');
    });
    // $("#slide").attr("src", "../images/slide" + position + ".jpg");
}