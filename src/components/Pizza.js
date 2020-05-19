import React from "react"

const Pizza = (props) => {
  return(
    <tr>
      <td>{props.pizza.topping}</td>
      <td>{props.pizza.size}</td>
      <td>{props.pizza.vegetarian ? 'Yes' : 'No' }</td>
      <td><button id={props.key} type="button" className="btn btn-primary" onClick={() => props.onEditPizza(props.pizza)}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
