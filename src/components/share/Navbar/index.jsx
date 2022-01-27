import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setActiveCategory } from 'store/categorySlice';
import { setActiveCurrency } from 'store/currencySlice';

class Navbar extends PureComponent {
  constructor(props) {
    super(props);
    this.currencyHandler = this.currencyHandler.bind(this);
    this.categoryHandler = this.categoryHandler.bind(this);
  }

  currencyHandler(event) {
    const { value } = event.target;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setActiveCurrency(value);
  }

  categoryHandler(event) {
    const { data } = event.target.firstChild;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setActiveCategory(data);
  }

  render() {
    const { currencyList, categoryList, activeCurrency } = this.props;
    return (
      <div>
        <div>
          {categoryList.map((item) => (
            <div
              key={item}
              role="button"
              tabIndex={0}
              onClick={this.categoryHandler}
              onKeyDown={this.categoryHandler}
            >
              {item}
            </div>
          ))}
        </div>
        <div>
          <select onChange={this.currencyHandler} value={activeCurrency}>
            {currencyList.map((item) => (
              <option key={item.label} value={item.label}>
                {item.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyList: state.currency.currencyList,
  activeCurrency: state.currency.activeCurrency,
  categoryList: state.category.categoryList,
});

const mapDispatchToProps = { setActiveCategory, setActiveCurrency };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

Navbar.propTypes = {
  currencyList: PropTypes.arrayOf(PropTypes.shape).isRequired,
  categoryList: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCurrency: PropTypes.string.isRequired,
  setActiveCategory: PropTypes.func.isRequired,
  setActiveCurrency: PropTypes.func.isRequired,
};
