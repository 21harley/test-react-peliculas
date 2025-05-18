import React from "react"
import  type { imagen_poster} from "../../interface/peliculas"

const Poster:React.FC<imagen_poster> = ({url,width,height})=>{
    return (
         url ? (
          <svg width={width} height={height}>
            <image href={url} x="0" y="0" width={width} height={height} />
          </svg>
          ) :(
            <div>
            <div className="loading"></div>
            <p>cargarndo ...</p>
            </div>
          ) 
    )
}

export default Poster;