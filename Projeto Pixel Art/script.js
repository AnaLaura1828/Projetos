let table = document.createElement('div')
table.id ='pixel-board'
let corpo = document.querySelector('body')
let captura = document.querySelector('#color-palette')


let corSelecionada = 'black'
function juncao() {
corpo.appendChild(table)


for(let i = 1; i <=5; i +=1){
    let linha = document.createElement('tr');

    for(let index1 = 1; index1 <=5; index1 +=1) {
        let coluna = document.createElement('td');
        coluna.classList = 'pixel';
        coluna.addEventListener('click', setaCor);
        linha.appendChild(coluna);
    }
    table.appendChild(linha);
} 
}
juncao()


function pegaCor(cor) {
    corSelecionada = cor.style['background-color'];
   let obj =document.querySelector('.selected')
   obj.classList.remove('selected')
    cor.classList.add('selected')

}


function setaCor(event) {
    event.target.style['background-color'] = corSelecionada;
}

let btn = document.getElementById('clear-board');
function allWhite() {
    let pixels = document.getElementsByClassName('pixel');

    for(let i = 0; i < pixels.length; i +=1) {
       pixels[i].style.backgroundColor = 'white';
    }
}


btn.addEventListener("click",(event) => {
    allWhite();
});








