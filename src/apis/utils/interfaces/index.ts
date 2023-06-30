export interface requestInterface {
  url: string;
  method: string;
  params?: any;
  data?: string | any;
  headers?: any;
  timeout?: number;
  withCredentials?: boolean;
  auth?: { username: string; password: string };
  responseType?: string;
  responseEncoding?: string;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  maxContentLength?: number;
  maxBodyLength?: number;
  proxy?: {
    protocol: string;
    host: string;
    port: number;
    auth: {
      username: string;
      password: string;
    };
  };
}

export interface blankObject {
  [key: string]: any;
}
