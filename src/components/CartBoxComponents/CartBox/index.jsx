import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CART_PAGE } from 'constants/pagesURL';
import { changeVisibility } from 'store/cartBoxSlice';
import CartBoxCart from '../CartBoxCard';
import styles from './index.module.scss';
import TotalPrice from '../TotalPrice';

class CartBox extends PureComponent {
  render() {
    const { productsId, changeVisibility: hideCartBox } = this.props;

    const clickHandler = (event) => {
      event.stopPropagation();
    };

    const wordItem = productsId.length > 1 ? 'items' : 'item';

    return (
      <div
        role="button"
        tabIndex={0}
        onKeyPress={clickHandler}
        onClick={clickHandler}
        className={styles.root}
      >
        <div className={styles.title}>
          <span className={styles.bagTitle}>My bag,</span> {productsId.length}{' '}
          {wordItem}
        </div>
        <div className={styles.itemsContainer}>
          {productsId.map((singleProductId, index) => (
            <CartBoxCart key={singleProductId} productIndex={index} />
          ))}
        </div>
        <TotalPrice />
        <div className={styles.buttonContainer}>
          <Link to={CART_PAGE}>
            <button
              type="button"
              onClick={hideCartBox}
              className={styles.viewBagButton}
            >
              view bag
            </button>
          </Link>
          <button type="button" className={styles.checkOutButton}>
            check out
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  productsId: state.cart.productsId,
});

const mapDispatchToProps = {
  changeVisibility,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartBox);

CartBox.propTypes = {
  productsId: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeVisibility: PropTypes.func.isRequired,
};
