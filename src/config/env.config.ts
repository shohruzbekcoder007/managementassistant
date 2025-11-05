// Environment configuration - Single source of truth for environment variables
export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://tourmad.uz:8080',
  apiUrl: import.meta.env.VITE_API_URL || '/api/v1',
  get fullApiUrl() {
    return `${this.apiBaseUrl}${this.apiUrl}`;
  }
} as const;
