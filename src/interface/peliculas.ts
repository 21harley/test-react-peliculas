export interface  pelicula  {
    id:number,
    titulo:string,
    fecha:string,
    poster_url:string
}

export interface lista_peliculas {
    lista:pelicula[]
}

export interface imagen_poster{
    url:string,
    width:string
    height:string

}

export interface AlertasListaProps {
  alertLista: {
    cargarListaTotal: boolean;
    cargarListaBusqueda: boolean;
  };
  setAlertLista: React.Dispatch<React.SetStateAction<{
    cargarListaTotal: boolean;
    cargarListaBusqueda: boolean;
  }>>;
}

