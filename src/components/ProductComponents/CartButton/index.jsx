import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addItem } from 'store/cartSlice';
import { setAlertMessage } from 'store/alertMessageSlice';
import classUnion from 'utils/classUnion';
import { ADD_PRODUCT_TO_CART } from 'constants/alertMessages';
import { productFields } from 'props/productData';
import styles from './index.module.scss';

class CartButton extends PureComponent {
  constructor(props) {
    super(props);

    this.buttonHandler = this.buttonHandler.bind(this);
  }

  buttonHandler() {
    const { productData, attributes } = this.props;

    const keys = Object.keys(attributes);

    for (const key of keys) {
      if (!attributes[key]) {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.setAlertMessage(ADD_PRODUCT_TO_CART);
        return;
      }
    }

    // eslint-disable-next-line react/destructuring-assignment
    this.props.addItem({ productData, attributes });
  }

  render() {
    const {
      productData: { inStock },
    } = this.props;
    return (
      <button
        type="button"
        disabled={!inStock}
        onClick={this.buttonHandler}
        className={classUnion(styles.button, !inStock && styles.disabledButton)}
      >
        add to cart
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  productData: state.activeProduct.productData,
  attributes: state.activeProduct.attributes,
});

const mapDispatchToProps = {
  addItem,
  setAlertMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartButton);

CartButton.propTypes = {
  productData: PropTypes.shape(productFields).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
  addItem: PropTypes.func.isRequired,
  setAlertMessage: PropTypes.func.isRequired,
};
