$(document).ready(function () {

    const refreshDisplay = (currentIndex, questions) => {
        $(".question-number").text(`Question ${currentIndex + 1} of 10`)
        $(".question").text(questions[currentIndex].question)
        $(".progress").css('width', `${(currentIndex + 1) / 10 * 100}%`)
        $.map($(".answer"), function (value, index) {
            value.children[1].innerText = questions[currentIndex].options[index];


        });
    }
    const cleanAnswerDivs = () => {
        $.map($(".answer"), function (value, index) {
            if ($(value).hasClass("correct-answer")) {
                $(value).removeClass("correct-answer")
                $(value).removeClass("active")
                $(value).children().eq(2).remove()
                return
            }
            $(value).removeClass("active")
            $(value).removeClass("wrong-answer")
            $(value).children().eq(2).remove()
        });
    }
    $.ajax({
        url: "data.json",
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
                if ($(".toggle").hasClass('active-animation')) {

                    $(".toggle").removeClass('active-animation')
                    $(".toggle").addClass('deactivate')
                    $("body").removeClass('dark-theme')
                    $("h1").removeClass('dark-theme-text')
                    $("p").removeClass('dark-theme-text')
                    $("strong").removeClass('dark-theme-text')
                    $(".option").removeClass('dark-theme-div');
                    $(".answer").removeClass('dark-theme-div');
                    $(".score-box").removeClass('dark-theme-div');
                    $('.theme-container').children().eq(2).attr({
                        'src': 'assets/images/icon-moon-dark.svg'
                    })
                    $('.theme-container').children().eq(0).attr({
                        'src': 'assets/images/icon-sun-dark.svg'
                    })

                    return
                }
                $(".toggle").removeClass('deactivate')
                $(".toggle").addClass('active-animation')
                $("body").addClass('dark-theme')
                $("h1").addClass('dark-theme-text')
                $("p").addClass('dark-theme-text')
                $("strong").addClass('dark-theme-text')
                $(".option").addClass('dark-theme-div');
                $(".answer").addClass('dark-theme-div');
                $(".score-box").addClass('dark-theme-div');
                $('.theme-container').children().eq(2).attr({
                    'src': 'assets/images/icon-moon-light.svg'
                })
                $('.theme-container').children().eq(0).attr({
                    'src': 'assets/images/icon-sun-light.svg'
                })
            });

            $(".option").click(function (e) {
                e.preventDefault();
                $(".answer").off('click');
                $(".submit-btn").off('click');
                let subject = $(this).children(':eq(1)').text();
                console.log(subject)
                let data = response.quizzes.filter(item => item.title === subject);
                let finalData = data[0];
                let questions = finalData.questions;
                console.log(questions)
                let currentIndex = 0
                let currentScore = 0
                let correctAnswer = ''
                let answerDiv = ''
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
                refreshDisplay(currentIndex, questions)

                correctAnswer = questions[currentIndex].answer

                $(".answer").on('click', function (e) {
                    let flag = true
                    $.map($(".answer"), function (value, index) {
                        if (value.classList.contains('wrong-answer') || value.classList.contains('correct-answer')) {

                            flag = false
                        }
                    });
                    if (flag) {

                        $.map($(".answer"), function (value, index) {
                            if (value.classList.contains('active')) {

                                value.classList.remove('active')
                            }
                        });
                        $(this).toggleClass('active')
                        answerDiv = $(this)
                    }
                })


                $(".submit-btn").click(function (e) {

                    e.preventDefault();
                    if ($(this).text() === 'Next Question') {


                        currentIndex += 1
                        if (currentIndex > 9) {
                            $(".html").css("display", "none")
                            $(".score").css("display", "flex")
                            $(".question-type").children().eq(0).attr({
                                'src': finalData.icon,
                                'alt': `Icone de ${subject}`
                            })
                            $(".question-type").children().eq(0).css('background-color', colors[subject])
                            $(".question-type").children().eq(1).text(subject)

                            $(".score-box-container").children().eq(0).text(currentScore);
                            currentIndex = 0
                            return
                        }
                        cleanAnswerDivs()

                        $(this).text('Submit Answer')
                        refreshDisplay(currentIndex, questions)

                        correctAnswer = questions[currentIndex].answer

                        $(".answer").on('click', function (e) {
                            let flag = true
                            $.map($(".answer"), function (value, index) {
                                if (value.classList.contains('wrong-answer') || value.classList.contains('correct-answer')) {

                                    flag = false
                                }
                            });
                            if (flag) {

                                $.map($(".answer"), function (value, index) {
                                    if (value.classList.contains('active')) {

                                        value.classList.remove('active')
                                    }
                                });
                                $(this).toggleClass('active')
                                answerDiv = $(this)
                            }
                        })

                        return
                    }
                    if (!answerDiv) {
                        const accessibilityDiv = `
                        <div style="display:flex;align-items:center;justify-content:center;gap:8px;">
                        <img src="/assets/images/icon-error.svg" alt="Ícone de error">
                        <p style="font-size:24px;color:#EE5454">Please select an answer</p>
                        </div>
                        `;

                        $(".answers-container").append(accessibilityDiv);
                        setTimeout(() => {

                            $(".answers-container").children().last().remove();
                        }, 3000)

                        return
                    }
                    $(this).text('Next Question')

                    const answerText = answerDiv.children(":eq(1)").text()
                    if (answerText !== correctAnswer) {
                        answerDiv.append('<img src="/assets/images/icon-error.svg" alt="Icone de erro"></img>')
                        answerDiv.addClass('wrong-answer')
                        const resultado = $(".answer").filter(function () {
                            return $(this).find("p").text() === correctAnswer;
                        });
                        resultado.append('<img src="/assets/images/icon-correct.svg" alt="Icone de erro"></img>')
                        answerDiv = ''


                        return
                    }
                    answerDiv.append('<img src="/assets/images/icon-correct.svg" alt="Icone de erro"></img>')

                    answerDiv.addClass('correct-answer')
                    currentScore += 1
                    answerDiv = ''

                });

            });

            $(".play-again-btn").click(function (e) {
                e.preventDefault();
                $.map($(".answer"), function (value, index) {
                    $('.subject').children().eq(0).attr({
                        'src': '',
                        'alt': ''
                    });
                    $('.subject').children().eq(1).text('')
                    if ($(value).children().eq(2)) {
                        $(value).children().eq(2).remove();
                    }
                    if ($(value).hasClass('wrong-answer')) {

                        $(value).removeClass('wrong-answer');



                    }
                    if (value.classList.contains('correct-answer')) {

                        value.classList.remove('correct-answer')
                    }
                    if ($(value).hasClass('active')) {
                        $(value).removeClass('active');

                    }
                });
                $(".score").css('display', 'none');

                $(".main").css('display', 'flex');
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
