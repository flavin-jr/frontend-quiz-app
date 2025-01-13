$(document).ready(function () {
    $.ajax({
        url: "/data.json",
        type: "GET",
        data: {},
        dataType: "json",
        success: function (response) {
            console.log(response);
            const colors = {
                'HTML': "#FFF1E9",
                'CSS': "#E0FDEF",
                'JavaScript': "#EBF0FF",
                'Accessibility': "#F6E7FF",
            }
            $(".toggle").click(function (e) {
                e.preventDefault();
                console.log('on')
                $(this).addClass("animation-active");

            });

            $(".option").click(function (e) {
                e.preventDefault();

                const subject = $(this).children(':eq(1)').text();
                const data = response.quizzes.filter(item => item.title === subject);
                const finalData = data[0];
                const questions = finalData.questions;
                $(".main").css("display", "none")
                $(".theme-option").css("justify-content", "space-between")
                $(".subject").css("display", "flex")
                $(".subject").children(':eq(0)').attr({
                    'src': finalData.icon,
                    'alt': `Icone de ${subject}`
                });
                $(".subject").children(":eq(0)").css("background-color", colors[subject])

                $(".subject").children(':eq(1)').text(finalData.title)
                $(".html").css("display", "flex")


            });
        },
        error: function (xhr, status, error) {
            console.error("Error:", error); // Handle errors
        },
        complete: function () {
            console.log("Request completed."); // Always executed
        }
    });
});