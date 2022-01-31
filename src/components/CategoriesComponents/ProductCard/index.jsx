import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PriceBlock from 'components/share/PriceBlock';
import { PRODUCT_PAGE } from 'constants/pagesURL';
import classUnion from 'utils/classUnion';
import inCartIcon from 'assets/images/in-cart-icon.svg';
import styles from './index.module.scss';

class ProductCard extends PureComponent {
  render() {
    const { id, name, inStock, gallery, prices, productsIdInCart } = this.props;
    const isInCart = productsIdInCart.includes(id);
    return (
      <Link to={`${PRODUCT_PAGE}/${id}`} className={styles.root}>
        <div className={styles.imageWrapper}>
          <img
            src={gallery[0]}
            alt={name}
            loading="lazy"
            className={styles.productImage}
          />
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
        {isInCart && (
          <img src={inCartIcon} alt="cart icon" className={styles.cartIcon} />
        )}
      </Link>
    );
  }
}

const mapStateToProps = (state) => ({
  productsIdInCart: state.cart.productsId,
});

export default connect(mapStateToProps)(ProductCard);

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
  productsIdInCart: PropTypes.arrayOf(PropTypes.string).isRequired,
};
