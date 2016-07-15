from birdnest import app

from flask import redirect, render_template

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/resume")
def resume():
	return redirect("/static/pdf/resume.pdf")
