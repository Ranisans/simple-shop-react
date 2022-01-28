import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setActiveImageIndex } from 'store/activeProductSlice';
import classUnion from 'utils/classUnion';
import styles from './index.module.scss';

class Gallery extends PureComponent {
  constructor(props) {
    super(props);

    this.imageHandler = this.imageHandler.bind(this);
  }

  imageHandler(event) {
    const { target } = event;
    const value = target.getAttribute('value');
    if (value) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.setActiveImageIndex(parseInt(value, 10));
    }
  }

  render() {
    const { gallery, activeImageIndex, galleryClass } = this.props;
    return (
      <div className={classUnion(styles.root, galleryClass)}>
        {gallery.map((item, index) => (
          <div
            key={item}
            role="button"
            tabIndex={0}
            onClick={this.imageHandler}
            onKeyDown={this.imageHandler}
            className={classUnion(
              styles.imageWrapper,
              activeImageIndex === index && styles.activeImageWrapper
            )}
          >
            <img
              src={item}
              alt="product"
              loading="lazy"
              value={index}
              className={styles.image}
            />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeImageIndex: state.activeProduct.activeImageIndex,
  gallery: state.activeProduct.productData.gallery,
});

const mapDispatchToProps = { setActiveImageIndex };

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);

Gallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeImageIndex: PropTypes.number.isRequired,
  setActiveImageIndex: PropTypes.func.isRequired,
  galleryClass: PropTypes.string.isRequired,
};
