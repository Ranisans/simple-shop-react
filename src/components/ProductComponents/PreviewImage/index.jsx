import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import inCartIcon from 'assets/images/in-cart-icon.svg';
import classUnion from 'utils/classUnion';
import styles from './index.module.scss';

class PreviewImage extends PureComponent {
  render() {
    const {
      classImageSize,
      gallery,
      inStock,
      activeImageIndex,
      productId,
      productsIdInCart,
    } = this.props;

    const isInCart = productsIdInCart.includes(productId);
    return (
      <div className={classUnion(classImageSize, styles.root)}>
        <img
          src={gallery[activeImageIndex]}
          alt="product"
          className={classUnion(classImageSize, styles.image)}
        />
        {!inStock && <div className={styles.outOfStock}>out of stock</div>}
        {isInCart && (
          <img src={inCartIcon} alt="cart icon" className={styles.cartIcon} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeImageIndex: state.activeProduct.activeImageIndex,
  gallery: state.activeProduct.productData.gallery,
  inStock: state.activeProduct.productData.inStock,
  productId: state.activeProduct.productData.id,
  productsIdInCart: state.cart.productsId,
});

export default connect(mapStateToProps)(PreviewImage);

PreviewImage.propTypes = {
  classImageSize: PropTypes.string.isRequired,
  gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
  inStock: PropTypes.bool.isRequired,
  activeImageIndex: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
  productsIdInCart: PropTypes.arrayOf(PropTypes.string).isRequired,
};
