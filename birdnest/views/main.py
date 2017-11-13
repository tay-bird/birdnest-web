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


INDEX_PAGE = 'index.html'


@app.route("/")
@app.route("/<path:path>")
def home(path=''):
    bucket = S3Connector('taybird-birdnest')                                                                                                                                                                                      
                                                                                                                                                                                                                                      
    response = bucket.read_key(path)                                                                                                                                                                                                  
    return response


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


@app.route("/aboutme/")
@app.route("/aboutme/<path:path>")
def aboutme(path=''):
    bucket = S3Connector('taybird-aboutme')

    response = bucket.read_key(path)
    return response


class S3Connector(object):

    # https://technology.jana.com/2015/03/12/using-flask-and-boto-to-create-a-proxy-to-s3/
    def __init__(self, bucket_name):
        self.connection = S3Connection(anon=True)
        self.bucket = self.connection.get_bucket(bucket_name, validate=False)
        self.key = boto.s3.key.Key(self.bucket)

    def read_key(self, object_path):
        if object_path:
            self.key.key = object_path
        else:
            self.key.key = INDEX_PAGE

        try:
            self.key.open_read()
            headers = dict(self.key.resp.getheaders())
            return Response(self.key, headers=headers)

        except boto.exception.S3ResponseError as e:
            return Response(e.body, status=e.status, headers=self.key.resp.getheaders())
