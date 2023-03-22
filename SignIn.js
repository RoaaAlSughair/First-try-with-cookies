let email;
let password;
let isRemembered = false;

const handleEmail = (e) => {
  email = e.target.value;
};
const handlePassword = (e) => {
  password = e.target.value;
};
const handleIsRemembered = (e) => {
  isRemembered = e.target.checked;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  const http = new XMLHttpRequest();
  http.open('POST', 'https://core.talentspace.ai/api2/login', true);
  http.responseType = 'json';
  http.send(data);
  http.onload = () => {
    console.log(http.response);
  }
};

document
  .querySelector(`input[type = email]`)
  .addEventListener('change', handleEmail);
document
  .querySelector(`input[type = password]`)
  .addEventListener('change', handlePassword);
document
  .querySelector(`input[type = checkbox]`)
  .addEventListener('change', handleIsRemembered);
document
  .querySelector(`button`)
  .addEventListener('click', handleSubmit);
