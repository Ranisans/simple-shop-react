import { Query } from '@tilework/opus';

import { post } from './clientConnection';

const getCategoryList = async () => {
  const query = new Query('categories', true).addField('name');
  return post(query);
};

// eslint-disable-next-line import/prefer-default-export
export { getCategoryList };
