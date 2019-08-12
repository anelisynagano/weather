import React, { Fragment } from 'react';
import City from './City';

const Cities = ({ cities }) => {
    return (
        <Fragment>
            {cities.map(city => <City city={city} key={city} />)}
        </Fragment>
    );
};

export default Cities;
