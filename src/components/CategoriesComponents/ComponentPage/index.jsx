import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { productFields } from 'props/productData';
import ProductCard from '../ProductCard';
import styles from './index.module.scss';

class ComponentPage extends PureComponent {
  render() {
    const {
      category: { products },
      categoryName,
    } = this.props;
    return (
      <>
        <div className={styles.categoryName}>{categoryName}</div>
        <div className={styles.productCardsWrapper}>
          {products.map((product) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </>
    );
  }
}

export default ComponentPage;

ComponentPage.propTypes = {
  category: PropTypes.shape({
    products: PropTypes.arrayOf(PropTypes.shape(productFields)).isRequired,
  }).isRequired,
  categoryName: PropTypes.string.isRequired,
};
