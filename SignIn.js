const getCookie = (name) => {
  const cookieArr = document.cookie.split(';');
  for (i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split('=');
    if (name === cookiePair[0].trim()) {
      return cookiePair[1];
    }
  }
  return null;
};

let email = getCookie('email');
let password = getCookie('password');
let isRemembered = getCookie('is_remembered') || false;

if (isRemembered) {
  document.querySelector(`input[type = email]`).defaultValue = email;
  document.querySelector(`input[type = password]`).defaultValue = password;
  document.querySelector(`input[type = checkbox]`).defaultValue = isRemembered;
}

const handleEmail = (e) => {
  email = e.target.value;
};
const handlePassword = (e) => {
  password = e.target.value;
};
const handleIsRemembered = (e) => {
  isRemembered = e.target.checked;
};

const validateCookie = (cookie) => {
  const http = new XMLHttpRequest();
  const data = cookie;
  http.open('POST', 'https://core.talentspace.ai/api2/verify_token', true);
  http.send(data);
  http.onreadystatechange = () => {
    if (http.status === 200 && http.readyState === 4) {
      console.log('Success');
    } else console.log('Failed');
  };
};

const handleSubmit = (e) => {
  e.preventDefault();
  const data = new FormData();
  data.append('email', email);
  data.append('password', password);
  const http = new XMLHttpRequest();
  http.open('POST', 'https://core.talentspace.ai/api2/login', true);
  http.responseType = 'json';
  http.send(data);
  http.onreadystatechange = () => {
    if (http.status === 200 && http.readyState === 4) {
      console.log(http.response);
      document.cookie = `message=Logged_In Max-Age=${5 * 60}`;
      validateCookie(getCookie('message'));
    } else console.log('failed');
  };

  if (isRemembered) {
    document.cookie = `email=${email} Max-Age=${5 * 60}`;
    document.cookie = `password=${password} Max-Age=${5 * 60}`;
    document.cookie = `isRemembered = ${isRemembered} Max-Age=${5 * 60}`;
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
document.querySelector(`button`).addEventListener('click', handleSubmit);
