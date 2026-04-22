/**Combinando Conceptos Avanzados de JS

**Instrucciones:** Resuelve los siguientes ejercicios aplicando los conceptos de desestructuración, 
operadores spread/rest, closures, Map y Set según sea necesario.

---

### Ejercicio 1: Gestor de Tareas Mejorado

Crea un gestor de tareas que utilice `Map` para almacenar las tareas,
 donde la clave sea un ID único y el valor sea un objeto de tarea. 
 Cada tarea tendrá `id`, `descripcion`, `completada` (booleano) y un `Set` de `etiquetas`.*/
 const gestorTareas= new Map()

/*Implementa las siguientes funciones:
1.  `agregarTarea({ id, descripcion, etiquetas = [] })`:
    *   Debe usar desestructuración para los parámetros.
    *   Si el `id` ya existe, no debe sobrescribir la tarea existente y podría devolver un mensaje de error o `false`.
    *   Las `etiquetas` deben almacenarse en un `Set` dentro del objeto de la tarea.
    *   La tarea se guarda en un `Map` global o encapsulado.*/

function agregarTarea({ id, descripcion, etiquetas = [] }) {
  if (gestorTareas.has(id)) {
    console.error("Ya existe una tarea con ese ID");
    return false;
  }

  const tarea = {
    id,
    descripcion,
    completada: false,
    etiquetas: new Set(etiquetas)
  };

  gestorTareas.set(id, tarea);
  return true;
}

// Ejemplo de uso
agregarTarea({ id: 1, descripcion: "Comprar pan", etiquetas: ["hogar", "compras"] });
agregarTarea({ id: 2, descripcion: "Estudiar JS", etiquetas: ["estudio"] });

console.log(gestorTareas.get(1));

   
   
/*
2.  `marcarCompletada(id)`: Cambia el estado `completada` de la tarea a `true`.*/
function marcarCompletada(id) {
  if (gestorTareas.has(id)) {
    gestorTareas.get(id).completada = true;
    return true;
  } else {
    console.error("No existe una tarea con ese ID");
    return false;
  }
}

marcarCompletada(1);
/*
3.  `obtenerTareasPorEtiqueta(etiqueta)`: Devuelve un array con las descripciones de las tareas 
que contengan la `etiqueta` especificada.*/
function obtenerTareasPorEtiqueta(etiqueta) {
  const resultado = [];
  for (const tarea of gestorTareas.values()) {
    if (tarea.etiquetas.has(etiqueta)) {
      resultado.push(tarea.descripcion);
    }
  }
  return resultado;
}
agregarTarea({ id: 3, descripcion: "Ir al gimnasio", etiquetas: ["salud"] });

console.log(obtenerTareasPorEtiqueta("hogar"));
// ["Comprar pan", "Estudiar JS"]

console.log(obtenerTareasPorEtiqueta("salud"));

/*
4.  `obtenerResumenTareas()`: Devuelve un objeto con `{ total, completadas, pendientes }`.*/

/**Pistas:**
*   Puedes usar un closure para encapsular el `Map` de tareas si lo deseas.
*   Para `obtenerTareasPorEtiqueta`, necesitarás iterar el `Map` y luego verificar el `Set` de etiquetas
 de cada tarea.

---*/
function obtenerResumenTareas() {
  let completadas = 0;

  // Iteramos todas las tareas
  for (const tarea of gestorTareas.values()) {
    if (tarea.completada) completadas++;
  }

  return {
    total: gestorTareas.size,
    completadas,
    pendientes: gestorTareas.size - completadas
  };
}

console.log(obtenerResumenTareas());

/*

### Ejercicio 2: Procesador de Listas de Invitados

Debes crear una función `procesarListas` que acepte un número variable de listas de invitados
 (arrays de strings con nombres).
La función debe:
1.  Combinar todas las listas en una sola.
2.  Eliminar nombres duplicados (cada invitado debe aparecer solo una vez).
3.  Devolver un objeto con dos propiedades:
    *   `invitadosUnicos`: Un `Set` con los nombres únicos de los invitados.
    *   `conteoTotalInvitados`: El número total de nombres recibidos antes de la deduplicación.
    *   `conteoInvitadosUnicos`: El número de invitados únicos.

**Pistas:**
*   Usa el operador `rest` para aceptar múltiples listas.
*   Usa el operador `spread` para combinar los arrays.
*   Usa `Set` para obtener los nombres únicos.*/
function procesarListas(...listas) {
  const invitadosCombinados = [].concat(...listas);
  const invitadosUnicos = new Set(invitadosCombinados);

  return {
    invitadosUnicos,
    conteoTotalInvitados: invitadosCombinados.length,
    conteoInvitadosUnicos: invitadosUnicos.size
  };
}

