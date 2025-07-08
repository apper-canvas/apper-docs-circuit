import { toast } from 'react-toastify';

class SecretService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'secret';
  }

  // Get all secrets
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "value" } },
          { field: { Name: "project_id" } },
          { field: { Name: "created_on" } },
          { field: { Name: "modified_on" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "ModifiedOn" } }
        ],
        orderBy: [
          {
            fieldName: "ModifiedOn",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 50,
          offset: 0
        }
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching secrets:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error fetching secrets:", error.message);
        toast.error("Failed to load secrets");
      }
      return [];
    }
  }

  // Get secret by ID
  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "value" } },
          { field: { Name: "project_id" } },
          { field: { Name: "created_on" } },
          { field: { Name: "modified_on" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "ModifiedOn" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching secret with ID ${id}:`, error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error(`Error fetching secret with ID ${id}:`, error.message);
        toast.error("Failed to load secret");
      }
      return null;
    }
  }

  // Create new secret
  async create(secretData) {
    try {
      // Only include Updateable fields
      const params = {
        records: [
          {
            Name: secretData.Name,
            Tags: secretData.Tags || "",
            Owner: secretData.Owner,
            value: secretData.value,
            project_id: secretData.project_id || "",
            created_on: secretData.created_on || new Date().toISOString(),
            modified_on: secretData.modified_on || new Date().toISOString()
          }
        ]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} secrets:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          toast.success("Secret created successfully");
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating secret:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error creating secret:", error.message);
        toast.error("Failed to create secret");
      }
      return null;
    }
  }

  // Update secret
  async update(id, secretData) {
    try {
      // Only include Updateable fields plus Id
      const params = {
        records: [
          {
            Id: id,
            Name: secretData.Name,
            Tags: secretData.Tags,
            Owner: secretData.Owner,
            value: secretData.value,
            project_id: secretData.project_id,
            created_on: secretData.created_on,
            modified_on: new Date().toISOString()
          }
        ]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} secrets:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          toast.success("Secret updated successfully");
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating secret:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error updating secret:", error.message);
        toast.error("Failed to update secret");
      }
      return null;
    }
  }

  // Delete secret
  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} secrets:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulDeletions.length > 0) {
          toast.success("Secret deleted successfully");
          return true;
        }
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting secret:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error deleting secret:", error.message);
        toast.error("Failed to delete secret");
      }
      return false;
    }
  }
}

export default new SecretService();