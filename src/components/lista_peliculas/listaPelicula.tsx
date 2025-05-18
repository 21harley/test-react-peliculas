import React, { useEffect, useState } from "react";
import type { AlertasListaProps, lista_peliculas } from "../../interface/peliculas";
import CeldaPelicula from "../celda_pelicula/celdaPelicula";
import { StorageManager } from "../../scripts/storageManager";

const ListaPeliculas: React.FC<AlertasListaProps> = ({  alertLista, setAlertLista }) => {
    const localStorageManager = new StorageManager('local');
    const [peliculas, setPeliculas] = useState<lista_peliculas>({ lista: [] });

    const cargarDatosTotal =  ()=>{
        //console.log("Caragar Total");
        const loadedPeliculas =  localStorageManager.load<lista_peliculas>('lista_peliculas');

        setPeliculas(loadedPeliculas ?? { lista: [] });

        setAlertLista({
            cargarListaTotal: false,
            cargarListaBusqueda: false
        });
    }

    const cargarDatosBusqueda =  ()=>{
       // console.log("Cargar Busqueda");
        const loadedPeliculas =  localStorageManager.load<lista_peliculas>('lista_peliculas_busqueda');

        setPeliculas(loadedPeliculas ?? { lista: [] });

        setAlertLista({
            cargarListaTotal: false,
            cargarListaBusqueda: false
        });
    }

    useEffect(()=>{
        cargarDatosTotal();
    },[]);

    useEffect(()=>{
        //console.log("Cambios", alertLista);
        if(alertLista.cargarListaTotal) cargarDatosTotal();
        if(alertLista.cargarListaBusqueda)  cargarDatosBusqueda();
    },[alertLista.cargarListaTotal, alertLista.cargarListaBusqueda]);

    return (
        <>
        <ul className="lista_peliculas_ul">
            {
                peliculas.lista.length > 0
                ? (
                    peliculas.lista.map((el) => (
                        <li className="lista_peliculas_li" key={el.id}><CeldaPelicula {...el} ></CeldaPelicula></li>
                    ))
                )
                : (
                    <div>No sea cargado pelicula</div>
                )
            }
        </ul>
        </>
    );
}

export default ListaPeliculas;