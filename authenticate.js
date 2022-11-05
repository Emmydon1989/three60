let email = document.getElementById("aemail")
let password = document.getElementById("apsw")
let email_msg = document.getElementById("email_msg")
let password_msg =document.getElementById("password_msg")
let signInForm = document.getElementById("signInForm")


function signin(event){
    event.preventDefault()

    if(email.value === ""){
        email_msg.innerText = "email can not be empty"
        email.style.bordercolor="red"
        email_msg.style.color = "red"
    }else{
        email_msg.innerText = ""
        email_msg.style.color ="green"
        email.style.borderColor = "green"
    }
    if(password.value ===""){
        password_msg.innerText = "password can not be empty"
        password.style.borderColor = "red" 
        password_msg.style.color = "red"       
    }else{
        password_msg.innerText = ""
        password_msg.style.color = "green"
        submitForm()
    }

}
function submitForm(){

    let formData = new FormData(sigInform)
    const userObject = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword')
    }
   // const loading = document.querySelector('.loading')
    //loading.classList.add("show")
    fetch('https://my-diary-dev.herokuapp.com/auth/signup', {
      headers: {
        'Content-Type': 'Application/json'
      },
      method: 'POST',
      body: JSON.stringify(userObject)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success")
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        window.location="trackrecord.html"
      })
    }