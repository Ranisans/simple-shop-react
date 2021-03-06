import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProductNameBlock from 'components/share/ProductNameBlock';
import AttributesBlock from 'components/ProductComponents/AttributesBlock';
import PriceBlock from 'components/share/PriceBlock';
import { productFields } from 'props/productData';
import Gallery from '../Gallery';
import PreviewImage from '../PreviewImage';
import CartButton from '../CartButton';
import styles from './index.module.scss';

class ProductPage extends PureComponent {
  render() {
    const {
      productData: { name, prices, description },
    } = this.props;
    return (
      <div className={styles.root}>
        <Gallery galleryClass={styles.gallery} />
        <PreviewImage classImageSize={styles.previewImageSize} />
        <div className={styles.descriptionBlock}>
          <ProductNameBlock
            text={name}
            className={styles.nameBlock}
            firstNameClass={styles.firstName}
          />
          <AttributesBlock className={styles.attributeBlock} />
          <div className={styles.priceBlock}>
            <div className={styles.priceLabel}>price:</div>
            <PriceBlock className={styles.price} prices={prices} />
          </div>

          <CartButton />

          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: description }}
          />
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
  productData: PropTypes.shape(productFields).isRequired,
};
