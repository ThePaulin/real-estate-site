import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    user: DefaultSession['user'] & {
        firstname: string;
        lastname: string;
        savedItems: string[];
    };
  }
}
