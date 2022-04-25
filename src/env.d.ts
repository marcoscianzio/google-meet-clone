declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      CLIENT_ID: string;
      SECRET_KEY: string;
      COOKIE_SECRET: string;
      REDIS_URL: string;
    }
  }
}

export {}
