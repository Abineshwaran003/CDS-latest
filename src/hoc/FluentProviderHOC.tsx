import React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

function withFluentProvider<T extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<T>
) {
  return function FluentProviderHOC(props: T) {
    return (
      <FluentProvider theme={webLightTheme}>
        <WrappedComponent {...props} />
      </FluentProvider>
    );
  };
}

export default withFluentProvider;
