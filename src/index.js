import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import Game from './game';
import Money from './components/money'

const game = new Game();

// Store
const store = game.store;

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    amount: state.money
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {}
}

// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Money)

ReactDOM.render(
  <Provider store={game.store}>
    <App />
  </Provider>,
  document.getElementById('root')
)