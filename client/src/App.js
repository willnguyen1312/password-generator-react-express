import React, { Component } from "react";
import "./App.css";

class App extends Component {
  // Initialize state
  state = { passwords: [], Hello: null };

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch("/api/passwords")
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  };

  getHope = () => {
    let _Hello;
    import("./NetworkError")
      .then(({ default: NetworkError }) => {
        console.log(NetworkError);
        _Hello = NetworkError;
        this.setState({
          Hello: _Hello
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const { passwords, Hello } = this.state;

    return (
      <div className="App">
        {/* Render the passwords if we have them */}
        {passwords.length
          ? <div>
              <h1>5 Passwords.</h1>
              <ul className="passwords">
                {/*
                Generally it's bad to use "index" as a key.
                It's ok for this example because there will always
                be the same number of passwords, and they never
                change positions in the array.
              */}
                {passwords.map((password, index) =>
                  <li key={index}>
                    {password}
                  </li>
                )}
              </ul>
              <button className="more" onClick={this.getPasswords}>
                Get More
              </button>
            </div>
          : // Render a helpful message otherwise
            <div>
              <h1>No passwords :(</h1>
              <button className="more" onClick={this.getHope}>
                Try Again?
              </button>
            </div>}
        {Hello && <Hello />}
      </div>
    );
  }
}

export default App;
