export interface User {
  name: string;
  email: string;
  avatar: string | null;
  githubConnected: boolean;
  isPro?: boolean;
}
