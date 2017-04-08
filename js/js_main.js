var positionSlide = 2;
var positionTimeout;
var autoSlideInterval;
var speedAutoChangeSlide = 5000;
var numberOfItem = 6;
var maxItemDisplay = 4;
var widthItem = 220;
var widthContainer = 1000;
var paddingItem = ((widthContainer) - widthItem * maxItemDisplay) / (maxItemDisplay - 1);
var timeOutMove;
var clickNext = false;
var clickPre = false;
var positionMenu = 0;
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
        if (clickPre == false) {
            clickNext = true;
            clearTimeout(timeOutMove);
            timeOutMove = setTimeout(function () {
                clickNext = false;
            }, 200);
            nextItem();

        }
    });
    $("#bt_pre").click(function () {
        if (clickNext == false) {
            clickPre = true;
            clearTimeout(timeOutMove);
            timeOutMove = setTimeout(function () {
                clickPre = false;
            }, 200);
            preItem();

        }
    });

    $(".logo").hover(function () {
        var index = $(".logo").index(this);
        $(".img").eq(index).css("width", "+=5").css("height", "+=5").css("cursor", "pointer");
    }, function () {
        var index = $(".logo").index(this);
        $(".img").eq(index).css("width", "-=5").css("height", "-=5").css("cursor", "pointer");
    })

    $(".menu_main").click(function () {
        var menu = $(".menu_main");
        var index = menu.index(this);
        if (positionMenu != index) {
            menu.eq(positionMenu).removeClass("active");
            menu.eq(index).addClass("active");
            positionMenu = index;
        }
    })
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
    if (position != positionSlide) {

        var listPosition = $(".position");
        listPosition.css("background-color", "#71a3a7");
        $(listPosition[position]).css("background-color", "white");
        var image = $("#img_slide");
        image.fadeOut('fast', function () {
            image.attr("src", "../images/slide" + position + ".jpg");
            image.fadeIn('fast');
        });
        positionSlide=position;
    }
    // $("#slide").attr("src", "../images/slide" + position + ".jpg");
}
function nextItem() {
    var listItem = $(".item");
    listItem.each(function (index, object) {
        var item = $(object);
        item.animate({left: "+=" + getLeftItem(1)}, 400, function () {
            if (parseInt(item.css("left")) > getLeftItem(4))
                item.css("left", getLeftItem(-1));
        })
    });
}

function preItem() {
    var listItem = $(".item");
    listItem.each(function (index, object) {
        var item = $(object);
        item.animate({left: "-=" + getLeftItem(1)}, 400, function () {
            if (parseInt(item.css("left")) < getLeftItem(-1))
                item.css("left", getLeftItem(4));
        })
    });
}

function getLeftItem(position) {
    return position * (widthItem + paddingItem);
}