// Ejemplo de uso
const resultadoInvitados = procesarListas(
  ["Ana", "Luis"],
  ["Luis", "Marta"],
  ["Ana", "Pedro"]
);

console.log(resultadoInvitados);
/*



/*

---

### Ejercicio 3: Creador de Funciones de Filtrado

Escribe una función `crearFiltroPorPropiedad` que sea una factory function (utilice closures).
Esta función debe tomar un `nombrePropiedad` como argumento.
Debe devolver otra función. Esta función devuelta tomará un `valorEsperado` y un array de objetos.
Finalmente, filtrará el array de objetos, devolviendo solo aquellos objetos donde la propiedad
 (especificada por `nombrePropiedad` en la factory) sea igual al `valorEsperado`.

**Ejemplo de uso:**
`const filtrarPorCiudad = crearFiltroPorPropiedad("ciudad");`
`const residentesMadrid = filtrarPorCiudad("Madrid", [{nombre: "Ana", ciudad: "Madrid"}, {nombre: "Luis", ciudad: "Barcelona"}]);`
`// residentesMadrid debería ser [{nombre: "Ana", ciudad: "Madrid"}]`

**Pistas:**
*   La función externa "recordará" `nombrePropiedad` gracias al closure.
*   La función interna usará este `nombrePropiedad` para acceder dinámicamente a la propiedad del objeto.

---
*/
function crearFiltroPorPropiedad(nombrePropiedad) {
  // Función interna que recuerda "nombrePropiedad"
  return function(valorEsperado, objetos) {
    return objetos.filter(obj => obj[nombrePropiedad] === valorEsperado);
  };
}
const filtrarPorCiudad = crearFiltroPorPropiedad("ciudad");

const residentesMadrid = filtrarPorCiudad("Madrid", [
  { nombre: "Ana", ciudad: "Madrid" },
  { nombre: "Luis", ciudad: "Barcelona" },
  { nombre: "Marta", ciudad: "Madrid" }
]);

console.log(residentesMadrid);

const filtrarPorEdad = crearFiltroPorPropiedad("edad");
const mayoresDe30 = filtrarPorEdad(30, [
  { nombre: "Ana", edad: 30 },
  { nombre: "Luis", edad: 25 }
]);




/*

### Ejercicio 4: Registro de Eventos con Timestamps Únicos

Crea un sistema para registrar eventos. Cada evento debe tener un timestamp como clave y una descripción como valor.
1.  Usa un `Map` para almacenar los eventos.
2.  Crea una función `registrarEvento(descripcion)`:
    *   Debe generar un timestamp (puedes usar `Date.now()`).
    *   Para asegurar la unicidad del timestamp como clave (en caso de llamadas muy rápidas), si el timestamp ya existe en el `Map`, intenta con el siguiente milisegundo hasta encontrar uno libre.
    *   Guarda el evento en el `Map`.
3.  Crea una función `obtenerEventosEntre({ inicio, fin })` que use desestructuración para los parámetros `inicio` y `fin` (timestamps). Debe devolver un array de objetos `{ timestamp, descripcion }` para los eventos dentro de ese rango.

**Pistas:**
*   Un `while` loop puede ser útil para encontrar un timestamp único.
*   Para `obtenerEventosEntre`, itera sobre las claves (timestamps) del `Map`.
*/
function crearRegistroEventos() {
  const eventos = new Map(); // Aquí guardamos todos los eventos

  // Función para registrar un evento
  function registrarEvento(descripcion) {
    let timestamp = Date.now();

    // Si el timestamp ya existe, avanzamos hasta encontrar uno libre
    while (eventos.has(timestamp)) {
      timestamp++;
    }

    eventos.set(timestamp, descripcion);
    return timestamp; // Devolvemos el timestamp asignado
  }

  // Función para obtener eventos entre dos timestamps
  function obtenerEventosEntre({ inicio, fin }) {
    const resultado = [];
    for (const [timestamp, descripcion] of eventos.entries()) {
      if (timestamp >= inicio && timestamp <= fin) {
        resultado.push({ timestamp, descripcion });
      }
    }
    return resultado;
  }

  // Exponemos las funciones
  return { registrarEvento, obtenerEventosEntre };
}
const registro = crearRegistroEventos();

