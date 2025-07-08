import { toast } from 'react-toastify';

class FunctionService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'apper_function';
  }

  // Get all functions
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "label" } },
          { field: { Name: "script_id" } },
          { field: { Name: "execution_url" } },
          { field: { Name: "is_deployed" } },
          { field: { Name: "is_active" } },
          { field: { Name: "last_deployed_at" } },
          { field: { Name: "require_authentication" } },
          { field: { Name: "run_as_admin" } },
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
        console.error("Error fetching functions:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error fetching functions:", error.message);
        toast.error("Failed to load functions");
      }
      return [];
    }
  }

  // Get function by ID
  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "label" } },
          { field: { Name: "script_id" } },
          { field: { Name: "execution_url" } },
          { field: { Name: "is_deployed" } },
          { field: { Name: "is_active" } },
          { field: { Name: "last_deployed_at" } },
          { field: { Name: "require_authentication" } },
          { field: { Name: "run_as_admin" } },
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
        console.error(`Error fetching function with ID ${id}:`, error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error(`Error fetching function with ID ${id}:`, error.message);
        toast.error("Failed to load function");
      }
      return null;
    }
  }

  // Create new function
  async create(functionData) {
    try {
      // Only include Updateable fields
      const params = {
        records: [
          {
            Name: functionData.Name,
            Tags: functionData.Tags || "",
            Owner: functionData.Owner,
            label: functionData.label,
            script_id: functionData.script_id || "",
            execution_url: functionData.execution_url || "",
            is_deployed: functionData.is_deployed || false,
            is_active: functionData.is_active || true,
            last_deployed_at: functionData.last_deployed_at || null,
            require_authentication: functionData.require_authentication || false,
            run_as_admin: functionData.run_as_admin || false
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
          console.error(`Failed to create ${failedRecords.length} functions:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          toast.success("Function created successfully");
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating function:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error creating function:", error.message);
        toast.error("Failed to create function");
      }
      return null;
    }
  }

  // Update function
  async update(id, functionData) {
    try {
      // Only include Updateable fields plus Id
      const params = {
        records: [
          {
            Id: id,
            Name: functionData.Name,
            Tags: functionData.Tags,
            Owner: functionData.Owner,
            label: functionData.label,
            script_id: functionData.script_id,
            execution_url: functionData.execution_url,
            is_deployed: functionData.is_deployed,
            is_active: functionData.is_active,
            last_deployed_at: functionData.last_deployed_at,
            require_authentication: functionData.require_authentication,
            run_as_admin: functionData.run_as_admin
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
          console.error(`Failed to update ${failedUpdates.length} functions:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          toast.success("Function updated successfully");
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating function:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error updating function:", error.message);
        toast.error("Failed to update function");
      }
      return null;
    }
  }

  // Delete function
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
          console.error(`Failed to delete ${failedDeletions.length} functions:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulDeletions.length > 0) {
          toast.success("Function deleted successfully");
          return true;
        }
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting function:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error deleting function:", error.message);
        toast.error("Failed to delete function");
      }
      return false;
    }
  }
}

export default new FunctionService();