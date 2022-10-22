
let myInput = document.querySelector('#texto-tarefa')
let myOl = document.querySelector('#lista-tarefas')
 let myButton = document.querySelector('#criar-tarefa')

function addLi() {
    myButton.addEventListener('click', (event) => {
        let myLi = document.createElement('li')
        myLi.innerText = myInput.value;
        myInput.value = ''
    
    myOl.appendChild(myLi)
})
}
addLi()

function clickColor () {
  let addClick = document.querySelector('#lista-tarefas')  
  addClick.addEventListener('click', (event) => {
      if(document.querySelector(".color") !==null) {
          document.querySelector('.color').classList.remove('color'); 
        }
        event.target.classList.add('color');
  } )
}
clickColor()

function dblclickColor () {
    let myOl2 = document.querySelector('#lista-tarefas')
    myOl2.addEventListener('dblclick', (event) => {
        event.target.classList.toggle('completed'); 
    });
}
dblclickColor()