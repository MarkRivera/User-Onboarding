import React, { useState, useEffect } from 'react';
import * as yup from "yup";


function Form() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        tosChecked: false
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        tosChecked: ""
    })

    const formSchema = yup.object().shape({
        name: yup.string().required("Please enter your full name"),
        email: yup.string().email("Must be a valid email address").required(),
        password: yup.string().password().min(6, "Passwords must be at least 6 characters long").required("Password is required"),
        tosChecked: yup.boolean().oneOf([true], "Please accept the Terms Of Service")
    })


    useEffect(() => {
        formSchema.isValid(formData).then(valid => {
            setButtonDisabled(!valid)
        })
    }, [formData])


    // Handling Change 

    const handleChange = event => {
        const target = event.target;
        const value = target.name === 'tosChecked' ? target.checked : target.value;

        
        setFormData({
            ...formData,
            [target.name]: value
        })
    };

    return (
      <form className="signup-form">
          <label htmlFor="name">
              <strong>Full Name: </strong>
              <input type="text" id="full-name" name="name" onChange={event => handleChange(event)} />
          </label>

          <label htmlFor="email">
              <strong>Email: </strong>
              <input type="email" id="email" name="email" onChange={event => handleChange(event)} />
          </label>

          <label htmlFor="password">
            <strong>Password: </strong>
            <input type="password" id="password" name="password"  onChange={event => handleChange(event)} />
          </label>

          <label>
              Terms of Service:
              <input 
                    type="checkbox" 
                    name="tosChecked" 
                    id="tos" 
                    value={formData.tosChecked}
                    onChange={event => handleChange(event)} />
          </label>

          <button>Submit!</button>
      </form>  
    );
}

export default Form;