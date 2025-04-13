"""
IMPORTANT NOTE: This file is ONLY for Replit to serve the static files.
It has nothing to do with the actual website, which is pure HTML/CSS/JavaScript.
The website works by simply opening index.html in a browser.
"""

from flask import Flask, send_from_directory

app = Flask(__name__, static_url_path='')

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)