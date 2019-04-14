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
const initialState = {
    selectedHouse: null,
    houses: {
        0: {
            id: 0,
            name: 'Gryffindor',
            image: flags.gryffindor,
            points: 50
        },
        1: {
            id: 1,
            name: 'Ravenclaw',
            image: flags.ravenclaw,
            points: 100
        },
        2: {
            id: 2,
            name: 'Hufflepuff',
            image: flags.hufflepuff,
            points: 50
        },
        // one is missing
    }
}

// Slytherin House object
const slytherin = {
    id: 3, 
    name: 'Slytherin',
    image: flags.slytherin,
    points: 0
}

// Reducer
function reducer(state = initialState, action) {
    switch(action.type) {
        case 'SELECT_HOUSE':
            return {
                ...state,
                selectedHouse: action.house.id
            };
        case 'ADD_POINTS':
            return {
                ...state,
                houses: {
                    ...state.houses,
                    [action.house.id]: {
                        ...state.houses[action.house.id],
                        points: state.houses[action.house.id].points + action.points
                    }
                }
            }
        default: 
            return state;
    }
}

// Store
const store = createStore(reducer);

// OnClick Handler Function
function selectHouse(house) {
    return {
        type: 'SELECT_HOUSE',
        house
    }
};

function addPoints(house, points) {
    return {
        type: 'ADD_POINTS',
        house, 
        points
    }
}

// Main App
const SchoolAdmin = ({ houses, selectedHouse, selectHouse, addPoints }) => {
    return (
        <main>
            {houses.map(house => (
                <div 
                    key={house.id}
                    onClick={() => selectHouse(house)}
                    onDoubleClick={() => addPoints(house, 50)}
                    className={house.id === selectedHouse
                        ? `selected ${house.name}` 
                        : ''}
                >
                    <img src={house.image} alt={house.name}/>
                    <div>{house.points} points</div>
                </div>
            ))}
        </main>
    )
}

// Map State to Props
const mapState = state => ({
    houses: Object.values(state.houses),
    selectedHouse: state.selectedHouse
});

const ConnectedApp = connect(mapState, { selectHouse, addPoints })(SchoolAdmin);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>, 
    document.querySelector('#root')
);