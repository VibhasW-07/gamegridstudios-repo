"""
This is just a static file server to view the HTML files.
No server-side processing is happening - this only serves the files.
"""

from flask import Flask, send_from_directory, redirect

app = Flask(__name__, static_url_path='')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def send_static(path):
    try:
        return send_from_directory('.', path)
    except:
        return redirect('/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)