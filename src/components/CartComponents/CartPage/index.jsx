import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CartProductCard from '../CartProductCard';
import styles from './index.module.scss';

class CartPage extends PureComponent {
  render() {
    const { productsId } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.name}>Cart</div>
        <div className={styles.cartItems}>
          {productsId.map((id, index) => (
            <CartProductCard key={id} productIndex={index} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  productsId: state.cart.productsId,
});

export default connect(mapStateToProps)(CartPage);

CartPage.propTypes = {
  productsId: PropTypes.arrayOf(PropTypes.string).isRequired,
};
