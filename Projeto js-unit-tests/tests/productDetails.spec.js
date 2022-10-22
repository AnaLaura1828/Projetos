const productDetails = require('../src/productDetails');
/*
  A função productDetails recebe duas strings que representam nomes de produtos, e retorna um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara')

  // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

  Escreva pelo menos cinco testes para essa função para garantir que a implementação de productDetails está correta.

*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Verifica se a função `productDetails` tem o comportamento esperado', () => {
    expect(typeof productDetails).toBe('function') 
  });
    
    it('verifica se retorna um array', () => {
      expect(typeof productDetails).toEqual[0];
    });
    
    it('verifica se o retorno do array tem dois itens', () => {
     expect(typeof productDetails).toEqual[1,2]
    });
    
    it('verifica se 2 itens do array são objetos', () => {
     expect(typeof productDetails).toEqual[{}]
    });

    it('verifica se os 2 productIds terminam com 123', () => { 
    expect(productDetails(Array.isArray(1,2,3)))
     });
  });

