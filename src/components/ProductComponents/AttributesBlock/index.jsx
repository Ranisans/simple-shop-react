import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CategoryButtonBlock from 'components/share/CategoryButtonsBlock';
import { setAttribute } from 'store/activeProductSlice';
import classUnion from 'utils/classUnion';
import styles from './index.module.scss';

class AttributesBlock extends PureComponent {
  componentDidMount() {
    const {
      productData: { attributes },
      setAttribute: setCurrentAttribute,
    } = this.props;

    attributes.forEach((element) => {
      setCurrentAttribute({ key: element.name, value: null });
    });
  }

  render() {
    const {
      productData: { attributes },
      className,
      activeAttributes,
      setAttribute: setCurrentAttribute,
    } = this.props;
    return (
      <div className={classUnion(styles.attributesBlock, className)}>
        {attributes.map((attribute) => (
          <div key={attribute.name}>
            <div className={styles.attributeName}>{attribute.name}:</div>
            <div className={styles.attributeButtonWrapper}>
              <CategoryButtonBlock
                attribute={attribute}
                activeAttributes={activeAttributes}
                setAttribute={setCurrentAttribute}
                styles={{
                  simpleButton: styles.simpleButton,
                  colorButtonSize: styles.colorButtonSize,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  productData: state.activeProduct.productData,
  activeAttributes: state.activeProduct.attributes,
});

const mapDispatchToProps = { setAttribute };

export default connect(mapStateToProps, mapDispatchToProps)(AttributesBlock);

AttributesBlock.propTypes = {
  productData: PropTypes.shape({
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
  className: PropTypes.string.isRequired,
  activeAttributes: PropTypes.objectOf(PropTypes.string).isRequired,
  setAttribute: PropTypes.func.isRequired,
};
