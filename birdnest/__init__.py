import json

from flask import Flask

app = Flask(__name__)

app.config['PROPAGATE_EXCEPTIONS'] = True

import birdnest.views

