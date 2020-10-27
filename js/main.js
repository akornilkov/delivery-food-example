const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close");
const authButton = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuthButton = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const logInInput = document.querySelector("#login");
const passWordInput = document.querySelector("#password");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out"); 

const storageName = 'foodDelivery';

cartButton.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

let userData = localStorage.getItem(storageName) || '{}';


let login = JSON.parse(userData).username;
console.log('login: ', login);

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
}

function authorized() {
  function logOut() {
    login = null;
    localStorage.removeItem(storageName);
    authButton.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click',logOut);
    checkAuth();
  }
  authButton.style.display = 'none';
  // Show out and username
  userName.textContent = login;
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';
  buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {
  function logIn(e) {
    e.preventDefault();
    login = logInInput.value;
    password = passWordInput.value;
    //Not Safe but works()
    localStorage.setItem(storageName,JSON.stringify({'username':login,'password':password}));
    toggleModalAuth();
    authButton.removeEventListener("click", toggleModalAuth);
    closeAuthButton.removeEventListener("click", toggleModalAuth);
    logInForm.removeEventListener("submit", logIn);
    logInForm.reset();
    checkAuth();
  }
  authButton.addEventListener("click", toggleModalAuth);
  closeAuthButton.addEventListener("click", toggleModalAuth);
  logInForm.addEventListener("submit", logIn);
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

checkAuth();