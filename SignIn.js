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

const validateCookie = () => {
  let headers = new Headers();
  headers.append(
    'Access-Control-Allow-Origin',
    'https://core.talentspace.ai/api2/verify_token'
  );
  headers.append('Access-Control-Allow-Credentials', true);

  fetch('https://core.talentspace.ai/api2/verify_token', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: headers,
    body: {},
  }).then((response) => {
    if (response.status === 200) {
      console.log('Success');
    } else {
      console.log('Error');
    }
  });
};

const handleSubmit = (e) => {
  e.preventDefault();

  if (isRemembered) {
    document.cookie = `email = ${email} Max-Age=${5 * 60}`;
    document.cookie = `password = ${password} Max-Age=${5 * 60}`;
    document.cookie = `isRemembered = ${isRemembered} Max-Age=${5 * 60}`;
    console.log(document.cookie);
  }

  const data = new FormData();
  data.append('email', email);
  data.append('password', password);

  let headers = new Headers();
  headers.append(
    'Access-Control-Allow-Origin',
    'https://core.talentspace.ai/api2/login'
  );
  headers.append('Access-Control-Allow-Credentials', true);

  fetch('https://core.talentspace.ai/api2/login', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: headers,
    body: data,
  }).then(() => {
    validateCookie();
  });
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
