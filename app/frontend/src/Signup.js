import React, {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Validation from './SignupValidation';
import axios from 'axios';

function Signup() {
    const [values, setValues] = useState ({
        name: '',
        email: '',
        password: '',
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const err = Validation(values);
        setErrors(err);
        
        if(err.name==="" && err.email === "" && err.password==="") {
            axios.post("http://localhost:8081/signup", values)
            .then(res => {
                // console.log(res)
                if(res.data === "Username Already Registered"){
                    setErrors({name :res.data});
                    // navigate('/signup');
                }
                else if(res.data === "Email Already In Use"){
                    setErrors({email :res.data});
                    navigate('/signup');
                }
                else
                navigate('/');
            })
            .catch(err => console.log(err));
        }
    }
    return (
        <div className = 'd-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className = "bg-white p-3 rounded w-25">
                <h2>Sign Up</h2>
                <form action = "" onSubmit={handleSubmit}>
                <div className = 'mb-3'>
                        <label htmlfor="name"><strong> Username</strong> </label>
                        <input type="text" placeholder = "Enter Name" name = "name" onChange={handleInput} className='form-control rounded-0'/>
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
                    <div className = 'mb-3'>
                        <label htmlfor="email"><strong> Email</strong> </label>
                        <input type="email" placeholder = "Enter Email" name ="email" onChange={handleInput} className='form-control rounded-0'/>
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className = 'mb-3'>
                        <label htmlfor="password"><strong>Password</strong></label>
                        <input type="password" placeholder="Enter Password" 
                        name ="password" onChange={handleInput} className='form-control rounded-0'/>
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <button type="submit" className = "btn btn-success w-100 rounded-0">Sign Up</button>
                    <p> You agree to our terms and policies</p>
                    <Link to = "/" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Log In</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup