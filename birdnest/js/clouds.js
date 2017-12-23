var canvas = document.getElementById("clouds");
var ctx = canvas.getContext("2d");

function redrawCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    draw_cloud(200, canvas.width/2, canvas.height/2)
    draw_cloud(100, canvas.width/4, canvas.height/4)
}

function draw_cloud(font_size, x_position, y_position) {
    ctx.font = font_size + 'px FontAwesome';
    ctx.fillText('\uF0C2', x_position, y_position);
}

window.addEventListener('resize', redrawCanvas, false);
redrawCanvas()

/* document.body.style.background = "url(" + canvas.toDataURL() + ") no-repeat center center fixed"; */
