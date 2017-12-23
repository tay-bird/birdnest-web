var canvas = document.getElementById("clouds");

function draw_cloud(font_size, x_position, y_position) {
    var ctx = canvas.getContext("2d");
    ctx.font= font_size + 'px FontAwesome';
    ctx.fillText('\uF0C2', x_position, y_position);
}

draw_cloud(200, canvas.width/2, canvas.height/2)
draw_cloud(100, canvas.width/4, canvas.height/4)
