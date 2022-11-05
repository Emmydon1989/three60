
let password = document.getElementById("signIn_pwd")
let pwd_msg = document.getElementById("signIn_pwd_msg")
let email = document.getElementById("signIn_email")
let email_msg = document.getElementById("signIn_email_msg")
let confirmPwd = document.getElementById('confirmpwd')
let confirmPwdMsg = document.getElementById('signIn_confirmpwd_msg')
let modalconatiner = document.querySelector(".modalcontainer")


function signup(event){
  event.preventDefault()
  
  if (email.value === ""){
    email_msg.innerText = "Please the email cannot be empty"
    email_msg.style.color ="red"
    email.style.borderColor = "red"
  }else{
    email_msg.innerText = ""
    email_msg.style.color ="green"
    email.style.borderColor = "green"
  }
  if (password.value === ""){
    pwd_msg.innerText = "Please the password cannot be empty"
    pwd_msg.style.color ="red"
    password.style.borderColor = "red" 
  } else if(password.value.length <7 ){
    pwd_msg.innerText = "password length must be greater than 7"
  }else{
    password.style.borderColor = "green"
    pwd_msg.style.color ="green"
    pwd_msg.innerText = ""
      }  
  if (confirmPwd.value === ""){
    confirmPwdMsg.innerText = "Please confirm your password"
    confirmPwdMsg.style.color ="red"
    confirmPwd.style.borderColor = "red"
  }else if (confirmPwd.value !== password.value){
    confirmPwdMsg.innerText = "Password doesn't match"
    confirmPwd.style.borderColor = "red"
  }else{
    confirmPwd.style.borderColor = "green"
    confirmPwdMsg.innerText = ""
    confirmPwdMsg.style.color ="green"
    submitForm()
  }
}
function submitForm(){

  let formData = new FormData(signInForm)
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
  function newNote(){
    if(modalconatiner.style.display = "none"){
      document.querySelector(".modalcontainer").style.display = "block"
    } else {
      document.querySelector(".modalcontainer").style.display = "none"
    }
  }
  function closeNote(){
    if(modalconatiner.style.display = "block"){
      document.querySelector(".modalcontainer").style.display = "none"
    }else{
      document.querySelector(".modalcontainer").style.display = "block"
    }
  }


  document.querySelector('#modaladd').onclick = function(){
    if(document.querySelector('#modallink').value.length == 0){
        alert("Please Enter a Link")
        
    } 

    else{
        document.querySelector('#tasks').innerHTML += `
            <div class="task">
                <span id="taskname">
                    ${document.querySelector('#modallink').value}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        `;

        var current_tasks = document.querySelectorAll(".delete");
        for(var i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                this.parentNode.remove();
            }
        }
    }
}
