import React from "react"

const Pizza = (props) => {
  return(
    <tr>
      <td>{props.pizzaObj.topping}</td>
      <td>{props.pizzaObj.size}</td>
      <td>{props.pizzaObj.vegetarian ? "Yes" : "No"}</td>
      <td><button type="button" className="btn btn-primary" onClick={() => props.edit(props.pizzaObj)}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
