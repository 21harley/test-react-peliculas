import ListaPeliculas from "../../components/lista_peliculas/listaPelicula"
import FormularioPelicula from "../../components/formulario_pelicula/formularioPelicula"
import Buscador from "../../components/buscador/buscador";
import {useState} from "react";
import  "./home.scss"

function Home() {
  const [alertLista,setAlertLista] = useState({
    cargarListaTotal:false,
    cargarListaBusqueda:false
  }); 
  return (
    <>
      <section className="container_home">
         <div className="container_card">
             <div className="cotainer_card_header">
                 <h1>Lista de peliculas.</h1>
                 <Buscador alertLista={alertLista} setAlertLista={setAlertLista}></Buscador>
             </div>
             <div className="container_card_body"> 
                <ListaPeliculas  alertLista={alertLista} setAlertLista={setAlertLista}></ListaPeliculas>
             </div>
             <div className="container_card_footer">
                <FormularioPelicula alertLista={alertLista} setAlertLista={setAlertLista}></FormularioPelicula>
             </div>
         </div>
      </section>
    </>
  )
}

export default Home
