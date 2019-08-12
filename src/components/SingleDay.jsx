import React from 'react';
import { format } from 'date-fns';

const SingleDay = ({ day }) => {
    const icon = () => {
        if (day.weather[0].description === 'clear sky') {
            return <img src="https://i.imgur.com/QANxsa4.png" alt="" />;
        } if (day.weather[0].description === 'few clouds') {
            return <img src="https://i.imgur.com/JSOSo4F.png" alt="" />;
        } if (day.weather[0].description === 'scattered clouds' || day.weather[0].description === 'broken clouds') {
            return <img src="https://i.imgur.com/pGu1qzJ.png" alt="" />;
        } if (day.weather[0].description === 'shower rain' || day.weather[0].description === 'rain' || day.weather[0].description === 'light rain') {
            return <img src="https://i.imgur.com/CQGlTik.png" alt="" />;
        }
            <img src="https://i.imgur.com/hqYDPbp.png" alt="" />;
    };

    return (
        <div className="singleday">
            <div className="date">
                {format((day.dt_txt), 'ddd D MMM')}
            </div>
            <div>
                {Math.floor(day.main.temp)}
°
            </div>
            <div className="icon">
                {icon()}
            </div>
        </div>
    );
};

export default SingleDay;
