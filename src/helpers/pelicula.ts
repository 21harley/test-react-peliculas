import type { pelicula } from "../interface/peliculas";

// Función para ordenar un array de películas por año de creación (ascendente)
export const ordenarPorAnioCreacion = (peliculas: pelicula[]): pelicula[] => {
  return [...peliculas].sort((a, b) => {
    // Convertimos los años a números para una comparación numérica.
    const anioA = parseInt(a.fecha, 10);
    const anioB = parseInt(b.fecha, 10);

    if (anioA < anioB) {
      return -1;
    }
    if (anioA > anioB) {
      return 1;
    }
    return 0;
  });
};

// Función para ordenar un array de películas por nombre de película (alfabéticamente)
// (Esta función se mantiene igual ya que la lógica de ordenamiento por nombre no depende de la fecha)
export const ordenarPorNombrePelicula = (peliculas: pelicula[]): pelicula[] => {
  return [...peliculas].sort((a, b) => {
    const tituloA = a.titulo.toLowerCase();
    const tituloB = b.titulo.toLowerCase();
    if (tituloA < tituloB) {
      return -1;
    }
    if (tituloA > tituloB) {
      return 1;
    }
    return 0;
  });
};

export const buscarPeliculasPorNombre = (peliculas: pelicula[], terminoBusqueda: string): pelicula[] => {
  if (!terminoBusqueda) {
    return peliculas; // Si no hay término de búsqueda, devolvemos todas las películas
  }

  const terminoNormalizado = terminoBusqueda.toLowerCase();

  return peliculas.filter((pelicula) => {
    const tituloNormalizado = pelicula.titulo.toLowerCase();
    return tituloNormalizado.includes(terminoNormalizado);
  });
};