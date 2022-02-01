import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classUnion from 'utils/classUnion';
import carouselArrow from 'assets/images/carousel-arrow.svg';
import styles from './index.module.scss';

class ImageCarousel extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentImageIndex: 0,
      gallerySize: props.gallery.length,
    };

    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
  }

  nextSlide() {
    const { currentImageIndex, gallerySize } = this.state;
    const galleryLastIndex = gallerySize - 1;

    const nextIndex =
      currentImageIndex + 1 > galleryLastIndex ? 0 : currentImageIndex + 1;

    this.setState({
      currentImageIndex: nextIndex,
    });
  }

  previousSlide() {
    const { currentImageIndex, gallerySize } = this.state;

    const galleryLastIndex = gallerySize - 1;

    const nextIndex =
      currentImageIndex - 1 < 0 ? galleryLastIndex : currentImageIndex - 1;

    this.setState({
      currentImageIndex: nextIndex,
    });
  }

  createArrow(rightArrow, callback) {
    const { arrowsStyle } = this.props;
    const { gallerySize } = this.state;

    if (gallerySize <= 1) return null;

    const blockStyle = rightArrow ? styles.rightArrow : styles.leftArrow;
    const currentArrowStyle = rightArrow ? '' : styles.leftArrowImg;

    return (
      <div
        role="button"
        tabIndex={0}
        className={classUnion(styles.arrow, blockStyle)}
        onKeyPress={callback}
        onClick={callback}
      >
        <img
          src={carouselArrow}
          alt="arrow"
          className={classUnion(
            styles.arrowImg,
            currentArrowStyle,
            arrowsStyle
          )}
        />
      </div>
    );
  }

  render() {
    const { gallery, imageSize } = this.props;
    const { currentImageIndex } = this.state;
    return (
      <div className={styles.root}>
        {this.createArrow(false, this.previousSlide)}
        <div
          className={classUnion(styles.imageBlock, imageSize)}
          style={{
            backgroundImage: `url(${gallery[currentImageIndex]})`,
          }}
        />
        {this.createArrow(true, this.nextSlide)}
      </div>
    );
  }
}

export default ImageCarousel;

ImageCarousel.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageSize: PropTypes.string.isRequired,
  arrowsStyle: PropTypes.string.isRequired,
};
