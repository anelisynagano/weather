import React, { Component, Fragment } from 'react';
import CurrentDay from './CurrentDay';
import FiveDay from './FiveDay';
import Search from './Search';
import Cities from './Cities';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: '',
            lon: '',
            temp: {},
            city: '',
            days: [],
            cities: [],
            temperature: [],
        };
    }

    componentDidMount = () => {
        this.getCurrentLocation();
        this.getFiveDay();
        // this.getSearchLocation();
    }

    getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });
            const { lat, lon } = this.state;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=00b3a5ed16ed1463a44332935c9a8806&units=metric`)
                .then(response => response.json())
                .then((data) => {
                    this.setState({
                        temp: data.main,
                        city: data.name,
                    });
                });
        });
    }

    getFiveDay = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });
            const { lat, lon } = this.state;
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=00b3a5ed16ed1463a44332935c9a8806&units=metric`)
                .then(res => res.json())
                .then((data) => {
                    // filtering for only readings at the same time of day
                    const dailyData = data.list.filter((reading) => {
                        return reading.dt_txt.includes("18:00:00");
                    });
                    this.setState({
                        days: dailyData,
                    });
                });
        });
    }

    onSearchLocation = (text) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=00b3a5ed16ed1463a44332935c9a8806&units=metric`)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    temp: data.main,
                    city: data.name,
                });
            });
        // add city only once
        const { cities, city } = this.state;
        if (cities.includes(city)) {
            return;
        }
        this.setState((state) => {
            // console.log('state', state);
            return ({
                // spread operator, so previous searched city remains in the screen
                cities: [...state.cities, ...state.temperature, state.city, state.temp.temp],
                // temperature: [...state.temperature, state.temp.temp]
            });
        });
    }

    onSearchFiveDays = (text) => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${text}&appid=00b3a5ed16ed1463a44332935c9a8806&units=metric`)
            .then(res => res.json())
            .then((data) => {
                // filtering for only readings at the same time of day
                const dailyData = data.list.filter((reading) => {
                    return reading.dt_txt.includes("18:00:00");
                });
                this.setState({
                    days: dailyData,
                });
            });
    }

    render() {
        const { temp, city, days, cities, temperature } = this.state;
        return (
            <Fragment>
                <Search onSearchOne={this.onSearchLocation} onSearchFive={this.onSearchFiveDays} />
                <div>
                    <CurrentDay temp={temp} city={city} />
                </div>
                <div>
                    <FiveDay days={days} />
                </div>
                <div>
                    <Cities temp={temperature} cities={cities} />
                </div>
            </Fragment>
        );
    }
}

export default App;
