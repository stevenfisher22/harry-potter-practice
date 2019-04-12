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
            });
        case 'REMOVE_HOUSE_BY_INDEX':
            return state.filter((item, index) => {
                return index !== action.index
            });
        case 'ADD_POINTS':
            return state.map((item, index) => {
                if (item === action.house) {
                    return {
                        ...action.house,
                        points: action.house.points + action.points
                    }
                } else {
                    return item;
                }
            });
        default: 
            return state;
    }
}

// Store
const store = createStore(reducer);
store.dispatch({ type: 'ADD_HOUSE_MIDDLE_SPLICE', house: slytherin });
// store.dispatch({ type: 'REMOVE_HOUSE_BY_NAME', name: 'Slytherin'})
// store.dispatch({ type: 'REMOVE_HOUSE_BY_INDEX', index: 2})

// OnClick Handler Function
function addPoints(house, points) {
    return {
        type: 'ADD_POINTS',
        house, 
        points
    }
}

// Main App
const SchoolAdmin = ({ houses, addPoints }) => {
    return (
        <main>
            {houses.map(house => (
                <div key={house.id} onClick={() => addPoints(house, 50)}>
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

// Map Dispatch to Props
const mapDispatch = {
    addPoints
}

const ConnectedApp = connect(mapState, mapDispatch)(SchoolAdmin);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>, 
    document.querySelector('#root')
);