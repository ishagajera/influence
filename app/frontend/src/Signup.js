import React, {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Validation from './SignupValidation';
import axios from 'axios';


function Signup() {
    const [values, setValues] = useState ({
        name: '',
        email: '',
        password: '',
        typeofuser:'',
        profileimg:'',
    })
    const [file, setFile] = useState();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    };
    const setimgfile = (event)=>{

      setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
      
      setFile(event.target.files[0])
  }
    const handleSubmit = (event) => {
        event.preventDefault();
        const err = Validation(values);
        setErrors(err);
        var formData = new FormData();
        // var encrypt_pass = md5(values.password);
        // values.password = encrypt_pass;
        for(const val in values) {
           
            formData.append(val,values[val].length === 0 ? null : values[val][0]);
        }
        formData.append('files',file)
        // console.log("printing form data")
        // console.log(formData)
     
        
        if(err.name==="" && err.email === "" && err.password==="" && err.profileimg==="" && err.typeofuser==="") {
          const config = {
            headers:{
            "Content-Type":"multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH"

            }
        }
            axios.post("http://localhost:8081/signup", formData,config)
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
                navigate('/login');
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
                    <div className = 'mb-3'>
                        <label htmlfor="typeofuser"><strong>Type of user</strong></label>
                        <div className="radio">
                          <label><input name = "typeofuser" type="radio" value="Influencer"  onChange={handleInput} />
                            Influencer
                          </label>
                        </div>
                        <div className="radio">
                          <label><input name = "typeofuser" type="radio" value="Brand" onChange={handleInput} />
                            Brand
                          </label>
                        </div>
                        {errors.typeofuser && <span className="text-danger">{errors.typeofuser}</span>}
                    </div>
                    <div className = 'mb-3'>
                        <label htmlfor="profileimg"><strong> Select a Profile photo</strong> </label>
                        <input filename={file} type="file"  name ="profileimg" onChange={setimgfile}  className='form-control rounded-0'/>
                        {errors.profileimg && <span className="text-danger">{errors.profileimg}</span>}
                    </div>

                    <button type="submit" className = "btn btn-success w-100 rounded-0">Sign Up</button>
                    {/* <p> You agree to our terms and policies</p> */}
                    <Link to = "/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Log In</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup