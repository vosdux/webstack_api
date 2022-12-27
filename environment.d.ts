declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
      DB_PORT: string;
      DB_HOST: string;
      SMTP_HOST: string;
      SMTP_PORT: string;
      SMTP_USER: string;
      SMTP_PASSWORD: string;
      CLIENT_URL: string;
      API_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
