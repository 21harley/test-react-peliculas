import React, { useState } from 'react';
import { StorageManager } from '../../scripts/storageManager';
import type { Pelicula } from '../../types/pelicula';
import type { AlertasListaProps, lista_peliculas } from '../../interface/peliculas';

const FormularioPelicula:React.FC<AlertasListaProps> = ({alertLista, setAlertLista}) => {
  const [pelicula, setPelicula] = useState<Pelicula>({
    id:0,
    title: '',
    createDate: '',
    url: '',
  });

  function esNumero(cadena: string): boolean {
  // Expresión regular para verificar si la cadena contiene solo dígitos (0-9).
  // ^ indica el inicio de la cadena, $ indica el final.
  const regexNumero = /^[0-9]+$/;
  return regexNumero.test(cadena);
}

function esURLImagen(cadena: string): boolean {
  // Expresión regular para verificar si la cadena es una URL que probablemente
  // apunta a una imagen. Considera los protocolos http/https y extensiones comunes
  // de imágenes (jpg, jpeg, png, gif, bmp, webp).
  const regexURLImagen = /^(https?:\/\/).*\.(jpg|jpeg|png|gif|bmp|webp)$/i;
  return regexURLImagen.test(cadena);
}

  const cargarDatosFormulario = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita la recarga de la página

    const formData = new FormData(event.currentTarget);

    if(!esURLImagen(formData.get('url') as string)){
      alert("Error al ingresar la url");
      setPelicula({...pelicula,url:""})
      return;
    }

    if(!esNumero(formData.get('createDate') as string)){
      alert("Error al ingresar el año");
      setPelicula({...pelicula,createDate:""})
      return;
    }

    const nuevaPelicula = {
      id: Date.now(), // or use another unique id generator
      title: formData.get('title') as string,
      createDate: formData.get('createDate') as string,
      url: formData.get('url') as string,
    };
    // Map fields to match 'pelicula' type
    const nuevaPeliculaMapped = {
      id: nuevaPelicula.id,
      titulo: nuevaPelicula.title,
      fecha: nuevaPelicula.createDate,
      poster_url: nuevaPelicula.url,
    };
    const peliculas: lista_peliculas = { lista: [] };
    setPelicula(nuevaPelicula); // Actualiza el estado con los datos del formulario
    ///console.log("Datos de la película:", nuevaPelicula); // Imprime los datos para verificar
    // Puedes hacer algo con el objeto 'newData' aquí, como enviarlo a un servidor

    const localStorageManager = new StorageManager('local');
    let listaPeliculas = localStorageManager.load<lista_peliculas>('lista_peliculas');
    if(listaPeliculas == null){
      peliculas.lista.push(nuevaPeliculaMapped);
      localStorageManager.save<lista_peliculas>('lista_peliculas',peliculas)
    }else{
      listaPeliculas.lista.push(nuevaPeliculaMapped)
      localStorageManager.save<lista_peliculas>('lista_peliculas',listaPeliculas)
    }
     setPelicula(
      {
        id:0,
        title: '',
        createDate: '',
        url: '',
      }
    );
   if(!alertLista.cargarListaTotal) setAlertLista({
    cargarListaTotal:false,
    cargarListaBusqueda:false
  });
   alert("Se a guardado la pelicula");
  };

  return (
    <>
 <form  className="form_agregar_pelicula" action="#" onSubmit={cargarDatosFormulario}>
  <h2>Agrega una pelicula</h2>
        <input
         className='form_agregar_pelicula__input-text'
          type="text"
          name="title" // Usar 'title' para el nombre del campo
          placeholder="Ingrese titulo de la pelicula"
          required
          value={pelicula.title} // Usar 'pelicula.titulo'
          onChange={(e) => setPelicula({ ...pelicula, title: e.target.value })}
        />
        <input
         className='form_agregar_pelicula__input-text'
          type="text"
          name="createDate"  // Usar 'createDate'
          placeholder="Ingrese fecha"
          required
          value={pelicula.createDate} // Usar 'pelicula.fecha'
          onChange={(e) => setPelicula({ ...pelicula, createDate: e.target.value })}
        />
        <input
          className='form_agregar_pelicula__input-text'
          type="text"
          name="url" // Usar 'url'
          placeholder="ingrese url de poster del la pelicula "
          required
          value={pelicula.url} // Usar 'pelicula.poster_url'
          onChange={(e) => setPelicula({ ...pelicula, url: e.target.value })}
        />
        <button 
          className='form_agregar_pelicula__button'
          type="submit"
        >Cargar Pelicula</button>
      </form>
    </>
  );
};

export default FormularioPelicula;