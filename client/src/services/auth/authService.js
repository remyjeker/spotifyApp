export class AuthService {
  login = () => {
    const requestInit = {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'no-cors',
      cache: 'default'
    };

    window.fetch('http://localhost:5000/api/login', requestInit).then(
      response => {
        console.log(response);

        const { redirected, url } = response;

        if (redirected && url) {
          window.location.replace(url);
        }
      },
      error => {
        console.log('fetch error', error);
      }
    );
  };
}

export default AuthService;
