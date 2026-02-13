# Guía: Distribuir tu aplicación con GitHub Releases

## Paso 1: Crear un repositorio en GitHub

1. Ve a [github.com](https://github.com) y crea una cuenta (si no tienes)
2. Haz clic en **"+"** (arriba a la derecha) → **"New repository"**
3. Llena:
   - **Repository name:** `Glamly` (o el nombre que prefieras)
   - **Description:** "Sistema de gestión para salones de estética"
   - **Public** (para que cualquiera pueda descargar)
   - Haz clic en **"Create repository"**

---

## Paso 2: Sube tu código local a GitHub

En PowerShell, dentro de tu carpeta de proyecto:

```powershell
# Inicializa Git si no lo has hecho
git init

# Configura tu usuario (solo la primera vez)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Añade todos los archivos
git add .

# Crea el primer commit
git commit -m "Sitio web Glamly con página de compra"

# Vincula el repositorio remoto (reemplaza TU_USUARIO y TU_REPO)
git remote add origin https://github.com/TU_USUARIO/Glamly.git

# Sube todo a GitHub
git branch -M main
git push -u origin main
```

### ¿Qué archivos subir?
✅ index.html, purchase.html, success.html
✅ script.js, style.css
✅ server.py
✅ carpeta Assets/
✅ carpeta app/ (con tu setup.exe)

❌ NO subas: node_modules/, carpetas grandes innecesarias

---

## Paso 3: Crear un Release en GitHub

1. Ve a tu repositorio en GitHub: `github.com/TU_USUARIO/Glamly`
2. En la columna derecha, haz clic en **"Releases"** → **"Create a new release"**
3. Llena:
   - **Tag version:** `v1.0.0` (o `v1.0.1`, etc.)
   - **Release title:** "Glamly v1.0.0"
   - **Description:** 
     ```
     Versión inicial de Glamly
     
     Funcionalidades:
     - Agenda inteligente
     - Punto de venta
     - Inventario
     - Nómina y comisiones
     
     Para instalar: Descarga setup.exe y ejecuta.
     ```

4. Haz clic en **"Attach binaries"** o arrastra tu archivo `setup.exe` directamente
5. Haz clic en **"Publish release"**

---

## Paso 4: Obtén la URL de descarga

Una vez publicado, GitHub te dará una URL como:
```
https://github.com/TU_USUARIO/Glamly/releases/download/v1.0.0/setup.exe
```

---

## Paso 5: Actualiza tu sitio web

Reemplaza el enlace en `success.html`:

```html
<a id="downloadApp" href="https://github.com/TU_USUARIO/Glamly/releases/download/v1.0.0/setup.exe" 
   class="btn" download>Descargar aplicación</a>
```

---

## Ventajas de GitHub Releases

✅ **Sin advertencias de seguridad** — GitHub es reconocido como fuente confiable
✅ **Hosting gratis y confiable**
✅ **Versionado automático** — puedes tener v1.0, v1.1, v2.0, etc.
✅ **Estadísticas de descargas** — ves cuántas personas descargaron
✅ **Actualizaciones fáciles** — solo crea un nuevo Release

---

## Actualizar tu app en el futuro

Cuando saques una versión nueva:

1. En PowerShell:
   ```powershell
   git add .
   git commit -m "Versión 1.0.1 con bug fixes"
   git push
   ```

2. En GitHub: crea un nuevo Release con el nuevo `setup.exe` y cambia la versión en `success.html`

---

## ¿Necesitas ayuda con los comandos Git?

Si te da error al hacer `git push`, asegúrate de:
- Tener instalado Git: `git --version`
- Tener credenciales guardadas o generar un token en GitHub
- Que la URL sea correcta

¿Necesitas que te ayude con algún paso específico?
