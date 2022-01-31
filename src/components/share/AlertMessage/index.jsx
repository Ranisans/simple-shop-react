import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { resetAlertMessage } from 'store/alertMessageSlice';
import styles from './index.module.scss';

class AlertMessage extends PureComponent {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.resetAlertMessage();
  }

  render() {
    const { alertMessage } = this.props;
    return (
      <div
        role="button"
        tabIndex="0"
        onClick={this.clickHandler}
        onKeyDown={this.clickHandler}
        className={styles.root}
      >
        <p>{alertMessage}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  alertMessage: state.alertMessage.message,
});

const mapDispatchToProps = {
  resetAlertMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertMessage);

AlertMessage.propTypes = {
  alertMessage: PropTypes.string.isRequired,
  resetAlertMessage: PropTypes.func.isRequired,
};
