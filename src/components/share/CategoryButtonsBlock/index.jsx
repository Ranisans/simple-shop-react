// color button has no text label
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classUnion from 'utils/classUnion';
import { COLOR_BUTTON_TYPE } from 'constants/etc';
import innerStyles from './index.module.scss';

class CategoryButtonBlock extends PureComponent {
  constructor(props) {
    super(props);

    this.attributeHandler = this.attributeHandler.bind(this);
  }

  attributeHandler(event) {
    const {
      attribute: { name },
      setAttribute: setThisAttribute,
    } = this.props;
    const value = event.target.getAttribute('value');

    setThisAttribute({ key: name, value });
  }

  generateAttributeButtons() {
    const {
      activeAttributes,
      attribute: { name, type, items },
      styles,
    } = this.props;
    const attributeValue = activeAttributes[name];

    const generateColorButtons = () =>
      items.map((item) => (
        <div
          key={item.id}
          className={classUnion(
            innerStyles.colorButtonWrapper,
            styles.colorButtonSize
          )}
        >
          <button
            type="button"
            value={item.id}
            style={{ backgroundColor: item.value }}
            className={classUnion(innerStyles.button, styles.colorButtonSize)}
            onClick={this.attributeHandler}
          />
          {attributeValue === item.id && (
            <div className={innerStyles.colorButtonSelected}>✓</div>
          )}
        </div>
      ));

    const generateSimpleButton = () =>
      items.map((item) => (
        <button
          key={item.id}
          type="button"
          value={item.id}
          className={classUnion(
            innerStyles.button,
            innerStyles.simpleButton,
            styles.simpleButton,
            attributeValue === item.id && innerStyles.selectedSimpleButton
          )}
          onClick={this.attributeHandler}
        >
          {item.value}
        </button>
      ));

    if (type === COLOR_BUTTON_TYPE) return generateColorButtons();
    return generateSimpleButton();
  }

  render() {
    return <>{this.generateAttributeButtons()}</>;
  }
}

export default CategoryButtonBlock;

CategoryButtonBlock.propTypes = {
  attribute: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  activeAttributes: PropTypes.objectOf(PropTypes.string).isRequired,
  setAttribute: PropTypes.func.isRequired,
  styles: PropTypes.shape({
    simpleButton: PropTypes.string.isRequired,
    colorButtonSize: PropTypes.string.isRequired,
  }).isRequired,
};
