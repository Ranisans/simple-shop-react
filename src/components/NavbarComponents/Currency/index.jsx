import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setActiveCategory } from 'store/categorySlice';
import { setActiveCurrency } from 'store/currencySlice';

class Currency extends PureComponent {
  constructor(props) {
    super(props);
    this.currencyHandler = this.currencyHandler.bind(this);
  }

  currencyHandler(event) {
    const { value } = event.target;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setActiveCurrency(value);
  }

  render() {
    const { activeCurrency, currencyList, className } = this.props;

    return (
      <select
        onChange={this.currencyHandler}
        value={activeCurrency}
        className={className}
      >
        {currencyList.map((item) => (
          <option key={item.label} value={item.label}>
            {item.symbol}
          </option>
        ))}
      </select>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyList: state.currency.currencyList,
  activeCurrency: state.currency.activeCurrency,
});

const mapDispatchToProps = { setActiveCategory, setActiveCurrency };

export default connect(mapStateToProps, mapDispatchToProps)(Currency);

Currency.propTypes = {
  currencyList: PropTypes.arrayOf(PropTypes.shape).isRequired,
  activeCurrency: PropTypes.string.isRequired,
  setActiveCurrency: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};
