import React, {useEffect, useState}  from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Validation from './FormValidation';

import axios from 'axios';

function Form() {

    const [values, setValues] = useState ({
        productname: '',
        productdesc: '',
        category:'',
        image :'',

    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [file, setFile] = useState();
    const [backendError, setBackendError] = useState([])
    const [uploadStatus, setUploadStatus] = useState('');
    const handleInput = (event) => {

        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
        
    }
    const setimgfile = (event)=>{
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
        setFile(event.target.value)
    }

    var getFilename = function (str) {
        return str.substring(str.lastIndexOf('//')+1);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var formData = new FormData();
        // console.log(file)
       
       // let str = file.toString;
       var str = String(file);
       let temp = str.substring(str.lastIndexOf('\\')+1);
       // var fileName = getFilename(temp);
        console.log("hellooo")
        console.log(temp)
        formData.append("image",temp)
        // const file_name = event.target.files[0];
        // console.log(file_name)
        // console.log("contents of event:")
        // console.log(event.target)
        // setFile(URL.createObjectURL(values.image));
        // console.log(event.target[3].value)
        // console.log("contents of values")
        // console.log(values)
        const err = Validation(values); 
        setErrors(err); 
        
        // console.log(" after setErrors Validation")
        // console.log(err)
        if(err.productname === "" && err.productdesc === "" && err.category === "" && err.image === "") {
            
            axios.post("http://localhost:8081/form", formData,values)//values)
            
            .then(res => {
                // console.log("printing res")
                // console.log(res)
                if(res.data.errors) {                    
                    setBackendError(res.data.errors);                
                } 
                // console.log("inside axios.post")
                
               if(res.data === "Success") {
                navigate('/');
               }
               else {
                alert("Error");
               }
            })
            .catch(err => console.log(err));
        }
    }

   

    return (
        <div className = 'd-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className = "bg-white p-3 rounded w-25">
            <h2>Post a Product</h2>
                <form action = "" onSubmit={handleSubmit}>
                    <div className = 'mb-3'>
                        <label htmlfor="productname"><strong> Product Name</strong> </label>
                        <input type="text" placeholder = "Enter Product Name" onChange={handleInput} name ="productname" className='form-control rounded-0'/>
                        {errors.productname && <span className="text-danger">{errors.productname}</span>}
                    </div>
                    <div className = 'mb-3'>
                        <label htmlfor="productdesc"><strong>Product Description</strong></label>
                        <textarea rows="4" cols="20" placeholder = "Enter Product Description" onChange={handleInput}  name="productdesc" className='form-control rounded-0'></textarea>
                        {errors.productdesc && <span className="text-danger">{errors.productdesc}</span>}
                    </div>
                    <div className = 'mb-3'>
                        <label htmlfor="category"><strong> Category </strong> </label>
                        <select name="category" id="category" onChange={handleInput}>
                            <option value="beauty">Beauty</option>
                            <option value="family">Family</option>
                            <option value="fashion">Fashion</option>
                            <option value="fitness">Fitness</option>
                            <option value="food">Food</option>
                            <option value="interior">Interior</option>
                            <option value="pet">Pet</option>
                            <option value="travel">Travel</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.category && <span className="text-danger">{errors.category}</span>}
                    </div>
                    <div className = 'mb-3'>
                        <label htmlfor="image"><strong> Image</strong> </label>
                        <input type="file"  name ="image" onChange={setimgfile}  className='form-control rounded-0'/>
                        {errors.image && <span className="text-danger">{errors.image}</span>}
                    </div>
                    <button type="submit" className = "btn btn-success w-100 rounded-0">Submit</button>
                </form>
            </div>
           
        </div>
    )
}

export default Form