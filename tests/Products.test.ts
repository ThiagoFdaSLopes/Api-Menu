import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import IProducts from '../src/Api/Interfaces/IProducts';
import ProductODM from '../src/Database/Models/ProductODM';
import ProductService from '../src/Api/Services/ProductService';
import ClassError from '../src/utils/Error/ClassError';

describe('Testes Products', function () {
  it('Criando um novo Product', async function () {
    // Arrange
    const bodyProduct = {
      categories: ['Bebida'],
      name: '51',
      qty: 10,
      price: 1.50,
    };
    const newProduct: IProducts = {
      id: '634852326b35b59438fbea2f',
      categories: ['Bebida'],
      name: '51',
      qty: 10,
      price: 1.50,
    };
    // Action
    Sinon.stub(Model, 'create').resolves(newProduct);
    const service = new ProductService(new ProductODM());
    const productCreated = await service.createProduct(bodyProduct);
    // Assertion
    expect(productCreated).to.be.deep.equal(newProduct);
  });

  it('Listando Products', async function () {
    // Arrange
    const products = [
      {
        id: '634852326b35b59438fbea2f',
        categories: ['Bebida'],
        name: '51',
        qty: 10,
        price: 1.50,
      },
      {
        id: '634852326b35b59438fbea31',
        categories: ['Pizzas'],
        name: 'Pizza',
        qty: 10,
        price: 56.30,
      },
    ];
    // Action
    Sinon.stub(Model, 'find').resolves(products);
    const service = new ProductService(new ProductODM());
    const productsList = await service.getAllProducts();
    // Assertion
    expect(productsList).to.be.deep.equal(products);
  });

  it('Buscando um product por id', async function () {
    // Arrange
    const product = {
      id: '634852326b35b59438fbea31',
      categories: ['Pizzas'],
      name: 'Pizza Calabresa',
      qty: 10,
      price: 56.30,
    };
    const id = '634852326b35b59438fbea31';
    // Action
    Sinon.stub(Model, 'findById').resolves(product);
    const service = new ProductService(new ProductODM());
    const productFind = await service.getProductById(id);
    // Assertion
    expect(productFind).to.be.deep.equal(product);
  });

  it('Buscando product por id mongodb incorreto', async function () {
    // Arrange
    const id = '5729374598237498578920';
    // Action
    Sinon.stub(Model, 'findById').resolves(null);
    const service = new ProductService(new ProductODM());
    try {
      await service.getProductById(id);
    } catch (error) {
      expect((error as ClassError).message).to.be.deep.equal('Invalid Object identification');
    }
  });

  it('Buscando product por id que nao existe', async function () {
    // Arrange
    const id = '634852326b35b59438fbea2f';
    // Action
    Sinon.stub(Model, 'findById').resolves(null);
    const service = new ProductService(new ProductODM());
    try {
      await service.getProductById(id);
    } catch (error) {
      expect((error as ClassError).message).to.be.deep.equal('Product Id Not Found');
    }
  });

  it('Atualizando um product com id incorreto', async function () {
    // Arrange
    const id = '634852326b35b59438a31';
    const productUpdate = {
      categories: ['Pizzas'],
      name: 'Pizza Calabresa',
      qty: 10,
      price: 56.30,
    };
    // Action
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
    const service = new ProductService(new ProductODM());
    try {
      await service.updateProduct(productUpdate, id);
    } catch (error) {
      // Assertion
      expect((error as ClassError).message).to.be.deep.equal('Invalid Object id');
    }
  });

  it('Atualizando Product com sucesso', async function () {
    // arrange
    const id = '634852326b35b59438fbea2f';
    const product = {
      id: '634852326b35b59438fbea2f',
      categories: ['Pizzas'],
      name: 'Pizza Portuguesa',
      qty: 10,
      price: 56.30,
    };
    const productUpdate = {
      categories: ['Pizzas'],
      name: 'Pizza Portuguesa',
      qty: 10,
      price: 56.30,
    };
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(product);
    const service = new ProductService(new ProductODM());
    
    // act
    const result = await service.updateProduct(productUpdate, id);
    
    // assert
    expect(result).to.be.deep.equal(product);
  });

  afterEach(function () {
    Sinon.restore();
  });
});