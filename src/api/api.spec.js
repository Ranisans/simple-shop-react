import { getCategoryList } from './category';
import { getAllCurrencies } from './currency';
import { getProductsByCategory, getProductById } from './product';

describe('api tests', () => {
  it('getCategoryList should return correct data', async () => {
    const { categories } = await getCategoryList();

    expect(categories).toHaveLength(3);

    categories.forEach((category) => {
      expect(category).toHaveProperty('name');
    });
  });

  it('getAllCurrencies should return correct data', async () => {
    const { currencies } = await getAllCurrencies();

    expect(currencies).toHaveLength(5);

    currencies.forEach((currency) => {
      expect(currency).toHaveProperty('label');
      expect(currency).toHaveProperty('symbol');
    });
  });

  it('getProductsByCategory should return correct data', async () => {
    const categoryName = 'clothes';
    const { category } = await getProductsByCategory(categoryName);

    expect(category.products.length).toBeGreaterThan(0);

    category.products.forEach((product) => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('inStock');
      expect(product).toHaveProperty('gallery');
      expect(product).toHaveProperty('prices');

      product.prices.forEach((price) => {
        expect(price).toHaveProperty('amount');
        expect(price).toHaveProperty('currency.label');
        expect(price).toHaveProperty('currency.symbol');
      });
    });
  });

  it('getProductById should return correct data', async () => {
    const productId = 'ps-5';
    const { product } = await getProductById(productId);

    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('inStock');
    expect(product).toHaveProperty('gallery');
    expect(product).toHaveProperty('description');
    expect(product).toHaveProperty('category');
    expect(product).toHaveProperty('prices');
    expect(product).toHaveProperty('attributes');

    product.prices.forEach((price) => {
      expect(price).toHaveProperty('amount');
      expect(price).toHaveProperty('currency.label');
      expect(price).toHaveProperty('currency.symbol');
    });

    product.attributes.forEach((attribute) => {
      expect(attribute).toHaveProperty('name');
      expect(attribute).toHaveProperty('type');
      expect(attribute).toHaveProperty('items');

      attribute.items.forEach((item) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('value');
      });
    });
  });
});
