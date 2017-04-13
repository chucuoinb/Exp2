var positionSlideTemp = 2;
var positionSlide =2;
var speedDefault = 300;
var speed = speedDefault;
var positionTimeout;
var autoSlideInterval;
var speedAutoChangeSlide = 5000;
var srcItem = "../images/item";
var numberOfItem = 8;
var maxItemDisplay = 4;
var widthContainer = 1000;
var widthItem ;
var paddingItem;
var timeOutMove;
var click= false;
var clickPre = false;
var positionMenu = 0;
var positionItemMin = numberOfItem-1;
var positionItemMax = maxItemDisplay+1;
var clickItem = new Array();
var isHover = false;
var isOpenMenu = false;
$(document).ready(function () {
    // auto change slide
    changeLeft();
    widthItem = parseInt($("#item1").css("width"));
    paddingItem = ((widthContainer) - widthItem * maxItemDisplay) / (maxItemDisplay - 1);
    $("#img" +(maxItemDisplay+1)).attr("src",srcItem+(maxItemDisplay+1)+".jpg");
    $("#img0").attr("src",srcItem+positionItemMin+".jpg");
    startAutoChangeSlide();
    $(window).resize(function () {
        changeLeft();
    })
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
    //    if (positionSlideTemp ==4)
    //        positionSlideTemp=0;
    //    else positionSlideTemp++;
    //    changeSlide(positionSlideTemp);
    // });
    //
    // //click pre banner
    // $("#pre_banner").click(function () {
    //     if (positionSlideTemp ==0)
    //         positionSlideTemp=4;
    //     else positionSlideTemp--;
    //     changeSlide(positionSlideTemp);
    // });

    //next item
    $("#bt_next").click(function () {

        // if (window.screen.width <=480 )
        //     paddingItem = 0;
        // else if (window.screen.width >1000)
        //     paddingItem = ((widthContainer) - widthItem * maxItemDisplay) / (maxItemDisplay - 1);
        if (click == false) {
            click = true;
            clearTimeout(timeOutMove);
            timeOutMove = setTimeout(function () {
                click = false;
            }, speed);
            nextItem();
        }
        // clickItem.push(0);
        // if(clickItem.length == 1){
        //     solveItem();
        // }
    });
    $("#bt_pre").dblclick(function () {

        if (speed >50)
            speed -=50;
        if (click == false) {
            click = true;
            clearTimeout(timeOutMove);
            timeOutMove = setTimeout(function () {
                click = false;
            }, speed);
            preItem();

        }
        //     clickItem.push(1);
        // if(clickItem.length == 1){
        //     solveItem();
        // }
    });
    $("#bt_pre").click(function () {
        // if (window.screen.width <=480 )
        //     paddingItem = 0;
        speed = speedDefault;
        if (click == false) {
            click = true;
            clearTimeout(timeOutMove);
            timeOutMove = setTimeout(function () {
                click = false;
            }, speed);
            preItem();

        }
        //     clickItem.push(1);
        // if(clickItem.length == 1){
        //     solveItem();
        // }
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
    });
    $("#menu_tablet").hover(function () {
           $("#menu_phone").css("display","block");
           isOpenMenu = true;
    },function () {

        $("#menu_phone").hover(function () {
            isHover =true;
        },function () {

            $("#menu_phone").css("display","none");
            isOpenMenu = false;
        });
        if (isHover == false){
                $("#menu_phone").css("display","none");
                isOpenMenu = false;
        }
        isHover = false;
    });
    $("#menu_tablet").click(function () {
        if (isOpenMenu == false){
            $("#menu_phone").css("display","block");
            isOpenMenu = true;
        }else {
            $("#menu_phone").css("display","none");
            isOpenMenu = false;
        }
    })
    $("#bt_menu_phone").click(function () {
        if (isOpenMenu == false){
            $("#menu_phone").css("display","block");
            isOpenMenu = true;
        }else {
            $("#menu_phone").css("display","none");
            isOpenMenu = false;
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
    if (position != positionSlideTemp) {

        var listPosition = $(".position");
        listPosition.css("background-color", "#71a3a7");
        $(listPosition[position]).css("background-color", "white");
        var image = $("#img_slide");
        image.fadeOut('fast', function () {
            image.attr("src", "../images/slide" + position + ".jpg");
            image.fadeIn('fast');
        });
        positionSlideTemp = position;
        positionSlide = position;
    }
    // $("#slide").attr("src", "../images/slide" + position + ".jpg");
}
function nextItem() {
    if (positionItemMin == 0)
        positionItemMin = numberOfItem - 1;

    else positionItemMin--;
    var listItem = $(".item");
    listItem.each(function (index, object) {
        var item = $(object);
        item.animate({left: "+=" + getLeftItem(1)}, speed, function () {
            if (parseInt(item.css("left")) > getLeftItem(4)) {
                item.css("left", getLeftItem(-1));
                $("#img" + index).attr("src", srcItem + positionItemMin + ".jpg");
            }
        })
    });
}
// function solveItem() {
//     while (clickItem.length!=0){
//         if (clickItem.shift() == 1){
//             preItem();
//         }
//         else
//             nextItem();
//     }
// }
function preItem() {

    if (positionItemMax == numberOfItem -1)
        positionItemMax = 0;
    else
        positionItemMax++;
    var listItem = $(".item");
    listItem.each(function (index, object) {
        var item = $(object);
        item.animate({left: "-=" + getLeftItem(1)}, speed, function () {
            if (parseInt(item.css("left")) < getLeftItem(-1)) {

                item.css("left", getLeftItem(4));
                $("#img" + index).attr("src", srcItem + (positionItemMax) + ".jpg");
            }
        })
    });
}

function getLeftItem(position) {
    return position * (widthItem + paddingItem);
}
function setSrcItem(position) {
    var list = $(".item");
    if (position == 0) {
        $(".img_item").eq(0).attr("src", srcItem + (numberOfItem - 1) + ".jpg");
        $(".img_item").eq(maxItemDisplay).attr("src", srcItem + (position + 4) + ".jpg");
    } else if (position == numberOfItem - 4) {
        $(".img_item").eq(0).attr("src", srcItem + (position - 1) + ".jpg");
        $(".img_item").eq(maxItemDisplay).attr("src", srcItem + "0.jpg");
    } else {
        $(".img_item").eq(0).attr("src", srcItem + (position - 1) + ".jpg");
        $(".img_item").eq(maxItemDisplay).attr("src", srcItem + (position + 4) + ".jpg");
    }

}
function changeLeft() {
    widthItem = parseInt($("#item1").css("width"));
    var width_container = parseInt($(".container").css("width"));
    if (width_container >=1000){
        paddingItem = ((widthContainer) - widthItem * maxItemDisplay) / (maxItemDisplay - 1);
        $("#item0").css("left","-260px");
        $("#item1").css("left","0px");
        $("#item2").css("left","260px");
        $("#item3").css("left","520px");
        $("#item4").css("left","780px");
        $("#item5").css("left","1040px");
    }else if(width_container<480){
        $("#item0").css("left",-width_container);
        $("#item1").css("left",0);
        $("#item2").css("left",width_container);
        $("#item3").css("left",width_container*2);
        $("#item4").css("left",width_container*3);
        $("#item5").css("left",width_container*4);
        paddingItem = 0;
    }
    else if (width_container>480 && width_container<1000){
        widthItem = parseInt($("#item1").css("width"));
        paddingItem = ((width_container) - widthItem * 2) / (2 - 1);
        $("#item0").css("left",-widthItem-paddingItem);
        $("#item1").css("left","0px");
        $("#item2").css("left",widthItem+paddingItem);
        $("#item3").css("left",2*(widthItem+paddingItem));
        $("#item4").css("left",3*(widthItem+paddingItem));
        $("#item5").css("left",4*(widthItem+paddingItem));
    }
}