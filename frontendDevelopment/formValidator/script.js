const form=document.getElementById("registration-form")
const username=document.getElementById("username")
const email=document.getElementById("email")
const password=document.getElementById("password")
const confirmPassword=document.getElementById("confirmPassword")

form.addEventListener("submit",function (e){
    e.preventDefault();
    const isRequiredValid=checkRequired([username,email,password,confirmPassword]);
    if(isRequiredValid){
        const isUsernameValid=checkLength(username,6,25);
        const isEmailValid=checkEmailValid(email);
        const isPasswordValid=checkLength(password,8,25);
        const isPasswordsMatch=checkPasswordmatch(password,confirmPassword);
    }
})
function checkEmailValid(email){
    const isValid=true;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(emailRegex.test(email.value.trim())){
        showSuccess(email);
    }else{
        showError(email,"Email is not valid.")
        isValid=false;
    }
    return isValid;
}
function checkLength(input,min,max){
    let isValid=true;
    if(input.value.length<min){
        showError(input,`${input.name} length should be atleast ${min} characters.`);
        isValid=false;
    }else if(input.value.length>max){
         showError(input,`${input.name} length should be less than ${max} characters.`);
        isValid=false;
    }else{
        showSuccess(input);
    }
    return isValid;
}

function checkPasswordmatch(password,confirmPassword){
    let isValid=true;
    if(password.value!==confirmPassword.value){
        showError(confirmPassword,`Password does not match !`);
        isValid=false;
    }else{
        showSuccess(password);
        showSuccess(confirmPassword);
    }
    return isValid;
}

function checkRequired(inputArray){
    let isValid=true;
    inputArray.forEach(input=>{
        if(input.value.trim()===""){
            showError(input,`${input.name} is required !`)
            isValid=false;
        }else{
            showSuccess(input);
        }
    })
    return isValid;
}

function showError(input,message){
    const formGroup=input.parentElement
    formGroup.className="form-group error";
    const small=formGroup.querySelector("small")
    small.innerText=message
}
function showSuccess(input){
    const formGroup=input.parentElement
    formGroup.className="form-group success";
}