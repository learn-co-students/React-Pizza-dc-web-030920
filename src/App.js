import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  constructor(){
    super()
    this.state = {
      pizzas: [],
      currentPizza: {
        id: null,
        topping: "",
        size: null,
        vegetarian: null
      },
      inputCurrentPizza: {
        id: null,
        topping: "",
        size: null,
        vegetarian: null
      }
    }
  }

  componentDidMount(){
    fetch("http://localhost:3000/pizzass")
    .then(resp => resp.json())
    .then(data => this.setState({pizzas: data}))
  }

  handleInput = (event) =>{
    let newObj = this.state.currentPizza
    newObj.topping = event.target.value
    newObj.size = this.state.inputCurrentPizza.size
    newObj.vegetarian = this.state.inputCurrentPizza.vegetarian
    newObj.id = this.state.inputCurrentPizza.id
    this.setState({inputCurrentPizza: newObj})
  }
  handleSelect = (event) => {
    let newObj = this.state.currentPizza
    newObj.size = event.target.value
    newObj.topping = this.state.inputCurrentPizza.topping
    newObj.vegetarian = this.state.inputCurrentPizza.vegetarian
    newObj.id = this.state.inputCurrentPizza.id
    
    this.setState({inputCurrentPizza: newObj})
  }

  handleCheck = (event) => {
    let newObj = this.state.currentPizza
    if(event.target.value === "Vegetarian" && event.target.checked){
      newObj.vegetarian = true
    }else{
      newObj.vegetarian = false
    }
    newObj.topping = this.state.inputCurrentPizza.topping
    newObj.size = this.state.inputCurrentPizza.size
    newObj.id = this.state.inputCurrentPizza.id
    // newObj.vegetarian = this.state.inputCurrentPizza.vegetarian
    this.setState({inputCurrentPizza: newObj})
  }

  renderPizza = (pizza) => {
    
    this.setState({inputCurrentPizza: pizza})

  }

  

  handleSubmit = () => {
    let id = this.state.inputCurrentPizza.id
    let topping = this.state.inputCurrentPizza.topping

    let size = this.state.inputCurrentPizza.size
    let vegetarian = this.state.inputCurrentPizza.vegetarian
    fetch(`http://localhost:3000/pizzass/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        topping: topping,
        size: size,
        vegetarian: vegetarian
      })
    }).then(resp => resp.json())
    .then(pizza => {
      let newPizzas = this.state.pizzas
      newPizzas[pizza.id - 1] = pizza
      this.setState({pizzas: newPizzas})
    })
  }



  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm handleSubmit={this.handleSubmit}inputCurrentPizza={this.state.inputCurrentPizza} handleInput={this.handleInput} handleSelect={this.handleSelect} handleChecked={this.handleCheck}/>
        <PizzaList pizzas={this.state.pizzas} inputCurrentPizza={this.state.inputCurrentPizza}renderPizza={this.renderPizza}/>
      </Fragment>
    );
  }
}

export default App;
