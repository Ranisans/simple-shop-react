import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeVisibility } from 'store/cartBoxSlice';
import CartBox from '../CartBox';
import styles from './index.module.scss';

class CartBoxWrapper extends PureComponent {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.changeVisibility();
  }

  render() {
    const { visible } = this.props;
    if (visible)
      return (
        <div
          role="button"
          tabIndex={0}
          onKeyPress={this.clickHandler}
          onClick={this.clickHandler}
          className={styles.root}
        >
          <CartBox />
        </div>
      );
    return null;
  }
}

const mapStateToProps = (state) => ({
  visible: state.cartBox.visible,
});

const mapDispatchToProps = {
  changeVisibility,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartBoxWrapper);

CartBoxWrapper.propTypes = {
  visible: PropTypes.bool.isRequired,
  changeVisibility: PropTypes.func.isRequired,
};
