import React, { useState } from "react";
import { StorageManager } from "../../scripts/storageManager";
import type { lista_peliculas, AlertasListaProps } from "../../interface/peliculas";
import { ordenarPorAnioCreacion, 
    ordenarPorNombrePelicula,
    buscarPeliculasPorNombre
} from "../../helpers/pelicula";

const Buscador: React.FC<AlertasListaProps> = ({  setAlertLista }) => {
  const [ordenSeleccionado, setOrdenSeleccionado] = useState("");
  const [textoBusqueda, setTextoBusqueda] = useState("");

   const localStorageManager = new StorageManager('local');
   let peliculas: lista_peliculas = localStorageManager.load<lista_peliculas>('lista_peliculas') ?? { lista: [] };
  
    const cargarDatosTotal =  ()=>{
     const loadedPeliculas =  localStorageManager.load<lista_peliculas>('lista_peliculas');
     
     peliculas = loadedPeliculas ?? { lista: [] };
     
     if (loadedPeliculas == null) {
       localStorageManager.save<lista_peliculas>('lista_peliculas', peliculas);
     }
  }

    const cargarDatosBusqueda =  ()=>{
     return localStorageManager.load<lista_peliculas>('lista_peliculas_busqueda');
  }

  const handleOrdenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrdenSeleccionado(event.target.value);
    // Aquí puedes llamar a la función para cargar la búsqueda con el nuevo orden
   // cargarBusqueda(event.target.value, textoBusqueda);
    cargarDatosTotal();

     let auxNewLista: import("../../interface/peliculas").pelicula[] = [];
    switch(event.target.value){
      case "abc":
        auxNewLista =  ordenarPorNombrePelicula(peliculas.lista); 
      break;
      case "date":
       auxNewLista = ordenarPorAnioCreacion(peliculas.lista);
      break;
      case "":
       auxNewLista = peliculas.lista  
      break;
    }
    localStorageManager.save<lista_peliculas>('lista_peliculas_busqueda', { lista: auxNewLista });
    setAlertLista({
    cargarListaTotal:false,
    cargarListaBusqueda:true
  })
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextoBusqueda(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí puedes llamar a la función para cargar la búsqueda al hacer clic en el botón
    //cargarBusqueda(ordenSeleccionado, textoBusqueda);

    let auxNewLista = buscarPeliculasPorNombre((cargarDatosBusqueda()?.lista ?? []), textoBusqueda);
    localStorageManager.save<lista_peliculas>('lista_peliculas_busqueda',{ lista: auxNewLista });
     setAlertLista({
    cargarListaTotal:false,
    cargarListaBusqueda:true
  })
  };

 // const cargarBusqueda = (orden: string, busqueda: string) => {
    //console.log("Función cargarBusqueda llamada con:", { orden }, { busqueda });
  //};

  return (
    <form onSubmit={handleSubmit} className="container_buscador">
      <select className="buscador__select" name="tipo_orden" id="tipo_orden" value={ordenSeleccionado} onChange={handleOrdenChange}>
        <option value="">tipo de orden</option>
        <option value="abc">Alfabético</option>
        <option value="date">Por año</option>
      </select>
      <input
        className="buscador__text"
        type="text"
        required
        placeholder="buscar nombre"
        value={textoBusqueda}
        onChange={handleInputChange}
      />
      <button 
      className="buscador__buttom"
      type="submit">Buscar</button>
    </form>
  );
};

export default Buscador;