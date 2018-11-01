import React, { Component } from "react";
import "./App.css";
//import Movies from "./components/movies";
import Counters from "./components/counters";
import Navbar from "./components/navbar";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 10 },
      { id: 3, value: 5 },
      { id: 4, value: 4 }
    ]
  };

  render() {
    return (
      <React.Fragment>
        <Navbar
          counterCount={
            this.state.counters.filter(counter => counter.value > 0).length
          }
        />
        <div className="container" style={{ marginTop: "2%" }}>
          <Counters
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onReset={this.resetValues}
            onAddCounter={this.addCounter}
            onDelete={this.handleDelete}
            counters={this.state.counters}
          />
        </div>
      </React.Fragment>
    );
  }

  handleDelete = counterID => {
    this.setState({
      counters: this.state.counters.filter(counter => counter.id !== counterID)
    });
  };

  addCounter = () => {
    const ids = this.state.counters.map(counter => counter.id);
    let maxID = 1;
    if (ids.length > 0) {
      maxID = Math.max(...ids) + 1;
    }
    this.setState({
      counters: this.state.counters.concat({ id: maxID, value: 0 })
    });
  };

  handleIncrement = counterID => {
    this.setState({
      counters: this.state.counters.map(counter => {
        if (counter.id === counterID) {
          counter.value++;
        }
        return counter;
      })
    });
  };

  handleDecrement = counterID => {
    this.setState({
      counters: this.state.counters.map(counter => {
        if (counter.id === counterID && counter.value > 0) {
          counter.value--;
        }
        return counter;
      })
    });
  };

  resetValues = () => {
    this.setState({
      counters: this.state.counters.map(counter => {
        counter.value = 0;
        return counter;
      })
    });
  };
}

export default App;
