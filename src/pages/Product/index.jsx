import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadProductData } from 'store/activeProductSlice';
import withRouter from 'utils/withRouter';
import { SUCCEEDED, FAILED } from 'constants/thunkStatus';
import ProductPage from 'components/ProductComponents/ProductPage';
import Spinner from 'components/share/Spinner';

class Product extends PureComponent {
  componentDidMount() {
    const {
      router: {
        params: { productId },
      },
    } = this.props;

    // eslint-disable-next-line react/destructuring-assignment
    this.props.loadProductData(productId);
  }

  render() {
    const { status } = this.props;
    switch (status) {
      case FAILED:
        return <div>Error</div>;
      case SUCCEEDED:
        return <ProductPage />;
      default:
        return <Spinner />;
    }
  }
}

const mapStateToProps = (state) => ({
  status: state.activeProduct.status,
});

const mapDispatchToProps = { loadProductData };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Product));

Product.propTypes = {
  status: PropTypes.string.isRequired,
  loadProductData: PropTypes.func.isRequired,
  router: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
