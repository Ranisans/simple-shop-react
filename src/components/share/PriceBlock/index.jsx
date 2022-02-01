import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { priceFields } from 'props/productData';

class PriceBlock extends PureComponent {
  render() {
    const { prices, className, activeCurrency } = this.props;

    const currencyIndex = prices.findIndex(
      (price) => price.currency.label === activeCurrency
    );

    const { amount, currency } = prices[currencyIndex];

    return (
      <div className={className}>
        <span>{currency.symbol}</span>
        <span>{amount}</span>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  activeCurrency: store.currency.activeCurrency,
});

export default connect(mapStateToProps)(PriceBlock);

PriceBlock.propTypes = {
  prices: PropTypes.arrayOf(PropTypes.shape(priceFields)).isRequired,
  className: PropTypes.string.isRequired,
  activeCurrency: PropTypes.string.isRequired,
};
