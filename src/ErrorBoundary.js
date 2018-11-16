import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';
import config from './config';
// Sentry.init({
//  dsn: "https://57e7ac57c9fc4907ac5344cd3637aacd@sentry.io/1324455"
// });
// should have been called before using it here
// ideally before even rendering your react app

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    if (this.state.error) {
      // render fallback UI
      return (
        <a
          onClick={() => Sentry.showReportDialog(config.SENTRY_FEEDBACK_CONFIG)}
        >
          Report feedback
        </a>
      );
    }
    // when there's not an error, render children untouched
    return this.props.children;
  }
}

export default ErrorBoundary;
