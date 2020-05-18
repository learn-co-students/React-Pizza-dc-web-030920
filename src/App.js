import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  constructor(){
    super()
    this.state= {
      pizzas: [],
      pizzaId: null,
      topping: '',
      size: 'small',
      vegetarian: false
    }
  }

  onFormSubmit = () => {
    const obj ={
      topping: this.state.topping,
      size: this.state.size,
      vegetarian: this.state.vegetarian
    }
    if (this.state.pizzaId){
             fetch(`http://localhost:3000/pizzas/${this.state.pizzaId}`, {
              method: "PATCH",
              headers: {"Content-Type" : 'application/json'},
              body: JSON.stringify(obj)
            })
    }else{
            fetch('http://localhost:3000/pizzas', {
              method: "POST",
              headers: {"Content-Type" : 'application/json'},
              body: JSON.stringify(obj)
            }).then(resp => resp.json())
            .then(newPizza =>{
              const pizzaArray = this.state.pizzas.concat(obj)
              this.setState({
                pizzas: pizzaArray,
              })
            })
          }
    this.setState({
        topping: '',
        pizzaId: null,
        size: 'small',
        vegetarian: false
    })
  }

  onEditPizza = (pizza) => {
    this.setState({
      pizzaId: pizza.id,
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: pizza.vegetarian
    })
  }

  onVegetarianChange = (event) => {
      this.setState({
        vegetarian: event.target.value === 'Vegetarian' ? true :false
      })
  }

  onFormChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  
  componentDidMount(){
    fetch('http://localhost:3000/pizzas')
    .then(response => response.json())
    .then(data => {
      this.setState({
        pizzas: data
      })
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm onFormSubmit={this.onFormSubmit} onVegetarianChange={this.onVegetarianChange} onFormChange={this.onFormChange} topping={this.state.topping} size={this.state.size} vegetarian={this.state.vegetarian}/>
        <PizzaList pizzas={this.state.pizzas} onEditPizza={this.onEditPizza}/>
      </Fragment>
    );
  }
}

export default App;
