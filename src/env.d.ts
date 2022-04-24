declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      CLIENT_ID: string;
      SECRET_KEY: string;
    }
  }
}

export {}
