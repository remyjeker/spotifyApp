/* eslint-disable no-undef */
export default class AuthService {
  login = () => {
    const requestInit = {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'no-cors',
      cache: 'default'
    };

    return fetch('http://localhost:5000/api/login', requestInit);
  };
}
