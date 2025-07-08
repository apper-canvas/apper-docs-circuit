import endpointsData from '@/services/mockData/endpoints.json';

class DocumentationService {
  constructor() {
    this.endpoints = endpointsData;
  }

  // Get all function endpoints
  async getFunctionEndpoints() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.endpoints.functions]);
      }, 200);
    });
  }

  // Get all secret endpoints
  async getSecretEndpoints() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.endpoints.secrets]);
      }, 200);
    });
  }

  // Get endpoint by ID
  async getEndpointById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const allEndpoints = [...this.endpoints.functions, ...this.endpoints.secrets];
        const endpoint = allEndpoints.find(ep => ep.id === id);
        
        if (endpoint) {
          resolve({ ...endpoint });
        } else {
          reject(new Error('Endpoint not found'));
        }
      }, 200);
    });
  }

  // Search endpoints
  async searchEndpoints(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allEndpoints = [...this.endpoints.functions, ...this.endpoints.secrets];
        const filtered = allEndpoints.filter(endpoint => 
          endpoint.path.toLowerCase().includes(query.toLowerCase()) ||
          endpoint.description.toLowerCase().includes(query.toLowerCase()) ||
          endpoint.method.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 200);
    });
  }
}

export default new DocumentationService();