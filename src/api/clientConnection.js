import { client } from '@tilework/opus';

import { URI } from '../constants/api';

client.setEndpoint(URI);

// eslint-disable-next-line import/prefer-default-export
export const post = async (query, params) => {
  const result = await client.post(query, params);

  return result;
};
