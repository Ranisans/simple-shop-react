import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CartBoxCart from '../CartBoxCard';
import styles from './index.module.scss';
import TotalPrice from '../TotalPrice';

class CartBox extends PureComponent {
  render() {
    const { productsId } = this.props;

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
          <button type="button" className={styles.viewBagButton}>
            view bag
          </button>
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

export default connect(mapStateToProps)(CartBox);

CartBox.propTypes = {
  productsId: PropTypes.arrayOf(PropTypes.string).isRequired,
};
