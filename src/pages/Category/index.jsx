import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from 'components/share/Spinner';
import ComponentPage from 'components/CategoriesComponents/ComponentPage';
import { getProductsByCategoryQuery } from '../../api/product';
import QueryPostHOC from '../../utils/QueryPostHOC';

class Category extends PureComponent {
  render() {
    const { activeCategory } = this.props;
    if (activeCategory) {
      const query = getProductsByCategoryQuery(activeCategory);

      const CategoryHOC = QueryPostHOC(ComponentPage, query);
      return <CategoryHOC categoryName={activeCategory} />;
    }
    return <Spinner />;
  }
}

const mapStateToProps = (state) => ({
  activeCategory: state.category.activeCategory,
});

export default connect(mapStateToProps)(Category);

Category.propTypes = {
  activeCategory: PropTypes.string.isRequired,
};
