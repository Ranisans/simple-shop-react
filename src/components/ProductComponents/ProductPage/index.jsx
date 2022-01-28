import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProductNameBlock from 'components/share/ProductNameBlock';
import Gallery from '../Gallery';
import PreviewImage from '../PreviewImage';
import styles from './index.module.scss';

class ProductPage extends PureComponent {
  render() {
    const {
      productData: { name },
    } = this.props;
    return (
      <div>
        <Gallery galleryClass={styles.gallery} />
        <div>
          <PreviewImage className={styles.previewImage} />
          <div>
            <ProductNameBlock
              text={name}
              className={styles.nameBlock}
              firstNameClass={styles.firstName}
            />
            <div>attributes block</div>
            <div>price block</div>
            <div>add to cart button</div>
            <div>description</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  productData: state.activeProduct.productData,
});

export default connect(mapStateToProps)(ProductPage);

ProductPage.propTypes = {
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
    attributes: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
          }).isRequired
        ).isRequired,
      })
    ),
  }).isRequired,
};
