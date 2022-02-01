import { shape, number, string, arrayOf, bool, objectOf } from 'prop-types';

export const priceFields = {
  amount: number,
  currency: shape({
    label: string,
    symbol: string,
  }),
};

export const attributeFields = {
  name: string,
  type: string,
  items: arrayOf(
    shape({
      id: string,
      value: string,
    })
  ),
};

export const productFields = {
  id: string,
  name: string,
  inStock: bool,
  gallery: arrayOf(string),
  description: string,
  prices: arrayOf(shape(priceFields)),
  attributes: arrayOf(shape(attributeFields)),
};

export const cartProductFields = {
  productData: shape(productFields),
  attributes: objectOf(string),
  count: number,
};
