import React from "react"

const PizzaForm = (props) => {
  return(
      <div className="form-row">
        <div className="col-5">
            <input onChange={props.func} name="pizzaTopping" type="text" className="form-control" placeholder="Pizza Topping" value={props.pizza.pizzaTopping}/>
        </div>
        <div className="col">
          <select value={props.pizza.pizzaSize} name="pizzaSize" className="form-control" onChange={props.func} >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" name="vegetarian" value="Vegetarian" checked={props.pizza.vegetarian} onChange={props.func}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="vegetarian" value="Not Vegetarian" checked={!props.pizza.vegetarian} onChange={props.func}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={props.onSubmit}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
