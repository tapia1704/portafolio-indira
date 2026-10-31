# Portafolio de Indira Tapia Quispe

Sitio web personal responsive, preparado para publicar en **Vercel**. Está construido con HTML, CSS y JavaScript puros, sin necesidad de instalar paquetes ni ejecutar una compilación.

## Cómo verlo

1. Descomprime la carpeta.
2. Abre `index.html` con Chrome (puedes hacer doble clic).
3. Para pruebas locales con un servidor, abre una terminal dentro de la carpeta y ejecuta `python -m http.server 8000`. Entra a `http://localhost:8000`.

## Cómo subirlo a Vercel (GitHub)

1. Crea un repositorio nuevo en https://github.com/new (por ejemplo, `portafolio-indira`).
2. Sube **los archivos que están dentro de esta carpeta** a la raíz del repositorio: `index.html`, `styles.css`, `script.js`, `assets/`.
3. Abre https://vercel.com/new y entra con tu cuenta.
4. Importa el repositorio desde GitHub.
5. En **Framework Preset**, selecciona `Other` (o el valor de sitio estático que Vercel detecte).
6. Deja **Build Command** sin configurar y **Output Directory** en la raíz (puede aparecer vacío o `.` según la interfaz); el archivo `index.html` debe estar en la raíz.
7. Haz clic en **Deploy**. Vercel proporcionará una dirección `*.vercel.app` cuando el despliegue finalice.

## Cómo subirlo desde la terminal (alternativa)

Con Node.js instalado, dentro de la carpeta del portafolio:

```bash
npm install -g vercel
vercel login
vercel --prod
```

Sigue las preguntas de la terminal. **No es necesario** utilizar este método si prefieres GitHub.

## Qué se puede editar

- **Textos, experiencia, proyectos y correo:** `index.html`.
- **Colores, tamaños y tipografía:** `styles.css`.
- **Detalles de los proyectos en la ventana emergente:** objeto `projects` dentro de `script.js`.
- **CV descargable:** reemplaza `assets/CV-Indira-Tapia.pdf` conservando el nombre del archivo.
- **Icono de pestaña:** `assets/favicon.svg`.

## Importante sobre la información

- **Basado en el CV:** Indira Tapia Quispe, estudios de 5.º ciclo en SENATI, experiencia en call center y librería, Android Studio, Node.js, Socket.IO, EcolimApp y chat académico.
- **Ideas propuestas:** «Mi Semana» y «StudyMate» **no se presentan como proyectos realizados**; están identificados como conceptos para seguir aprendiendo.
- Las vistas de los proyectos son **mockups ilustrativos**, no fotografías ni capturas de aplicaciones terminadas.
- El CV PDF original contiene un número de teléfono personal. Revísalo antes de publicar: si no deseas que sea público, reemplaza el PDF por una versión sin ese dato.
- No hay vínculos de GitHub, LinkedIn o demos porque no se proporcionaron y no se deben inventar.

## Estructura

```text
index.html
styles.css
script.js
assets/
  favicon.svg
  CV-Indira-Tapia.pdf
```

Sitio estático, sin recopilación de datos ni backend.
