const handlerElephants = require('../src/handlerElephants');

describe('Testes da função HandlerElephants', () => {
  it('Verifica se ao passar o argumento count retorna o numero de elefantes', () => {
    expect(handlerElephants('count')).toBe(4);
  });
  it('Verfica se ao passar o argumento names retorna um array que tenha o nome Jefferso', () => {
    const names = ['Ilana', 'Orval', 'Bea', 'Jefferson'];

    expect(handlerElephants('names')).toEqual(names);
  });
  it('Verfica se ao passar o argumento averageAge retorna um numero proximo', () => {
    expect(handlerElephants('averageAge')).toBe(10.5);
  });
  it('Verfica se ao passar o argumento location retorna uma string NW', () => {
    expect(handlerElephants('location')).toBe('NW');
  });
  it('Verfica se ao passar o argumento popularity retorna um numero igual ou maior que 5', () => {
    expect(handlerElephants('popularity')).toEqual(5);
  });
  it('Verfica se ao passar o argumento availability retorna um array da semana que não contem Monday', () => {
    expect(handlerElephants('availability')).not.toEqual('Monday');
  });
  it('Verifica se é undefined', () => {
    expect(handlerElephants()).toBeUndefined();
  });
  it('Verifica se ao passar o argumento um objeto vazio, retorna uma string', () => {
    expect(handlerElephants({})).toBe('Parâmetro inválido, é necessário uma string');
  });
  it('Verifica se ao passar uma string que não contempla uma funcionalidade deve retornar null', () => {
    expect(handlerElephants('')).toBe(null);
  });
});
