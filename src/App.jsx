import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import AlertMessage from 'components/share/AlertMessage';
import Spinner from 'components/share/Spinner';
import Navbar from 'components/NavbarComponents/Navbar';
import CartBoxWrapper from 'components/CartBoxComponents/CartBoxWrapper';
import { loadCategories } from 'store/categorySlice';
import { loadCurrencies } from 'store/currencySlice';
import AppRouter from './AppRoutes';
import styles from './App.module.scss';

class App extends PureComponent {
  componentDidMount() {
    /* eslint-disable react/destructuring-assignment */
    this.props.loadCategories();
    this.props.loadCurrencies();
    /* eslint-enable */
  }

  render() {
    const { activeCategory, activeCurrency, alertMessage } = this.props;
    if (!!activeCategory && !!activeCurrency) {
      return (
        <BrowserRouter>
          <div className={styles.root}>
            <Navbar />
            <div className={styles.secondRow}>
              <div className={styles.secondRowContentWrapper}>
                <AppRouter />
              </div>
              <CartBoxWrapper />
            </div>
            {alertMessage && <AlertMessage />}
          </div>
        </BrowserRouter>
      );
    }

    return <Spinner />;
  }
}

const mapStateToProps = (state) => ({
  activeCategory: state.category.activeCategory,
  activeCurrency: state.currency.activeCurrency,
  alertMessage: state.alertMessage.message,
});

const mapDispatchToProps = {
  loadCategories,
  loadCurrencies,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  activeCategory: PropTypes.string,
  activeCurrency: PropTypes.string,
  alertMessage: PropTypes.string,
  loadCategories: PropTypes.func.isRequired,
  loadCurrencies: PropTypes.func.isRequired,
};

App.defaultProps = {
  activeCategory: undefined,
  activeCurrency: undefined,
  alertMessage: undefined,
};
