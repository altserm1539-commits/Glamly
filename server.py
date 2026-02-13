from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import mimetypes

class DownloadHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Headers para permitir descargas de .exe sin bloqueos
        if self.path.endswith('.exe'):
            self.send_header('Content-Type', 'application/octet-stream')
            self.send_header('Content-Disposition', f'attachment; filename="{os.path.basename(self.path)}"')
        super().end_headers()

    def do_GET(self):
        # Servir archivos normalmente
        super().do_GET()

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server_address = ('localhost', 8000)
    httpd = HTTPServer(server_address, DownloadHandler)
    print('Servidor ejecutándose en http://localhost:8000')
    print('Presiona Ctrl+C para detener')
    httpd.serve_forever()
