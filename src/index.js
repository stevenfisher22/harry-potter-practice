// React Elements
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// Components
import flags from './flags';

// CSS
import './index.css';

// *****************************************************************************************

// Initial State
const initialState = [
    {
        id: 0,
        name: 'Gryffindor',
        image: flags.gryffindor,
        points: 50
    },
    {
        id: 1,
        name: 'Ravenclaw',
        image: flags.ravenclaw,
        points: 100
    },
    {
        id: 2,
        name: 'Hufflepuff',
        image: flags.hufflepuff,
        points: 50
    },
    // one is missing
];

const slytherin = {
    id: 3, 
    name: 'Slytherin',
    image: flags.slytherin,
    points: 0
}

// Reducer
function reducer(state = initialState, action) {
    switch(action.type) {
        case 'ADD_HOUSE_BEFORE':
            return [
                action.house,
                ...state
            ];
        case 'ADD_HOUSE_AFTER':
            return [
                ...state,
                action.house
            ];
        case 'ADD_HOUSE_MIDDLE_SLICE':
            return [
                ...state.slice(0, 2),
                action.house,
                ...state.slice(2)
            ];
        case 'ADD_HOUSE_MIDDLE_SPLICE':
            const copy = [...state];
            copy.splice(2, 0, action.house)
            return copy;
        case 'REMOVE_HOUSE_BY_NAME':
            return state.filter((item, index) => {
                return item.name !== action.name
                // Another way to write it
                // if(item.name === action.name) {
                //     return false;
                // } else {
                //     return true
                // };
            })
        case 'REMOVE_HOUSE_BY_INDEX':
            return state.filter((item, index) => {
                return index !== action.index
            })
        default: 
            return state;
    }
}

// Store
const store = createStore(reducer);
store.dispatch({ type: 'ADD_HOUSE_MIDDLE_SPLICE', house: slytherin });
// store.dispatch({ type: 'REMOVE_HOUSE_BY_NAME', name: 'Slytherin'})
// store.dispatch({ type: 'REMOVE_HOUSE_BY_INDEX', index: 2})

// Main App
const SchoolAdmin = ({ houses }) => {
    return (
        <main>
            {houses.map(house => (
                <div key={house.id}>
                    <img src={house.image} alt={house.name}/>
                    <div>{house.points} points</div>
                </div>
            ))}
        </main>
    )
}

// Map State to Props
const mapState = state => ({
    houses: state
});

const ConnectedApp = connect(mapState)(SchoolAdmin);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>, 
    document.querySelector('#root')
);