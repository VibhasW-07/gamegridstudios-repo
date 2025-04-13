"""
IMPORTANT: This file is ONLY for the Replit environment to serve the static files.
This is NOT part of the website itself. The website is purely HTML, CSS, and JavaScript.
You can ignore this file when downloading the project - just open index.html directly.
"""

import http.server
import socketserver

PORT = 5000
Handler = http.server.SimpleHTTPRequestHandler

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        http.server.SimpleHTTPRequestHandler.end_headers(self)

with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()