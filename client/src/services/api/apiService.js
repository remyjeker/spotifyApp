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

  auth = (action: string): void => {
    const authUrl = this.baseUrl.concat(`/api/${action}`);

    window.fetch(authUrl, this.requestInit).then(response => {
      const { redirected, url } = response;

      if (redirected && url) {
        window.location.replace(url);
      } else {
        window.location.replace(
          '/app/error/You must being logged into Spotify'
        );
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
      const { status, redirected, url } = response;

      if (status !== 200) {
        window.location.replace('/app/error/No results');
        return null;
      }

      if (redirected && url) {
        window.location.reload();
        return null;
      }

      return response.json();
    });
  };
}

export default ApiService;
