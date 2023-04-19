function Validation(values) {
    let error = {}
    console.log("in formvalidiation js")
    console.log(values)
    const regex = /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/;
    // console.log("regex output: ")
    
    const imgpath = values.image[0]
    // console.log(imgpath.match(regex))
    if(values.productname.length === 0 || values.productname[0] ==="") {
        // console.log("should print this")
        error.productname = "Product Name should not be empty"
    }
    else {
        error.productname = ""
    }
    
    if(values.productdesc.length ===0 || values.productdesc[0] === "") {
        error.productdesc = "Product Description should not be empty"
    }

    else {
        error.productdesc = ""
    }
    if(values.category.length ===0 || values.category[0] === "") {
        error.category = "Please select a category"
    }

    else {
        error.category = ""
    }
        
    if(!imgpath.match(regex) ||  values.image.length ===0 || values.image[0] === "") {
        error.image = "Please select a image file"
    }

    else {
        error.image = ""
    }
   


    return error;
}

export default Validation;