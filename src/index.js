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

// Reducer
function reducer(state = initialState, action) {
    switch(action.type) {
        default: 
            return state
    }
}

// Store
const store = createStore(reducer);

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