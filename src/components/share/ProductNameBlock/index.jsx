import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ProductNameBlock extends PureComponent {
  render() {
    const { text, className, firstNameClass } = this.props;

    const tmpNameArray = text.split(' ');
    const firstPartName = tmpNameArray.shift();
    const secondPartName = tmpNameArray.join(' ');

    return (
      <div className={className}>
        <div className={firstNameClass}>{firstPartName}</div>
        {secondPartName && <div>{secondPartName}</div>}
      </div>
    );
  }
}

export default ProductNameBlock;

ProductNameBlock.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  firstNameClass: PropTypes.string.isRequired,
};
