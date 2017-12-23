window.onload = function () {

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext("2d");

    function redrawCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        iterations = Math.floor(Math.random() * 4) + 4;

        for (i = 0; i < iterations; i++) {
            first_size = Math.floor(Math.random() * 50) + (i * 25);
            first_x = Math.floor(Math.random() * (canvas.width - first_size)) + first_size
            first_y = Math.floor(Math.random() * (canvas.height - first_size)) + first_size

            second_size = first_size / i
            second_x = Math.floor(Math.random() * canvas.width)
            second_y = Math.floor(Math.random() * canvas.height)

            draw_cloud(first_size, first_x, first_y)
            draw_cloud(second_size, second_x, second_y)
        }
    }

    function draw_cloud(font_size, x_position, y_position) {
        ctx.globalAlpha=0.2;
        ctx.font = font_size + 'px FontAwesome';
        ctx.fillText('\uF0C2', x_position, y_position);
    }

    window.addEventListener('resize', redrawCanvas, false);
    redrawCanvas()

    document.body.style.background = "url(" + canvas.toDataURL() + ") no-repeat center center fixed";

}
