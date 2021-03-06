/* ------------------------------------------------------------------------------
    HIDE AND SHOW ASIDE
------------------------------------------------------------------------------ */

function hide_aside(){
    $(".aside").addClass("hidden");
    $(".article").addClass("large");
}

function show_aside(){
    $(".aside").removeClass("hidden");
    $(".article").removeClass("large");
}

function toggle_aside(){
    $(".aside").toggleClass("hidden");
    $(".article").toggleClass("large");
}

function overlay_aside(){
    $(".aside").toggleClass("hidden");
    $(".article").toggleClass("large", true);
}

$("#handle").on("click", function () {
    if($(window).width() <= 860){
        overlay_aside()
    }else{
        toggle_aside()
    }
});

/* ------------------------------------------------------------------------------
    INTERACTIVE MARKS
------------------------------------------------------------------------------ */

$(".interactive_mark").each(function (i, item) {
    click_blur(item, function () {
        $(item).addClass("force_hover");
    }, function () {
        $(item).removeClass("force_hover");
    }, "click mouseover", "mouseout")
});

function check_mark_offset() {
    $(".interactive_mark").each(function (i, item) {
        item = $(item);
        var content = item.find(".interactive_content").first();
        var paragraph = item.closest(".paragraph");

        if(! content[0]) return;

        var max_w = paragraph[0].offsetWidth;
        var tot_offset = item[0].offsetLeft + content[0].offsetWidth;


        if(tot_offset && tot_offset>max_w){
            content.addClass("left");
        }else{
            content.removeClass("left");
        }
    });
}


/* ------------------------------------------------------------------------------ */


do_once("i_1",function () {
    $("#i_1").removeClass("hide");
});
const urlParams = new URLSearchParams(window.location.search);
if(urlParams.get('fi')){
    // User is coming from inside the website
    $("#i_0").addClass("hide");
}

/* ------------------------------------------------------------------------------
    ASYNC IMAGE LOADING
------------------------------------------------------------------------------ */

function l_split(string, splitter) {
    // Split string and return last element
    string = string.split(splitter);
    return string[string.length-1];
}

function eval_scale(src){
    src = l_split(src, "/");
    var ext = l_split(src, "x.");
    src = src.replace("x."+ext, "");
    src = l_split(src,"-").replace(",",".");
    return parseFloat(src)
}

$(function () {
    $(".set_as_parent_bg").on("load", function() {
        var img = $(this);
        var src = img.attr("src").toString();
        var target = img.parent();
        var prev_src = $(target).css("background-image").split("url(")[1].split(")")[0];
        prev_src = prev_src.substring(1, prev_src.length-1);
        if(eval_scale(src) > eval_scale(prev_src)){
            $(target).css("background-image", "url(" + src + ")");
        }
    }).each(function() {
        if(this.complete) $(this).trigger("load");
    });
});


/* ------------------------------------------------------------------------------
    INFO BOXES
------------------------------------------------------------------------------ */

var paragraph_min_w = 305;

function check_paragraph_w() {
    $(".info").each(function (i, item) {
        item = $(item);

        var paragraph = item.find(".paragraph");

        var par_w = paragraph[0].offsetWidth;

        if(par_w < paragraph_min_w){
            item.addClass("break");
        }
    });
}


/* ------------------------------------------------------------------------------ */


$(window).resize(function(){
    if($(window).width() <= 860){
        hide_aside()
    }else{
        show_aside()
    }
    check_mark_offset();
    check_paragraph_w();
});

$(window).trigger("resize");


