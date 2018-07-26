$("#cartpng").hover(function () {
    // Устанавливает прозрачность в 1 при наведении
    $("#carttext").fadeTo("slow", 1.0);
    // $("#cartpng").fadeTo("slow", 0.0);
}, function () {
     // Устанавливает прозрачность в 0 при выведении
    $("#carttext").fadeTo("slow", 0.0);
    // $("#cartpng").fadeTo("slow", 1.0);
});