import React, { PureComponent, Suspense } from 'react';
import ColourSpinner from './ColourSpinner';

function LazyLoader(WrappedComponent) {
  return class Wrapped extends PureComponent {
    render() {
      return (
        <Suspense fallback={<ColourSpinner />}>
          <WrappedComponent {...this.props} />
        </Suspense>
      )
    }
  }
}

export default LazyLoader;