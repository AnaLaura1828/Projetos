const getOpeningHours = require('../src/getOpeningHours');

describe('Testes da função getOpeningHours', () => {
  it('Verfica se não passar argumento retorna um objeto', () => {
    expect(getOpeningHours()).toEqual({ Tuesday: { open: 8, close: 6 },
      Wednesday: { open: 8, close: 6 },
      Thursday: { open: 10, close: 8 },
      Friday: { open: 10, close: 8 },
      Saturday: { open: 8, close: 10 },
      Sunday: { open: 8, close: 8 },
      Monday: { open: 0, close: 0 } });
  });
  it('Verifica se recebe os argumentos Monday e 09:00-AM deve retornar a string `The zoo is closed`', () => {
    expect(getOpeningHours('Monday', '09:00-PM')).toBe('The zoo is closed');
  });
  it('Verifica se recebe os argumentos Tuesday e 09:00-AM deve retornar a string `The zoo is open`', () => {
    expect(getOpeningHours('Tuesday', '09:00-AM')).toBe('The zoo is open');
  });
  it('Verifica se recebe os argumentos Wednesday e 09:00-PM deve retornar a string `The zoo is closed`', () => {
    expect(getOpeningHours('Wednesday', '09:00-PM')).toBe('The zoo is closed');
  });
  // exercicio 12
  it('Verifica se lança uma mensagem para os parametros Thu e 09:00-AM', () => {
    expect(() => getOpeningHours('Thu', '09:00-AM')).toThrow();
    try {
      getOpeningHours('Thu', '09:00-ZM');
    } catch (error) {
      expect(error.message).toBe('The day must be valid. Example: Monday');
    }
  });
  it('Verifica se lança uma mensagem para os parametros Friday e 09:00-ZM', () => {
    expect(() => getOpeningHours('Friday', '09:00-ZM')).toThrow();
    try {
      getOpeningHours('Friday', '09:00-ZM');
    } catch (error) {
      expect(error.message).toBe('The abbreviation must be \'AM\' or \'PM\'');
    }
  });
  it('Verifica se lança uma mensagem para os parametros Satuday e C9:00-AM', () => {
    expect(() => getOpeningHours('Satuday', 'C9:00-AM')).toThrow();
    try {
      getOpeningHours('Saturday', 'C9:00-AM');
    } catch (error) {
      expect(error.message).toBe('The hour should represent a number');
    }
  });
  it('Verifica se lança uma mensagem para os parametros Sunduy e 09:c0-AM', () => {
    expect(() => getOpeningHours('Sunday', '09:c0-AM')).toThrow();
    try {
      getOpeningHours('Sunday', '09:c0-AM');
    } catch (error) {
      expect(error.message).toBe('The minutes should represent a number');
    }
  });
  it('Verifica se lança uma mensagem para os parametros Monday e 13:00-AM', () => {
    expect(() => getOpeningHours('Monday', '13:00-AM')).toThrow();
    try {
      getOpeningHours('Monday', '13:00-AM');
    } catch (error) {
      expect(error.message).toBe('The hour must be between 0 and 12');
    }
  });
  it('Verifica se lança uma mensagem para os parametros Tuesday e 09:60AM', () => {
    expect(() => getOpeningHours('Tuesday', '09:60-AM')).toThrow();
    try {
      getOpeningHours('Tuesday', '09:60-AM');
    } catch (error) {
      expect(error.message).toBe('The minutes must be between 0 and 59');
    }
  });
});
