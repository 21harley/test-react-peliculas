import React from "react"
import type { pelicula } from "../../interface/peliculas"
import Poster from "../poster/poster"
const CeldaPelicula: React.FC<pelicula> = ({ poster_url, titulo, fecha }) => {
  return (
    <>
      <div className="celda_pelicula_content">
        <div className="celda_pelicula_content__images_text">
          <Poster url={poster_url} width={"100"} height={"100"}></Poster>
          <div>
            <h3>{titulo}</h3>
            <span>{fecha}</span>
          </div>
        </div>
        <div>
          <button className="celda_pelicula_content__edit">
            ✏️
          </button>
        </div>
      </div>
    </>
  )
}

export default CeldaPelicula
