import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  constructor(){
    super()
    this.state = {
      pizzas: [],
      topping: 'Pizza Topping...',
      size: null,
      vegetarian: null,
      pizzaId: null
    }
  }

  //fetches full list of pizzs 
  componentDidMount(){
    fetch('http://localhost:3000/pizzas')
    .then(res => res.json())
    .then(pizzas => this.setState({ pizzas }))
  }

  updatedPizzas(){
    fetch('http://localhost:3000/pizzas')
    .then(res => res.json())
    .then(pizzas => this.setState({ pizzas }))
  }

  //grabs pizza you want to edit and sets state to be used on form
  onEditPizza = (props) => {
    this.setState({
      topping: props.topping,
      size: props.size,
      vegetarian: props.vegetarian,
      id: props.id
    })
  }


//using one onFormEdit that works for editing two different fields, but doesn't work for the vegetarian radio button
  onFormEdit = (event) => {
    this.setState({ [event.target.name]: event.target.value    })
  }

  //checking if vegetarian is the value (alt would be not vegetairan) changing to boolean
  //setState acordingly. 
  onVegeChange = (event) => {
    let vegBool = ( event.target.value === "Vegetarian" ? true : false )
    this.setState({ vegetarian: vegBool})

    //console logging to confirm that value is changing 
    console.log(this.state.vegetarian)
  }

  updatePizza = () => {
    // event.preventDefault(); <<-- DO WE NEED THIS HERE? Since i used onClick rather than onSubmit? 
    //prepping the pizzaObj for the fetch/post
    const pizzaObj = {
      topping: this.state.topping,
      size: this.state.size,
      vegetarian: this.state.vegetarian 
    }
    

    fetch(`http://localhost:3000/pizzas/${this.state.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(pizzaObj)
    })
    .then(res => res.json())
    .then(pizza => {
      console.log(pizza)
      ///Is there another way to get the pizzas to rerenderwithout doing a .find?
      let updatedArray = this.state.pizzas.map( (pizzaObj) => pizza.id === pizzaObj.id ? pizza : pizzaObj )
      this.setState({
        pizzas: updatedArray 
      })
    })
    //reset form 
    this.setState({
      topping: "Topping...",
      size: null,
      vegetarian: null,
      id: null
    })

  }


  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state} handleChange={this.onFormEdit} onVegeChange={this.onVegeChange} onFormSubmit={this.updatePizza} />
        <PizzaList pizzas={this.state.pizzas} onEditPizza={this.onEditPizza} />
      </Fragment>
    );
  }
}

export default App;
