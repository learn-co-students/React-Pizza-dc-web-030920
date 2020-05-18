import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'


class App extends Component {

  constructor(){
    super()
    this.state = {
      pizzas: [],
      pizzaTopping: "",
      pizzaSize: "",
      vegetarian: false,
      editId: null
    }
  }
  componentDidMount(){
    fetch("http://localhost:3000/pizzas")
    .then(resp => resp.json())
    .then(data => this.setState({pizzas: data}))
  }

  handleEditButton = (pizza) => {
    this.setState({
      pizzaTopping: pizza.topping,
      pizzaSize: pizza.size,
      vegetarian: pizza.vegetarian,
      editId: pizza.id
    })
    this.populateForm()
  }

  handleOnChange = (e) => {
    let {value, name} = e.target
    if(name === "vegetarian"){
      this.setState({vegetarian: !this.state.vegetarian})
    } else {
    this.setState({[name]: value})
    }
  }

  handleSubmit = (id) => {
    let editObj = {
      topping: this.state.pizzaTopping,
      size: this.state.pizzaSize,
      vegetarian: this.state.vegetarian
    }
    fetch(`http://localhost:3000/pizzas/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json", "Accepts": "application/json"},
      body: JSON.stringify(editObj)})
      .then(resp => resp.json())
      .then(data => {
        const arr = this.state.pizzas.map(pizza => {
          if(pizza.id === data.id){
            pizza = data
          }
          return pizza
        })
        
        this.setState({pizzas: arr})
      })
    
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state} func={this.handleOnChange} onSubmit={() => this.handleSubmit(this.state.editId)}/>
        <PizzaList pizzas={this.state.pizzas} func={this.handleEditButton}/>
      </Fragment>
    );
  }
}

export default App;
