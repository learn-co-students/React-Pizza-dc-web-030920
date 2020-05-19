import React from "react"

const PizzaForm = (props) => {
  return(
      <div className="form-row">
        <div className="col-5">
            <input onChange={props.handleChange} type="text" name='topping' className="form-control" placeholder="Pizza Topping" value={
                //Pizza Topping Should Go Here
                props.pizza.topping
              }/>
        </div>
        <div className="col">
          <select onChange={props.handleChange} value={props.pizza.size} name='size' className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input onChange={props.onVegeChange}  className="form-check-input" type="radio" value="Vegetarian" checked={props.pizza.vegetarian}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input onChange={props.onVegeChange} className="form-check-input" type="radio" value="Not Vegetarian" checked={!props.pizza.vegetarian}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={props.onFormSubmit}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
