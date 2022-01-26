import { Query } from '@tilework/opus';

import { post } from './clientConnection';

const getAllCurrencies = async () => {
  const query = new Query('currencies', true).addFieldList(['label', 'symbol']);

  return post(query);
};

// eslint-disable-next-line import/prefer-default-export
export { getAllCurrencies };
