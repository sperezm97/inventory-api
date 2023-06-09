declare namespace NodeJS {
  export interface ProcessEnv {
    ENV: string;
    PORT: number;

    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
  }
}
