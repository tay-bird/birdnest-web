from birdnest import app


import random

from flask import make_response
from flask import redirect
from flask import render_template


@app.route("/")
def home():
    return render_template("index.html")

@pp.route("/background")
def background():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    image_dir = os.path.abspath(os.path.join(current_dir, "../static/img/")
    images = glob.glob(os.path.join(image_dir, "bg_*"))
    background = random.choice(image)

    with open(background) as f:
        response = make_response(f.read())
        response.content_type = "image/jpeg"

    return response


@app.route("/resume")
def resume():
	return redirect("/static/pdf/resume.pdf")
