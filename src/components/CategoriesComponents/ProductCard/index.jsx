import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import PriceBlock from 'components/share/PriceBlock';
import { PRODUCT_PAGE } from 'constants/pagesURL';
import classUnion from 'utils/classUnion';
import styles from './index.module.scss';

class ProductCard extends PureComponent {
  render() {
    const { id, name, inStock, gallery, prices } = this.props;
    return (
      <Link to={`${PRODUCT_PAGE}/${id}`} className={styles.root}>
        <div className={styles.imageWrapper}>
          <img src={gallery[0]} alt={name} loading="lazy" />
          {!inStock && <div className={styles.outOfStock}>out of stock</div>}
        </div>
        <div
          className={classUnion(
            styles.contentBox,
            !inStock && styles.contentBoxOutOfStock
          )}
        >
          <div>{name}</div>
          <PriceBlock prices={prices} className={styles.price} />
        </div>
      </Link>
    );
  }
}

export default ProductCard;

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  inStock: PropTypes.bool.isRequired,
  gallery: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      currency: PropTypes.shape({
        label: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};
