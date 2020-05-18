import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {
  constructor(){
    super()
    this.state = {
      pizza: [],
      topping: "",
      size: "Choose Option",
      vegetarian: true,
      pizzaId: null
    }
  }

  componentDidMount(){
    fetch("http://localhost:3000/pizzas")
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        pizza: data
      })
    })
  }

  onToppingChange = (event) => {
    this.setState({
      topping: event.target.value
    })
  }

  onSizeChange = (event) => {
    this.setState({
      size: event.target.value
    })
  }

  onVegetarianChange = (event) => {
    if (event.target.value === "Vegetarian"){
      this.setState({
        vegetarian: true
      }) 
    }else if (event.target.value === "Not Vegetarian") {
      this.setState({
        vegetarian: false
      }) 
    }
  }

  handleEdit = (pizza) => {
    this.setState({
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: pizza.vegetarian,
      pizzaId: pizza.id
    })
  }

  handleSubmit = (event) => {
    const obj = {
      topping: this.state.topping,
      size: this.state.size,
      vegetarian: this.state.vegetarian
    }
    
    if (this.state.pizzaId){
      fetch(`http://localhost:3000/pizzas/${this.state.pizzaId}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj)
      })
    } else {
    fetch("http://localhost:3000/pizzas", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(obj)
    }).then(resp => resp.json())
    .then(data => {
      this.setState({
        pizza: this.state.pizza.concat(data)
      })
    })}
  }

  render() {
    console.log(this.state.pizza)
    return (
      <Fragment>
        <Header/>
        <PizzaForm topping={this.state.topping} size={this.state.size} vegetarian={this.state.vegetarian} changeTopping={this.onToppingChange} changeSize={this.onSizeChange} changeVegetable={this.onVegetarianChange} submit={this.handleSubmit}/>
        <PizzaList pizza={this.state.pizza} edit={this.handleEdit}/>
      </Fragment>
    );
  }
}

export default App;
