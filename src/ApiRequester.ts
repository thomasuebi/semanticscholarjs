import retry from 'async-retry';
import axios, { AxiosRequestConfig, Method } from 'axios';

export class ApiRequester {
  timeout: number;

  constructor(options: any) {
    this.timeout = options.timeout;
  }

  async getData(
    url: string,
    parameters: string,
    headers: any,
    payload?: any
  ): Promise<any> {
    const fullUrl = `${url}?${parameters}`;
    const method: Method = payload ? 'post' : 'get';

    const axiosConfig: AxiosRequestConfig = {
      url: fullUrl,
      method,
      timeout: this.timeout,
      headers,
    };

    if (payload) {
      axiosConfig.data = payload;
    }
    console.log(axiosConfig);

    const retryOptions = {
      retries: 10,
      minTimeout: 30000, // 30 seconds
      factor: 1,
      onRetry: (error: Error) => {
        console.log(`Retrying due to ${error.message}`);
      },
    };

    return retry(async () => {
      try {
        console.log('Making HTTP request');
        const response = await axios(axiosConfig);
        console.log(`Received status code: ${response.status}`);
        return response.data;
      } catch (error) {
        console.log('Request error:', error);
        throw error;
      }
    }, retryOptions);
  }
}
