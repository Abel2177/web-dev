import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <section>
          <h2>{this.props.title || "Something went wrong"}</h2>
          <p>
            {this.props.message ||
              "This section failed to load."}
          </p>

          <button
            onClick={() =>
              this.setState({ hasError: false })
            }
          >
            Try Again
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;