import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setActiveCategory } from 'store/categorySlice';
import classUnion from 'utils/classUnion';

class Categories extends PureComponent {
  constructor(props) {
    super(props);

    this.categoryHandler = this.categoryHandler.bind(this);
  }

  categoryHandler(event) {
    const { data } = event.target.firstChild;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setActiveCategory(data);
  }

  render() {
    const { categoryList, activeCategory, styles } = this.props;
    return (
      <div className={styles.categoryWrapper}>
        {categoryList.map((item) => (
          <div
            key={item}
            role="button"
            tabIndex={0}
            className={classUnion(
              styles.category,
              activeCategory === item && styles.activeCategory
            )}
            onClick={this.categoryHandler}
            onKeyDown={this.categoryHandler}
          >
            {item}
          </div>
        ))}
      </div>
    );
  }
}

const mapSatesToProps = (state) => ({
  categoryList: state.category.categoryList,
  activeCategory: state.category.activeCategory,
});

const mapDispatchToProps = { setActiveCategory };

export default connect(mapSatesToProps, mapDispatchToProps)(Categories);

Categories.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired,
  setActiveCategory: PropTypes.func.isRequired,
  styles: PropTypes.shape({
    categoryWrapper: PropTypes.string,
    category: PropTypes.string,
    activeCategory: PropTypes.string,
  }).isRequired,
};
