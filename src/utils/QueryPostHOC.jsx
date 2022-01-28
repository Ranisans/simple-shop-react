import React, { PureComponent } from 'react';

import Spinner from 'components/share/Spinner';
import { post } from 'api/clientConnection';

const QueryPostHOC = (Component, query) =>
  class extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        data: undefined,
        error: false,
      };

      this.controller = new AbortController();
    }

    componentDidMount() {
      this.loadData();
    }

    componentWillUnmount() {
      this.controller.abort();
    }

    async loadData() {
      try {
        const data = await post(query, { signal: this.controller.signal });
        this.setState({
          data,
          error: undefined,
        });
        return true;
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            this.setState({
              data: undefined,
              error,
            });
          }
        } else {
          throw error;
        }
        return false;
      }
    }

    render() {
      const { error, data } = this.state;

      if (error) return <div>ERROR</div>;

      if (data)
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <Component {...data} {...this.props} />;

      return <Spinner />;
    }
  };

export default QueryPostHOC;
