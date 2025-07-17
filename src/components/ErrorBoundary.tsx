import { Component } from "react"

class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any, info: any) {
    console.error("Error caught by boundary:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="h-screen w-screen grid place-content-center">
          <h2 className="text-lavender">Ups! Something went wrong.</h2>
        </section>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
