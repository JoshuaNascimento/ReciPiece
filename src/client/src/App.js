import React, {Component} from 'react';
import './App.css';

class App extends Component {

    state = {};

        componentDidMount() {
            this.dadJokes()
        }

    // Method fires on mount and makes a fetch request to the backend for a joke
    // Proxy is defined in the package.json to allow the frontend to connect with the correct backend port
    dadJokes = () => {
        fetch('/joke')
            .then(response => response.text())
            .then(message => {
                this.setState({message: message});
            });
    };

    render() {
        return (
            <div className="App">
            <header className="App-header">
            <h3 className="App-title">{this.state.message}</h3>
            </header>
            <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        </div>
    );
    }
}

export default App;