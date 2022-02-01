/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes, { number, shape } from 'prop-types';

import ProductNameBlock from 'components/share/ProductNameBlock';
import PriceBlock from 'components/share/PriceBlock';
import CategoryButtonBlock from 'components/share/CategoryButtonsBlock';
import { updateAttributes } from 'store/cartSlice';
import { cartProductFields, productFields } from 'props/productData';
import CartProductCountChanger from 'components/share/CartProductCountChanger';
import ImageCarousel from 'components/share/ImageCarousel';
import styles from './index.module.scss';

class CartProductCard extends PureComponent {
  constructor(props) {
    super(props);

    this.setAttribute = this.setAttribute.bind(this);
  }

  setAttribute(prop) {
    const { products, productIndex } = this.props;

    const { productData } = products[productIndex];
    // eslint-disable-next-line react/destructuring-assignment
    this.props.updateAttributes({
      productData,
      attribute: prop,
    });
  }

  render() {
    const { products, productIndex } = this.props;

    const {
      productData,
      attributes: activeAttributes,
      count,
    } = products[productIndex];
    const { id, name, prices, attributes, gallery } = productData;

    return (
      <div className={styles.root}>
        <div className={styles.leftPart}>
          <div>
            <ProductNameBlock
              text={name}
              className={styles.productName}
              firstNameClass={styles.firstName}
            />
            <PriceBlock prices={prices} className={styles.priceBlock} />
          </div>
          <div className={styles.attributeBlock}>
            {attributes.map((singleAttribute) => (
              <div key={singleAttribute.name}>
                <div className={styles.attributeName}>
                  {singleAttribute.name}
                </div>
                <div className={styles.attributeButtonBlock}>
                  <CategoryButtonBlock
                    attribute={singleAttribute}
                    activeAttributes={activeAttributes}
                    setAttribute={this.setAttribute}
                    styles={{
                      simpleButton: styles.simpleButton,
                      colorButtonSize: styles.colorButtonSize,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.rightPart}>
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

const mapStateToProps = (state) => ({
  products: state.cart.products,
});

const mapDispatchToProps = {
  updateAttributes,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartProductCard);

CartProductCard.propTypes = {
  productIndex: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape(cartProductFields)).isRequired,
  updateAttributes: PropTypes.func.isRequired,
};
