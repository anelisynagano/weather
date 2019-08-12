import React, { Component } from 'react';

class Search extends Component {
    state = {
        text: '',
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { onSearchOne, onSearchFive } = this.props;
        const { text } = this.state;
        onSearchOne(text);
        onSearchFive(text);
    }

    handleChange = (e) => {
        this.setState({
            text: e.target.value
        });
    }

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <input className="input" type="text" onChange={this.handleChange} name="city" placeholder="enter a city" />
                    <input className="button" type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Search;
