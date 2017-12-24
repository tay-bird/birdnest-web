// clouds for taybird.com


window.onload = function () {

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext("2d");

    function redrawCanvas() {
        console.log('redraw');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.globalAlpha = 1.0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
            
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = "#87CEEB";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        iterations = Math.floor(Math.random() * 4) + 4;

        for (i = 0; i < iterations; i++) {
            // Cloud have a variable size that tends to increase each iteration.
            // Cloud should be larger if total number of clouds is low.
            first_size = Math.floor(Math.random() * 50) + (i * 25)
            
            // Cloud tends to be towards the centre, moreso larger ones.
            first_x = Math.floor(Math.random() * (canvas.width - first_size)) + (first_size / 2)
            first_y = Math.floor(Math.random() * (canvas.height - first_size)) + (first_size / 2)
            first_alpha =  0.6 - (i / 20)

            // Cloud is randomly placed and tends to be very transparent.
            second_size = first_size / i
            second_x = Math.floor(Math.random() * canvas.width)
            second_y = Math.floor(Math.random() * canvas.height)
            second_alpha = Math.random() - 0.5

            draw_cloud(first_size, first_alpha, first_x, first_y)
            draw_cloud(second_size, second_alpha, second_x, second_y)

            document.body.style.background = "url(" + canvas.toDataURL() + ")";
            document.body.style.setProperty('background-attachment', 'fixed');
            document.body.style.setProperty('background-position-x', 'center');
            document.body.style.setProperty('background-position-y', 'center');
            document.body.style.setProperty('background-repeat', 'no-repeat');
            document.body.style.setProperty('background-size', 'cover');
        }
    }

    function draw_cloud(font_size, alpha, x_position, y_position) {
        ctx.globalAlpha = alpha;
        ctx.font = font_size + 'px FontAwesome';
        ctx.fillText('\uF0C2', x_position, y_position);
    }

    window.addEventListener('resize', redrawCanvas, false);
    window.addEventListener('orientationchange', redrawCanvas, false);
    redrawCanvas()

}
