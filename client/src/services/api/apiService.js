export class ApiService {
  baseUrl: string;

  requestInit: any;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;

    this.requestInit = {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'no-cors',
      cache: 'default'
    };
  }

  login = () => {
    const loginUrl = this.baseUrl.concat('/api/login');

    window.fetch(loginUrl, this.requestInit).then(response => {
      const { redirected, url } = response;

      if (redirected && url) {
        window.location.replace(url);
      } else {
        window.location.replace('/app/error/authentication-error');
      }
    });
  };

  search = (keyword: string, type: string) => {
    const searchUrl = this.baseUrl.concat(
      '/api/search?q=',
      keyword,
      '&type=',
      type
    );

    return window.fetch(searchUrl, this.requestInit).then(response => {
      if (response.status !== 200) {
        window.location.replace('/app/error/search-error');
      }

      return response.json();
    });
  };
}

export default ApiService;
