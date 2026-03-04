import { capitalizar, formatearNumero } from '../utils/format';

describe('utils/format', () => {
  describe('capitalizar', () => {
    test('capitaliza la primera letra de un string', () => {
      expect(capitalizar('pikachu')).toBe('Pikachu');
    });

    test('devuelve string vacío si recibe vacío', () => {
      expect(capitalizar('')).toBe('');
    });

    test('maneja null/undefined devolviendo vacío', () => {
      expect(capitalizar(null)).toBe('');
      expect(capitalizar(undefined)).toBe('');
    });
  });

  describe('formatearNumero', () => {
    test('formatea #001 para id 1', () => {
      expect(formatearNumero(1)).toBe('#001');
    });

    test('formatea #025 para id 25', () => {
      expect(formatearNumero(25)).toBe('#025');
    });

    test('formatea #150 para id 150', () => {
      expect(formatearNumero(150)).toBe('#150');
    });
  });
});
