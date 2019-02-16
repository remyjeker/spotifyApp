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

    window
      .fetch('http://localhost:5000/api/login', requestInit)
      .then(response => {
        const { body } = response;
        const reader = body.getReader();

        reader.read().then(a => {
          // eslint-disable-next-line no-console
          console.log('Stream complete', a);
        });
      });
  };
}

export default AuthService;
