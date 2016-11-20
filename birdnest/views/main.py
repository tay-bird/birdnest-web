from birdnest import app


import glob
import logging
import os
import random

import boto
from boto.s3.connection import S3Connection
from flask import make_response
from flask import redirect
from flask import render_template
from flask import Response
from flask import send_file


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/background")
def background():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    image_dir = os.path.abspath(os.path.join(current_dir, "../static/img/"))
    images = glob.glob(os.path.join(image_dir, "bg_*"))
    background = random.choice(images)

    with open(background) as f:
        response = make_response(f.read())
        response.content_type = "image/jpeg"

    return send_file(background, mimetype="image/jpeg")


@app.route("/resume")
def resume():
	return redirect("/static/pdf/resume.pdf")


@app.route("/aboutme/<path:path>")
def aboutme(path):
    # https://technology.jana.com/2015/03/12/using-flask-and-boto-to-create-a-proxy-to-s3/
    conn = S3Connection(anon=True)
    bucket = conn.get_bucket('taybird-aboutme', validate=False)
    key = boto.s3.key.Key(bucket)
    key.key = path

    try:
        key.open_read()
        headers = dict(key.resp.getheaders())
        return Response(key, headers=headers)
    except boto.exception.S3ResponseError as e:
        return flask.Response(e.body, status=e.status, headers=key.resp.getheaders())
