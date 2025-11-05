// Authentication Service - Wrapper for local storage and token management
// API calls are now handled by RTK Query (apiSlice)

export class AuthService {
  private static readonly TOKEN_KEY = 'authToken';

  static saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  static logout(): void {
    this.removeToken();
  }
}