// Registramos algunos eventos
const t1 = registro.registrarEvento("Inicio del sistema");
const t2 = registro.registrarEvento("Usuario logueado");
const t3 = registro.registrarEvento("Archivo guardado");

// Obtenemos eventos entre dos timestamps
console.log(registro.obtenerEventosEntre({ inicio: t1, fin: t2 }));
/*

*/

/*



---

### Ejercicio 5: Transformador de Datos de API

Imagina que recibes datos de usuarios de una API en un formato y necesitas transformarlos.
Los datos vienen como un array de objetos:
`[{ id: 1, nombre_completo: "Ana Pérez", email: "ana.perez@example.com", detalles: { edad: 30, pais_residencia: "ES" } }, ...]`

Crea una función `transformarYAgruparUsuarios(usuariosApi, ...propiedadesAdicionales)`:
1.  `usuariosApi`: El array de objetos como el descrito.
2.  `...propiedadesAdicionales`: Un rest parameter que contendrá nombres de propiedades a extraer directamente del objeto `detalles` (ej. "edad", "pais_residencia").
3.  La función debe transformar cada objeto de usuario al siguiente formato:
    `{ userId: id, nombre: (solo el nombre, no el apellido), email, ... (las propiedades adicionales extraídas de 'detalles') }`
4.  Además, la función debe agrupar a los usuarios por `pais_residencia` (si esta propiedad se solicitó y existe). El resultado de la agrupación debe ser un `Map` donde la clave es el código del país y el valor es un `Set` de `userId`s de los usuarios de ese país.
5.  La función debe devolver un objeto con:
    *   `usuariosTransformados`: Array de los objetos de usuario transformados.
    *   `usuariosPorPais`: El `Map` de la agrupación por país (o un `Map` vacío si "pais_residencia" no estaba en `propiedadesAdicionales`).

**Pistas:**
*   Usa desestructuración para acceder a las propiedades anidadas y para renombrar.
*   Usa el operador `spread` para construir los nuevos objetos de usuario de forma dinámica.
*   Itera sobre `propiedadesAdicionales` para construir el objeto transformado.
*   Usa `Map` y `Set` para la agrupación.
 * 
 */
function transformarYAgruparUsuarios(usuariosApi, ...propiedadesAdicionales) {
  const usuariosTransformados = [];
  const usuariosPorPais = new Map();

  for (const { id, nombre_completo, email, detalles } of usuariosApi) {
    // Extraer solo el primer nombre
    const [nombre] = nombre_completo.split(" ");

    // Construir objeto con propiedades adicionales
    const adicionales = {};
    for (const prop of propiedadesAdicionales) {
      if (detalles[prop] !== undefined) {
        adicionales[prop] = detalles[prop];
      }
    }

    // Crear objeto transformado
    const usuarioTransformado = {
      userId: id,
      nombre,
      email,
      ...adicionales
    };

    usuariosTransformados.push(usuarioTransformado);

    // Agrupar por país si se pidió pais_residencia
    if (propiedadesAdicionales.includes("pais_residencia") && detalles.pais_residencia) {
      const pais = detalles.pais_residencia;
      if (!usuariosPorPais.has(pais)) {
        usuariosPorPais.set(pais, new Set());
      }
      usuariosPorPais.get(pais).add(id);
    }
  }

  return { usuariosTransformados, usuariosPorPais };
}
const usuariosApi = [
  { id: 1, nombre_completo: "Ana Pérez", email: "ana.perez@example.com", detalles: { edad: 30, pais_residencia: "ES" } },
  { id: 2, nombre_completo: "Luis Gómez", email: "luis.gomez@example.com", detalles: { edad: 25, pais_residencia: "AR" } },
  { id: 3, nombre_completo: "Marta López", email: "marta.lopez@example.com", detalles: { edad: 30, pais_residencia: "ES" } }
];

const resultadoUsuarios = transformarYAgruparUsuarios(usuariosApi, "edad", "pais_residencia");

console.log(resultadoUsuarios.usuariosTransformados);
/*
[
  { userId: 1, nombre: "Ana", email: "ana.perez@example.com", edad: 30, pais_residencia: "ES" },
  { userId: 2, nombre: "Luis", email: "luis.gomez@example.com", edad: 25, pais_residencia: "AR" },
  { userId: 3, nombre: "Marta", email: "marta.lopez@example.com", edad: 30, pais_residencia: "ES" }
]
*/

console.log(resultadoUsuarios.usuariosPorPais);
/*
Map {
  "ES" => Set { 1, 3 },
  "AR" => Set { 2 }
}
*/
