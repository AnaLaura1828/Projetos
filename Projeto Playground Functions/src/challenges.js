// Desafio 1
function compareTrue(num1, num2) {
  if(num1 === true && num2 === true) {
    return true;
  }else if( num1 === false && num2 === false) {
    return false;
  }else {
    return false;
  }
}
// Desafio 2
function calcArea(base, height) {
  const resultado = (base * height)
  const resultado2 = resultado / 2
  return resultado2
}

// Desafio 3
function splitSentence(string)   {
   let resultado = string
   let resultado1 = resultado.split(" ")
   return resultado1

}

// Desafio 4
function concatName(array) {
  let primeiroNome = array[0];
  let segundoNome = array[array.length -1];
  let retorno = segundoNome + ", " + primeiroNome;
  return retorno;
}

// Desafio 5
function footballPoints(wins, ties) {
  let pontosMarcados =  (wins * 3) + ties 
  return pontosMarcados
};

// Desafio 6
function highestCount(array) {
  let quantidadeSeRepete = -999999;
  let contador = 0;
  for(let index = 0; index < array.length; index +=1) {
    if(array[index] > quantidadeSeRepete) {
      quantidadeSeRepete = array[index];
      contador = 1
    }else if (quantidadeSeRepete === array[index]) {
      contador = contador +1
    }
  }
  return contador;
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  let distancia1 = Math.abs(mouse-cat1)
  let distancia2 = Math.abs(mouse-cat2)
   
    if(distancia1 < distancia2) {
     return  'cat1';
    }else if(distancia2 < distancia1) {
      return 'cat2';
    }else if( distancia1 === distancia2) {
      return "os gatos trombam e o rato foge"
    }
}

// Desafio 8
function fizzBuzz(array) {
  let divididos = [];
  for(let index = 0; index < array.length;index +=1) {
   if(array[index] % 3 === 0 && array[index] % 5 === 0 ) {
    divididos.push("fizzBuzz");
  }else if(array[index] % 5 === 0 ) {
   divididos.push("buzz");
  }else if(array[index] % 3 === 0) {
    divididos.push("fizz")
   }else {
     divididos.push("bug!");
   }
  }
  return divididos;
}
console.log(fizzBuzz([2, 15, 7, 9, 45]))

// Desafio 9
function encode(string) {
  
}
function decode() {
  // seu código aqui
}

// Desafio 10
function techList () {
  // seu código aqui
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
  techList,

};