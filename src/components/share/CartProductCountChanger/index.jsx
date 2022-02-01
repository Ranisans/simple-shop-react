import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { increaseItem, decreaseItem } from 'store/cartSlice';
import classUnion from 'utils/classUnion';
import minusImage from 'assets/images/minus-icon.svg';
import plusImage from 'assets/images/plus-icon.svg';
import styles from './index.module.scss';

class CartProductCountChanger extends PureComponent {
  constructor(props) {
    super(props);

    this.increaseItem = this.increaseItem.bind(this);
    this.decreaseItem = this.decreaseItem.bind(this);
  }

  increaseItem() {
    const { productId } = this.props;

    // eslint-disable-next-line react/destructuring-assignment
    this.props.increaseItem({ productData: { id: productId } });
  }

  decreaseItem() {
    const { productId } = this.props;

    // eslint-disable-next-line react/destructuring-assignment
    this.props.decreaseItem({ productData: { id: productId } });
  }

  render() {
    const {
      number,
      styles: { wrapperClass, buttonClass, symbolClass },
    } = this.props;
    return (
      <div className={wrapperClass}>
        <button
          type="button"
          className={classUnion(buttonClass, styles.button)}
          onClick={this.increaseItem}
        >
          <img src={plusImage} alt="+" className={symbolClass} />
        </button>
        <div>{number}</div>
        <button
          type="button"
          className={classUnion(buttonClass, styles.button)}
          onClick={this.decreaseItem}
        >
          <img src={minusImage} alt="-" className={symbolClass} />
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = { increaseItem, decreaseItem };

export default connect(null, mapDispatchToProps)(CartProductCountChanger);

CartProductCountChanger.propTypes = {
  productId: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  increaseItem: PropTypes.func.isRequired,
  decreaseItem: PropTypes.func.isRequired,
  styles: PropTypes.shape({
    wrapperClass: PropTypes.string.isRequired,
    buttonClass: PropTypes.string.isRequired,
    symbolClass: PropTypes.string.isRequired,
  }).isRequired,
};
