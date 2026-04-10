/*Ejercicios con Arrays y Objetos Literales
A continuación se proponen algunos ejercicios para trabajar con el array de usuarios:*/

import usuarios from "./usuarios.js";



/*### **1. Obtener los usuarios activos**
**Enunciado:** Crear una función que devuelva 
todos los usuarios que estén activos (`activo: true`).*/

function usuariosActivos(usuarios) {
    return usuarios.filter(usuario => usuario.activo)

}
console.log(usuariosActivos(usuarios))


/*### **2. Listar nombres y ciudades**
**Enunciado:** Crear una función que devuelva un array 
con strings del tipo: "Nombre - Ciudad".*/
function nombreCiudades(array) {
    return array.map(usuario => `${usuario.nombre} - ${usuario.domicilio.ciudad}`);
}
console.log(nombreCiudades(usuarios));


/*### **3. Agrupar usuarios por ciudad**
**Enunciado:** Crear una función que agrupe los usuarios por ciudad.
 El resultado debe ser un objeto cuyas claves sean las ciudades y 
 los valores arrays con los nombres de los usuarios que viven allí.*/
function usuariosCiudad(array) {
    return array.reduce((acumulador, usuario) => {
        if (!acumulador[usuario.domicilio.ciudad]) {
            acumulador[usuario.domicilio.ciudad] = [];
        }
        // Agregamos el nombre del usuario dentro del array de esa ciudad
        acumulador[usuario.domicilio.ciudad].push(usuario.nombre);
        return acumulador;
    }, {});
}
console.log(usuariosCiudad(usuarios))



/*### **4. Calcular el promedio de edad de los usuarios activos**
**Enunciado:** Crear una función que calcule el promedio de edad de
 los usuarios que están activos.*/

function calcularPromedioEdadActivos(array) {
  const activos = usuariosActivos(array); // usar el parámetro recibido
  const sumaEdades = activos.reduce((suma, usuario) => suma + usuario.edad, 0); 
  return activos.length > 0 ? sumaEdades / activos.length : 0;
} 


function usuariosActivosEdad(usuarios) {
  return usuarios.filter(usuario => usuario.activo);
}


console.log(calcularPromedioEdadActivos(usuarios));


