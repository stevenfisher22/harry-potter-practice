// React Elements
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import {createStore} from 'redux';
import { Provider, connect } from 'react-redux';

// Initial State
const initialState = [
    { 
        id: 0,
        type: 'SALE',
        value: 3.99
    },
    { 
        id: 1,
        type: 'REFUND',
        value: -1.99
    },
    { 
        id: 2,
        type: 'SALE',
        value: 17.49
    }
]

// New Object to Add
const newObject = {
    id: 3,
    type: 'REFUND',
    value: -9.22
}

// Reducer
function reducer(state = initialState, action) {
    switch(action.type) {
        case 'ADD_BEFORE':
            return [
                action.item,
                ...state
            ];
        case 'ADD_AFTER':
            return [
                ...state,
                action.item
            ];
        case 'ADD_MIDDLE':
            return [
                ...state.slice(0, 1),
                action.item,
                ...state.slice(1)
            ];
        case 'REMOVE_SECOND_BY_INDEX':
            return state.filter((item, index) => {
                return index !== action.index
            });
        case 'REMOVE_BY_ID':
            return state.filter((item, index) => {
                return item.id !== action.id
            });
        default:
            return state
    }
};

// Store
const store = createStore(reducer);
// store.dispatch({ type: 'ADD_BEFORE', item: newObject})
// store.dispatch({ type: 'ADD_AFTER', item: newObject})
// store.dispatch({ type: 'ADD_MIDDLE', item: newObject })
// store.dispatch({ type: 'REMOVE_SECOND_BY_INDEX', index: 1 })
store.dispatch({ type: 'REMOVE_BY_ID', id: 0 })

// Main App
const List = ({ items }) => {
    return (
        <main>
            {items.map(item => (
                <div key={item.id}>
                    <div>{item.type}</div>
                    <div>${item.value}</div>
                    <br />
                </div>
            ))}
        </main>
    )
}

// Map State to Props
const mapState = state => ({
    items: state
});

// Connect
const ConnectedList = connect(mapState)(List);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedList />
    </Provider>,
    document.getElementById('root')
);