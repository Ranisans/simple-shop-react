import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setActiveCategory } from 'store/categorySlice';
import { setActiveCurrency } from 'store/currencySlice';
import brandIcon from 'assets/images/brand-icon.svg';
import cartIcon from 'assets/images/cart-icon.svg';
import classUnion from 'utils/classUnion';
import { MAIN_PAGE } from 'constants/pagesURL';
import styles from './index.module.scss';

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
    const {
      currencyList,
      categoryList,
      activeCurrency,
      activeCategory,
      cartProductsId,
    } = this.props;

    let cartSize = null;

    if (cartProductsId.length > 9) {
      cartSize = '9+';
    } else if (cartProductsId.length > 0) {
      cartSize = cartProductsId.length;
    }

    return (
      <div className={styles.root}>
        <div className={styles.categoryWrapper}>
          {categoryList.map((item) => (
            <div
              key={item}
              role="button"
              tabIndex={0}
              className={classUnion(
                styles.category,
                activeCategory === item && styles.activeCategory
              )}
              onClick={this.categoryHandler}
              onKeyDown={this.categoryHandler}
            >
              {item}
            </div>
          ))}
        </div>
        <Link to={MAIN_PAGE}>
          <img src={brandIcon} alt="brand" className={styles.brandIcon} />
        </Link>
        <div className={styles.actionBox}>
          <select
            onChange={this.currencyHandler}
            value={activeCurrency}
            className={styles.currency}
          >
            {currencyList.map((item) => (
              <option key={item.label} value={item.label}>
                {item.symbol}
              </option>
            ))}
          </select>
          <div className={styles.cartWrapper}>
            <img src={cartIcon} alt="cart" className={styles.cartIcon} />
            {cartSize && <div className={styles.cartSize}>{cartSize}</div>}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyList: state.currency.currencyList,
  activeCurrency: state.currency.activeCurrency,
  categoryList: state.category.categoryList,
  activeCategory: state.category.activeCategory,
  cartProductsId: state.cart.productsId,
});

const mapDispatchToProps = { setActiveCategory, setActiveCurrency };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

Navbar.propTypes = {
  currencyList: PropTypes.arrayOf(PropTypes.shape).isRequired,
  categoryList: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired,
  activeCurrency: PropTypes.string.isRequired,
  setActiveCategory: PropTypes.func.isRequired,
  setActiveCurrency: PropTypes.func.isRequired,
  cartProductsId: PropTypes.arrayOf(PropTypes.string).isRequired,
};
