import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import brandIcon from 'assets/images/brand-icon.svg';
import { MAIN_PAGE } from 'constants/pagesURL';
import Categories from '../Categories';
import CartIcon from '../CartIcon';
import Currency from '../Currency';
import styles from './index.module.scss';

class Navbar extends PureComponent {
  render() {
    return (
      <div className={styles.root}>
        <Categories
          styles={{
            categoryWrapper: styles.categoryWrapper,
            category: styles.category,
            activeCategory: styles.activeCategory,
          }}
        />
        <Link to={MAIN_PAGE}>
          <img src={brandIcon} alt="brand" className={styles.brandIcon} />
        </Link>
        <div className={styles.actionBox}>
          <Currency className={styles.currency} />
          <CartIcon
            styles={{
              cartWrapper: styles.cartWrapper,
              cartIcon: styles.cartIcon,
              cartSize: styles.cartSize,
            }}
          />
        </div>
      </div>
    );
  }
}

export default Navbar;
