import React from 'react';

type State = { hasError: boolean };

export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error('Unhandled error:', error);
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ padding: 16 }}>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

