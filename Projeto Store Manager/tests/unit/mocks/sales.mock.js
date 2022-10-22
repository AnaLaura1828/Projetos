const allSales = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 2,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  }
];

const mockAtualizadaSales = [
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
];

const invaledSale = 'a';

module.exports = {
  allSales,
  mockAtualizadaSales,
  invaledSale,
};