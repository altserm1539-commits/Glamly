## Instrucciones para ejecutar el servidor

Para que las descargas de la aplicación funcionen correctamente sin bloqueos de seguridad del navegador, ejecuta el servidor Python incluido:

### Windows PowerShell:
```powershell
python server.py
```

### Windows CMD:
```cmd
python server.py
```

### Luego abre en tu navegador:
```
http://localhost:8000
```

### ¿Qué hace el servidor?
- Sirve el sitio web desde tu máquina local
- Configura los headers HTTP correctos para descargas de .exe
- Permite descargas directas sin bloqueos de seguridad
- La descarga de la app inicia automáticamente en la página de éxito

### Para detener el servidor:
Presiona **Ctrl + C** en la terminal

---

**NOTA:** Cuando despliegues en producción (servidor real), configura el servidor web (Apache, Nginx, etc.) con los mismos headers HTTP para permitir descargas de ejecutables.
