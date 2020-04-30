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
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const formSchema = yup.object().shape({
        name: yup.string().required("Please enter your full name"),
        email: yup.string().email("Must be a valid email address").required(),
        password: yup.string().min(6, "Passwords must be at least 6 characters long").required("Password is required"),
        tosChecked: yup.boolean().oneOf([true], "Please accept the Terms Of Service")
    });


    useEffect(() => {
        formSchema.isValid(formData).then(valid => {
            setButtonDisabled(!valid)
        })
    }, [formData])


    // Handling Change 

    const handleChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
        })
    };

    return (
      <form className="signup-form">
          <label htmlFor="name">
              <strong>Full Name: </strong>
              <input type="text" id="full-name" name="name" onChange={event => handleChange(event)} value={formData.name}/>
          </label>

          <label htmlFor="email">
              <strong>Email: </strong>
              <input type="email" id="email" name="email" onChange={event => handleChange(event)} value={formData.email}/>
          </label>

          <label htmlFor="password">
            <strong>Password: </strong>
            <input type="password" id="password" name="password"  onChange={event => handleChange(event)} value={formData.password}/>
          </label>

          <label>
              Terms of Service:
              <input 
                    type="checkbox" 
                    name="tosChecked" 
                    id="tos"
                    checked={formData.tosChecked}
                    onChange={event => handleChange(event)} />
          </label>

          <button id="sub-btn" disabled={ buttonDisabled }>Submit!</button>
      </form>  
    );
}

export default Form;