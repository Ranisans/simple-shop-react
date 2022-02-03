import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProductNameBlock from 'components/share/ProductNameBlock';
import PriceBlock from 'components/share/PriceBlock';
import CartProductCountChanger from 'components/share/CartProductCountChanger';
import ImageCarousel from 'components/share/ImageCarousel';
import { cartProductFields } from 'props/productData';
import styles from './index.module.scss';

class CartBoxCard extends PureComponent {
  render() {
    const { products, productIndex } = this.props;
    const { productData, count } = products[productIndex];

    const { id, name, prices, gallery } = productData;

    return (
      <div className={styles.root}>
        <div className={styles.leftBox}>
          <ProductNameBlock
            text={name}
            className={styles.productNameBlock}
            firstNameClass={styles.productName}
          />
          <PriceBlock prices={prices} className={styles.priceBlock} />
        </div>
        <div className={styles.rightBox}>
          <CartProductCountChanger
            productId={id}
            number={count}
            styles={{
              wrapperClass: styles.counterWrapper,
              buttonClass: styles.counterButton,
              symbolClass: styles.counterImage,
            }}
          />
          <ImageCarousel
            gallery={gallery}
            imageSize={styles.carouselImageSize}
            arrowsStyle={styles.carouselArrowsStyle}
          />
        </div>
      </div>
    );
  }
}

const mapStatesToProps = (state) => ({
  products: state.cart.products,
});

export default connect(mapStatesToProps)(CartBoxCard);

CartBoxCard.propTypes = {
  productIndex: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape(cartProductFields)).isRequired,
};
