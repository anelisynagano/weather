import React from 'react';
import SingleDay from './SingleDay';

const Fiveday = ({ days }) => {
    return (
        <div className="card">
            {days.map(day => <SingleDay day={day} key={day.dt} />)}
        </div>
    );
};

export default Fiveday;
