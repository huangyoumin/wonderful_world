import { Component } from 'react'

function connect(mapStateToProps, mapDispatchToProps) {
  return function(WrappedComponent) {
    class Connect extends Component {
      constructor(props, context) {
        this.store = context.store
      }

      componentDidMount() {
        this.store.subscribe(this.hasChanged)
      }

      hasChanged() {
        this.forceUpdate()
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            {...mapStateToProps(this.store.getState(), this.props)}
            {...mapDispatchToProps(this.store.dispatch, this.props)}
          />
        )
      }

    }
    return Connect
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}