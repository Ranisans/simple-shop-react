import React, { PureComponent } from 'react';

import Gallery from '../Gallery';
import PreviewImage from '../PreviewImage';
import styles from './index.module.scss';
// import PropTypes from 'prop-types';

class ProductPage extends PureComponent {
  render() {
    return (
      <div>
        <Gallery galleryClass={styles.gallery} />
        <div>
          <PreviewImage className={styles.previewImage} />
          <div>
            <div>name block</div>
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

export default ProductPage;
