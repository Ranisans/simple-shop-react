import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { cartProductFields } from 'props/productData';
import PriceBlock from 'components/share/PriceBlock';
import classUnion from 'utils/classUnion';
import styles from './index.module.scss';

class TotalPrice extends PureComponent {
  calculatePrice() {
    const { products, currencyList } = this.props;
    const priceArray = [];
    for (const currency of currencyList) {
      let currencyAmount = 0;
      for (const singleProduct of products) {
        const {
          productData: { prices },
          count,
        } = singleProduct;

        const currencyIndex = prices.findIndex(
          (price) => price.currency.label === currency.label
        );

        const { amount } = prices[currencyIndex];
        currencyAmount += amount * count;
      }

      const amount = parseFloat(currencyAmount.toFixed(2));

      const currencyObj = { amount, currency };
      priceArray.push(currencyObj);
    }

    return priceArray;
  }

  render() {
    return (
      <div className={classUnion(styles.root)}>
        <span className={styles.total}>total</span>{' '}
        <PriceBlock prices={this.calculatePrice()} className={styles.price} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.cart.products,
  currencyList: state.currency.currencyList,
});

export default connect(mapStateToProps)(TotalPrice);

TotalPrice.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape(cartProductFields)).isRequired,
  currencyList: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
