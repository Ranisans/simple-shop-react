import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cartIcon from 'assets/images/cart-icon.svg';
import { connect } from 'react-redux';

import { changeVisibility } from 'store/cartBoxSlice';

class CartIcon extends PureComponent {
  constructor(props) {
    super(props);

    this.cartIconHandler = this.cartIconHandler.bind(this);
  }

  cartIconHandler() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.changeVisibility();
  }

  render() {
    const { cartProductsId, styles } = this.props;

    let cartSize = null;

    if (cartProductsId.length > 9) {
      cartSize = '9+';
    } else if (cartProductsId.length > 0) {
      cartSize = cartProductsId.length;
    }
    return (
      <div
        role="button"
        tabIndex={0}
        className={styles.cartWrapper}
        onKeyPress={this.cartIconHandler}
        onClick={this.cartIconHandler}
      >
        <img src={cartIcon} alt="cart" className={styles.cartIcon} />
        {cartSize && <div className={styles.cartSize}>{cartSize}</div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartProductsId: state.cart.productsId,
});

const mapDispatchToProps = {
  changeVisibility,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

CartIcon.propTypes = {
  cartProductsId: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeVisibility: PropTypes.func.isRequired,
  styles: PropTypes.shape({
    cartWrapper: PropTypes.string,
    cartIcon: PropTypes.string,
    cartSize: PropTypes.string,
  }).isRequired,
};
