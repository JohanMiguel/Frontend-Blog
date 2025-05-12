# 🖥️ Blog Frontend - Explorador de Publicaciones

Este proyecto es una aplicación frontend para un blog que permite a los usuarios explorar, buscar y visualizar publicaciones relacionadas con diversos temas académicos o de interés general.

---

## 🚀 Funcionalidades del Proyecto

### 🔍 Exploración de Publicaciones

- Los usuarios pueden visualizar una lista de publicaciones disponibles en el blog.
- Cada publicación muestra el título, contenido breve, autor, fecha de creación y curso o categoría asociada.

### 🔎 Búsqueda de Publicaciones

- Campo de búsqueda para encontrar publicaciones específicas.
- El filtrado se realiza por nombre del curso o categoría, y los resultados se actualizan dinámicamente.

### 📄 Visualización Detallada de Publicaciones
- Las publicaciones se Muestran del mas reciente ala publicacion mas antigua en forma de lista como se requiere.
- Al seleccionar una publicación, se accede a una vista detallada.
- Se muestra el contenido completo, autor, fecha de creación y los comentarios relacionados.

### 💬 Gestión de Comentarios

- Los usuarios pueden agregar comentarios a las publicaciones.
- Cada comentario incluye el nombre del usuario, contenido y fecha.
- Los comentarios se listan en la misma página de la publicación correspondiente.
- Los comentarios se oredenan del mas reciente al mas antiguo.

### 🔄 Carga Dinámica de Datos

- Los datos de publicaciones y comentarios se obtienen dinámicamente mediante solicitudes a una API REST.
- Se manejan estados de carga y errores para mejorar la experiencia del usuario.

### 🧭 Navegación entre Páginas

- La aplicación permite navegar desde la lista de publicaciones hasta una página de detalles específica y viceversa.
- Navegación fluida e intuitiva para mejorar la interacción del usuario.

### ❌ Manejo de Errores

- Mensajes claros para problemas como errores de red o límites de solicitudes excedidos.
- Indicadores visuales en caso de fallas en la carga de datos.

### ⏳ Estado de Carga

- Se incluyen spinners o mensajes de "Cargando..." mientras se procesan solicitudes al backend.

### 🌐 Integración con API

- Se conecta con una API REST para:
  - Obtener todas las publicaciones.
  - Buscar publicaciones por curso.
  - Agregar y mostrar comentarios.

---

> Desarrollado con Johan Tojin 2020591 