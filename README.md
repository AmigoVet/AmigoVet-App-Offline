██████╗ ███████╗██╗   ██╗ ██████╗ ██████╗  █████╗     ██╗ ███╗   ██╗ ██████╗ 
██╔══██╗██╔════╝██║   ██║██╔═══██╗██╔══██╗██╔══██╗    ██║ ████╗  ██║██╔═══██╗
██║  ██║█████╗  ██║   ██║██║   ██║██████╔╝███████║    ██║ ██╔██╗ ██║██║   
██║  ██║██╔══╝  ╚██╗ ██╔╝██║   ██║██║█║═╝ ██╔══██║    ██║ ██║╚██╗██║██║   ██║
██████╔╝███████╗ ╚████╔╝ ╚██████╔╝██║ ██║ ██║  ██║    ██║ ██║ ╚████║╚██████╔╝
╚═════╝ ╚══════╝  ╚═══╝   ╚═════╝ ╚═╝ ╚═╝ ╚═╝  ╚═╝    ╚═╝ ╚═╝  ╚═══╝ ╚═════╝ 
```

# DevoraInc - AmigoVet App

**AmigoVet** es una aplicación diseñada para simplificar la gestión de la salud animal, permitiendo a los usuarios llevar un registro eficiente de información veterinaria para sus mascotas o animales de granja.

## Características principales
- Gestión de perfiles de animales (nombre, edad, salud, ubicación).
- Seguimiento de vacunas, embarazos y tratamientos médicos.
- Funcionalidades de búsqueda avanzada por categorías.
- Diseño intuitivo y adaptable a cualquier dispositivo móvil.

---

## Despliegue de la Aplicación
A continuación, se explica cómo instalar y ejecutar el proyecto localmente utilizando **Yarn**.

### **Requisitos previos**
Asegúrate de tener instalados:
- [Node.js](https://nodejs.org/) (versión recomendada: 16 o superior)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) (última versión)

### **Pasos para desplegar**

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu_usuario/amigovet.git
   cd amigovet
   ```

2. **Instalar las dependencias:**
   ```bash
   yarn install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:
   ```plaintext
   API_URL=https://api.amigovet.com
   DATABASE_URL=mongodb://localhost:27017/amigovet
   ```

4. **Ejecutar el proyecto:**
   ```bash
   yarn start
   ```

5. **Acceder a la aplicación:**
   Abre un navegador y ve a `http://localhost:3000`.

---

## Scripts Disponibles

- `yarn start`: Inicia la aplicación en modo de desarrollo.
- `yarn build`: Crea una versión optimizada para producción.
- `yarn test`: Ejecuta pruebas unitarias.
- `yarn lint`: Analiza el código en busca de errores y mejores prácticas.

---

## Contribución
Si deseas contribuir al desarrollo de **AmigoVet**, sigue estos pasos:
1. Haz un fork del repositorio.
2. Crea una nueva rama con tu característica o corrección:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza los cambios y haz un commit:
   ```bash
   git commit -m "Agregada nueva funcionalidad"
   ```
4. Envía un pull request al repositorio principal.

---

## Licencia
**AmigoVet** está bajo la [AmigoVet License](./LICENSE). Consulta el archivo para más detalles sobre el uso y distribución del código.

---

## Contacto
**Autor:** Juan José Mera Barrera  
**Correo:** juan1mera2barrera@gmail.com  

"Si puedes imaginarlo, puedo programarlo."
