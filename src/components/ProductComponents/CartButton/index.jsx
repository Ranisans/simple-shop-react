import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addItem } from 'store/cartSlice';
import classUnion from 'utils/classUnion';
import styles from './index.module.scss';

class CartButton extends PureComponent {
  constructor(props) {
    super(props);

    this.buttonHandler = this.buttonHandler.bind(this);
  }

  buttonHandler() {
    const { productData, attributes } = this.props;
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
};

export default connect(mapStateToProps, mapDispatchToProps)(CartButton);

CartButton.propTypes = {
  productData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    prices: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        currency: PropTypes.shape({
          label: PropTypes.string.isRequired,
          symbol: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
    inStock: PropTypes.bool.isRequired,
  }).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
  addItem: PropTypes.func.isRequired,
};
