import React, { Component, ErrorInfo, ReactNode } from "react";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  };

  public state: State = {
    hasError: false
  };

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo })
  };

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <ErrorComponent errorMessage="Whoops! Something went wrong." />
      );
    }

    // Return children components in case of no error

    return this.props.children;
  };
};

export default ErrorBoundary;
