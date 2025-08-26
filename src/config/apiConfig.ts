// API Configuration for Blog System
export const API_CONFIG = {
  // Production webhook URL
  WEBHOOK_URL: 'https://effective-marketer-dashobard.onrender.com/api/blog/webhook',
  
  // Base API URL for admin operations
  BASE_URL: 'https://effective-marketer-dashobard.onrender.com/api',
  
  // Local development URLs (if needed)
  LOCAL_WEBHOOK_URL: 'http://localhost:3001/api/blog/webhook',
  LOCAL_BASE_URL: 'http://localhost:3001/api',
  
  // Environment detection
  IS_PRODUCTION: window.location.hostname !== 'localhost',
  
  // Get the appropriate URL based on environment
  getWebhookUrl: () => {
    return API_CONFIG.WEBHOOK_URL; // Always use production for now
  },
  
  getBaseUrl: () => {
    return API_CONFIG.BASE_URL; // Always use production for now
  }
};

// API endpoints
export const API_ENDPOINTS = {
  // Blog endpoints
  WEBHOOK: '/blog/webhook',
  DRAFTS: '/blog/drafts',
  DRAFT_BY_ID: (id: string) => `/blog/drafts/${id}`,
  PUBLISH_DRAFT: (id: string) => `/blog/drafts/${id}/publish`,
  DELETE_DRAFT: (id: string) => `/blog/drafts/${id}`,
  PUBLISHED_POSTS: '/blog/published',
  PUBLISHED_POST_BY_ID: (id: string) => `/blog/published/${id}`,
  HEALTH: '/health'
};

// Helper function to make API requests
export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.getBaseUrl();
  }

  // Generic request method
  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Blog API methods
  async getDrafts() {
    return this.request(API_ENDPOINTS.DRAFTS);
  }

  async getDraft(id: string) {
    return this.request(API_ENDPOINTS.DRAFT_BY_ID(id));
  }

  async updateDraft(id: string, data: any) {
    return this.request(API_ENDPOINTS.DRAFT_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async publishDraft(id: string) {
    return this.request(API_ENDPOINTS.PUBLISH_DRAFT(id), {
      method: 'POST'
    });
  }

  async deleteDraft(id: string) {
    return this.request(API_ENDPOINTS.DELETE_DRAFT(id), {
      method: 'DELETE'
    });
  }

  async getPublishedPosts() {
    return this.request(API_ENDPOINTS.PUBLISHED_POSTS);
  }

  async getPublishedPost(id: string) {
    return this.request(API_ENDPOINTS.PUBLISHED_POST_BY_ID(id));
  }

  async updatePublishedPost(id: string, data: any) {
    return this.request(API_ENDPOINTS.PUBLISHED_POST_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deletePublishedPost(id: string) {
    return this.request(API_ENDPOINTS.PUBLISHED_POST_BY_ID(id), {
      method: 'DELETE'
    });
  }

  async checkHealth() {
    return this.request(API_ENDPOINTS.HEALTH);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
