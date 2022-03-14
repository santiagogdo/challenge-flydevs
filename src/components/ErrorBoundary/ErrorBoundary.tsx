import { type NextRouter, withRouter } from "next/router";
import React, { Component, type ErrorInfo, type ReactNode } from "react";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

interface ErrorBoundaryProps {
  children: ReactNode;
  router: NextRouter;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  };

  public state: State = {
    hasError: false
  };

  static getDerivedStateFromError(): State {
    return { hasError: true }
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo })
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorComponent errorMessage="Whoops! Something went wrong." onGoBack={() => {
          this.setState({ hasError: false });
          this.props.router.back();
        }} />
      );
    }

    return this.props.children;
  };
};

export default withRouter(ErrorBoundary)