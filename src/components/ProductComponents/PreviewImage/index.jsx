import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

class PreviewImage extends PureComponent {
  render() {
    const { className, gallery, inStock, activeImageIndex } = this.props;
    return (
      <div className={styles.root}>
        <img
          src={gallery[activeImageIndex]}
          alt="product"
          className={className}
        />
        {!inStock && <div className={styles.outOfStock}>out of stock</div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeImageIndex: state.activeProduct.activeImageIndex,
  gallery: state.activeProduct.productData.gallery,
  inStock: state.activeProduct.productData.inStock,
});

export default connect(mapStateToProps)(PreviewImage);

PreviewImage.propTypes = {
  className: PropTypes.string.isRequired,
  gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
  inStock: PropTypes.bool.isRequired,
  activeImageIndex: PropTypes.number.isRequired,
};
