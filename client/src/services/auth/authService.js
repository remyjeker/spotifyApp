/* eslint-disable no-undef */
class AuthService {
  login = () => {
    const myInit = {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch('http://localhost:5000/api/login', myInit).then(response => {
      // eslint-disable-next-line no-console
      console.log('then', response);

      return response;
    });
  };
}

export default AuthService;
