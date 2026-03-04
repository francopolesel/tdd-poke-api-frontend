/**
 * Componente de paginación.
 *
 * Props:
 * - paginaActual: número de la página actual (1-indexed)
 * - totalPaginas: cantidad total de páginas
 * - onCambiarPagina: callback que recibe el nuevo número de página
 */
export default function Pagination({ paginaActual, totalPaginas, onCambiarPagina }) {
  if (totalPaginas <= 1) return null;

  const esPrimera = paginaActual === 1;
  const esUltima = paginaActual === totalPaginas;

  /**
   * Genera el rango de números de página a mostrar,
   * incluyendo elipsis ('…') cuando hay muchas páginas.
   */
  function generarNumeros() {
    const paginas = [];
    const RANGO = 1; // cuántas páginas mostrar a cada lado de la actual

    for (let i = 1; i <= totalPaginas; i++) {
      if (
        i === 1 ||
        i === totalPaginas ||
        (i >= paginaActual - RANGO && i <= paginaActual + RANGO)
      ) {
        paginas.push(i);
      } else if (paginas[paginas.length - 1] !== '…') {
        paginas.push('…');
      }
    }

    return paginas;
  }

  const numeros = generarNumeros();

  return (
    <nav className="pagination" aria-label="Paginación">
      <button
        className="pagination__btn pagination__btn--prev"
        disabled={esPrimera}
        onClick={() => onCambiarPagina(paginaActual - 1)}
      >
        Anterior
      </button>

      <div className="pagination__numeros">
        {numeros.map((num, idx) =>
          num === '…' ? (
            <span key={`ellipsis-${idx}`} className="pagination__ellipsis">
              …
            </span>
          ) : (
            <button
              key={num}
              className={`pagination__numero ${num === paginaActual ? 'pagination__numero--activo' : ''}`}
              onClick={() => onCambiarPagina(num)}
              aria-current={num === paginaActual ? 'page' : undefined}
            >
              {num}
            </button>
          ),
        )}
      </div>

      <span className="pagination__info">Página {paginaActual} de {totalPaginas}</span>

      <button
        className="pagination__btn pagination__btn--next"
        disabled={esUltima}
        onClick={() => onCambiarPagina(paginaActual + 1)}
      >
        Siguiente
      </button>
    </nav>
  );
}
