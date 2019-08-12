import React from 'react';

const CurrentDay = ({ temp, city }) => {
    return (
        <div className="current">
            <div className="city">
                {city}
            </div>
            {/* math.floor returns the largest integer less than or equal to a given number  */}
            <div className="temp">
                {Math.floor(temp.temp)}
°C
            </div>
            <div>
                Max:
                {' '}
                {Math.floor(temp.temp_max)}
°C |
                {' '}
                Min:
                {' '}
                {Math.floor(temp.temp_min)}
°C
            </div>
        </div>
    );
};

export default CurrentDay;
