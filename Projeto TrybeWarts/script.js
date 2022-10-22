const botao1 = document.querySelector('.botao-entrar');

function clicbotao() {
  const botao2 = document.querySelector('.email');
  const botao3 = document.querySelector('.senha');
  console.log(botao2.value);
  if (botao2.value === 'tryber@teste.com' && botao3.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}
botao1.addEventListener('click', clicbotao);

clicbotao();

const input = document.querySelector('#agreement');
const botao = document.querySelector('#submit-btn');
const click = input.checked;
botao.disabled = true;

function desabilita() {
  if (click === false) {
    botao.disabled = false;
  } else {
    botao.disabled = true;
  }
}

input.addEventListener('click', desabilita);

const limitetextarea = document.querySelector('#textarea');
console.log(limitetextarea);
limitetextarea.addEventListener('keyup', () => {
  const input2 = limitetextarea.value.length;
  const quantmax = 500;
  const decrementando = document.querySelector('#counter');
  decrementando.innerText = quantmax - input2;
});
