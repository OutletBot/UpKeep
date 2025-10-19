import http.server
import socketserver
import webbrowser
import os

PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

# Change to the directory of the script
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Open the browser automatically
webbrowser.open(f'http://localhost:{PORT}')

# Start the server
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    httpd.serve_forever()
