# D&G Taller Automotriz

Sistema de citas del taller **D&G Automotriz** (Diesel & Gasolina) – Saltillo, Coahuila.

PWA offline + Firebase + envío automático de WhatsApp.

---

## Desplegar en GitHub Pages

### 1. Crea el repositorio
1. Ve a https://github.com/new
2. Nombre sugerido: `dg-taller` o `dyg-automotriz`
3. Déjalo **público**
4. **No** marques “Add a README”
5. Crea el repositorio

### 2. Sube los archivos

En la carpeta de este proyecto ejecuta:

```bash
git init
git add .
git commit -m "D&G Taller Automotriz - listo para GitHub Pages"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/NOMBRE-DEL-REPO.git
git push -u origin main
```

(Reemplaza `TU-USUARIO` y `NOMBRE-DEL-REPO`)

### 3. Activa GitHub Pages
1. En el repositorio ve a **Settings → Pages**
2. Source → Branch: `main`  
   Folder: `/ (root)`
3. Guarda y espera 1-2 minutos

Tu app estará en:
```
https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/
```

---

## Notas técnicas

- Todas las rutas son **relativas** → funciona correctamente en Project Pages.
- Service Worker registrado como `"sw.js"` (relativo).
- Manifest con `start_url: "./"` y `scope: "./"`.
- Cache version: `dg-taller-v7`

## Firebase
Proyecto configurado: `dygautomotriz-6ec1e`

Color de marca: `#760017`
