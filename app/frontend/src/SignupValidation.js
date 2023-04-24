function Validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    // const password_pattern = /^(?=.\d)(?=.[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    console.log("in singupvalidation js")
    console.log(values)
    const regex = /\.(jpg|JPG|jpeg|JPEG|png|PNG)$/;
    const imgpath = values.profileimg[0]
    
    if(values.name === "") {
        error.name  = "Name Should not be empty"
    }
    else if(values.name[0] === values.email[0]){
    
        error.name = "Email and Username cannot have same values"
        
    }
    else {
        error.name = ""
    }

    if(values.email ==="") {
        error.email = "Email should not be empty"
    }
    else if(values.name[0] === values.email[0]){
        error.email = "Email and Username cannot have same values"
    }
    else if(!email_pattern.test(values.email)) {
        error.email = "Email Didn't match"
    }
    
    else {
        error.email = ""
    }

    if(values.password ==="") {
        error.password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)) {
        error.password = "Password Didn't match"
    }
    else {
        error.password = ""
    }
    if(values.profileimg.length ===0 || values.profileimg[0] === "") {
        error.profileimg = "Please select a image file"
    }
    else if(!imgpath.match(regex)){
        error.profileimg = "Please select a file with .jpg or .png extension"
    }

    else {
        error.profileimg = "";
        
    }
    if(values.typeofuser ===""){
        error.typeofuser = "Please select a type of user";
    }
    else{
        error.typeofuser = "";
    }

    return error;
}

export default Validation;