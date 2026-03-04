import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../components/Pagination';

describe('Pagination', () => {
  const defaultProps = {
    paginaActual: 1,
    totalPaginas: 5,
    onCambiarPagina: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('no se renderiza si hay una sola página', () => {
    const { container } = render(
      <Pagination paginaActual={1} totalPaginas={1} onCambiarPagina={jest.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  test('no se renderiza si totalPaginas es 0', () => {
    const { container } = render(
      <Pagination paginaActual={1} totalPaginas={0} onCambiarPagina={jest.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  test('muestra los botones Anterior y Siguiente', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByRole('button', { name: /anterior/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /siguiente/i })).toBeInTheDocument();
  });

  test('muestra la información de página actual', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText(/página 1 de 5/i)).toBeInTheDocument();
  });

  test('el botón Anterior está deshabilitado en la primera página', () => {
    render(<Pagination {...defaultProps} paginaActual={1} />);
    expect(screen.getByRole('button', { name: /anterior/i })).toBeDisabled();
  });

  test('el botón Siguiente está deshabilitado en la última página', () => {
    render(<Pagination {...defaultProps} paginaActual={5} />);
    expect(screen.getByRole('button', { name: /siguiente/i })).toBeDisabled();
  });

  test('ambos botones están habilitados en una página intermedia', () => {
    render(<Pagination {...defaultProps} paginaActual={3} />);
    expect(screen.getByRole('button', { name: /anterior/i })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: /siguiente/i })).not.toBeDisabled();
  });

  test('al hacer clic en Siguiente llama onCambiarPagina con página + 1', () => {
    const onCambiar = jest.fn();
    render(<Pagination paginaActual={2} totalPaginas={5} onCambiarPagina={onCambiar} />);
    fireEvent.click(screen.getByRole('button', { name: /siguiente/i }));
    expect(onCambiar).toHaveBeenCalledWith(3);
  });

  test('al hacer clic en Anterior llama onCambiarPagina con página - 1', () => {
    const onCambiar = jest.fn();
    render(<Pagination paginaActual={3} totalPaginas={5} onCambiarPagina={onCambiar} />);
    fireEvent.click(screen.getByRole('button', { name: /anterior/i }));
    expect(onCambiar).toHaveBeenCalledWith(2);
  });

  test('muestra los números de página como botones', () => {
    render(<Pagination paginaActual={1} totalPaginas={3} onCambiarPagina={jest.fn()} />);
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
  });

  test('el número de página activa tiene la clase activa', () => {
    render(<Pagination paginaActual={2} totalPaginas={3} onCambiarPagina={jest.fn()} />);
    const botonActivo = screen.getByRole('button', { name: '2' });
    expect(botonActivo).toHaveClass('pagination__numero--activo');
  });

  test('al hacer clic en un número de página llama onCambiarPagina', () => {
    const onCambiar = jest.fn();
    render(<Pagination paginaActual={1} totalPaginas={5} onCambiarPagina={onCambiar} />);
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    expect(onCambiar).toHaveBeenCalledWith(2);
  });

  test('con muchas páginas muestra elipsis y limita los números visibles', () => {
    render(<Pagination paginaActual={5} totalPaginas={10} onCambiarPagina={jest.fn()} />);
    // Debe mostrar la primera, la última, y las cercanas a la actual
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
    // Debe haber al menos un indicador de elipsis
    expect(screen.getAllByText('…').length).toBeGreaterThanOrEqual(1);
  });
});
