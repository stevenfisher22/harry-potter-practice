// React Elements
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// CSS
import './index.css';

class App extends React.Component {
    render() {
        return (
            <div>
                Test
            </div>
        )
    }
}

ReactDOM. render(<App />, document.querySelector('#root'))