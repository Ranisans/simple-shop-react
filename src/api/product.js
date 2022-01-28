import { Field, Query } from '@tilework/opus';

import { post } from './clientConnection';

export const getProductsByCategoryQuery = (categoryName) => {
  const query = new Query('category')
    .addArgument('input', 'CategoryInput', { title: categoryName })
    .addField(
      new Field('products', true)
        .addFieldList(['id', 'name', 'inStock', 'gallery'])
        .addField(
          new Field('prices', true)
            .addField('amount')
            .addField(
              new Field('currency', true).addFieldList(['label', 'symbol'])
            )
        )
    );

  return query;
};

export const getProductsByCategory = async (categoryName) => {
  const query = getProductsByCategoryQuery(categoryName);

  return post(query);
};

export const getProductById = async (productId) => {
  const query = new Query('product')
    .addArgument('id', 'String!', productId)
    .addFieldList([
      'id',
      'name',
      'inStock',
      'gallery',
      'description',
      'category',
    ])
    .addField(
      new Field('prices', true)
        .addField('amount')
        .addField(new Field('currency', true).addFieldList(['label', 'symbol']))
    )
    .addField(
      new Field('attributes', true)
        .addFieldList(['name', 'type'])
        .addField(new Field('items', true).addFieldList(['id', 'value']))
    );

  return post(query);
};
