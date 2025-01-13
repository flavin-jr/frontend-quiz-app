$(document).ready(function () {
    $(".toggle").click(function (e) {
        e.preventDefault();
        console.log('on')
        $(this).addClass("animation-active");;

    });
});