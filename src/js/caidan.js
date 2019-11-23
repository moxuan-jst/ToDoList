// 下拉菜单
$(function () {
    let btn = $(".navbar-brand");
    let mask = $(".mask");
    let left = $(".left");
    let leftDisplay = left.css("display");
    let maskDisplay = mask.css("display");

    // 幕布显示与隐藏
    function maskFadeToggle() {
        mask.fadeToggle("fast", function () {
            if (maskDisplay !== "block") {
                maskDisplay = "block";
            } else {
                maskDisplay = "none";
            }
        });
    }

    btn.on('click', function () {
        maskFadeToggle();
        leftShow();

    });

    mask.on('click', function () {
        leftShow();
        maskFadeToggle();
    });

    // 菜单显示与隐藏
    function leftShow() {
        left.slideToggle("slow", function () {
            if (leftDisplay == "block") {
                leftDisplay = "none";
            } else {
                leftDisplay = "block"
            }
        });
    }
});
