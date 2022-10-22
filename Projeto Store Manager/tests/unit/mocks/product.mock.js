const mockProducts = [
  {
    "id": 1,
    "name": "Martelo de Thor",
  },
  {
    "id": 2,
    "name": "Traje de encolhimento",

  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];

const invaled = 'd';

const returnService = {
  status: 200,
  message: mockProducts[0]
}

const newProduct = {
    "name": "Armadura Homem de ferro"
}

const mockAtualizada = [
  {
    "id": 2,
    "name": "Martelo do Capitão"
  }
]

const mockEspefifica = [
  {
    "id": 1,
    "name": "Traje de encolhimento"
  },
  {
    "id": 2,
    "name": "Traje"
  },
  {
    "id": 3,
    "name": "Traje de ferro"
  }
]

module.exports = {
  invaled,
  mockProducts,
  returnService,
  newProduct,
  mockAtualizada,
  mockEspefifica,
}