import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import functionService from '@/services/api/functionService';

const Functions = () => {
  const [functions, setFunctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingFunction, setEditingFunction] = useState(null);
  const [formData, setFormData] = useState({
    Name: '',
    label: '',
    Tags: '',
    script_id: '',
    execution_url: '',
    is_deployed: false,
    is_active: true,
    require_authentication: false,
    run_as_admin: false
  });

  const loadFunctions = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await functionService.getAll();
      setFunctions(data);
    } catch (err) {
      setError('Failed to load functions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFunctions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingFunction) {
      const result = await functionService.update(editingFunction.Id, formData);
      if (result) {
        setFunctions(prev => prev.map(f => f.Id === editingFunction.Id ? result : f));
        setEditingFunction(null);
        setShowCreateForm(false);
        resetForm();
      }
    } else {
      const result = await functionService.create(formData);
      if (result) {
        setFunctions(prev => [result, ...prev]);
        setShowCreateForm(false);
        resetForm();
      }
    }
  };

  const handleEdit = (func) => {
    setEditingFunction(func);
    setFormData({
      Name: func.Name || '',
      label: func.label || '',
      Tags: func.Tags || '',
      script_id: func.script_id || '',
      execution_url: func.execution_url || '',
      is_deployed: func.is_deployed || false,
      is_active: func.is_active !== false,
      require_authentication: func.require_authentication || false,
      run_as_admin: func.run_as_admin || false
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (func) => {
    if (confirm(`Are you sure you want to delete "${func.Name || func.label}"?`)) {
      const success = await functionService.delete(func.Id);
      if (success) {
        setFunctions(prev => prev.filter(f => f.Id !== func.Id));
      }
    }
  };

  const resetForm = () => {
    setFormData({
      Name: '',
      label: '',
      Tags: '',
      script_id: '',
      execution_url: '',
      is_deployed: false,
      is_active: true,
      require_authentication: false,
      run_as_admin: false
    });
  };

  const cancelEdit = () => {
    setEditingFunction(null);
    setShowCreateForm(false);
    resetForm();
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadFunctions} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
              <ApperIcon name="Code" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Functions</h1>
              <p className="text-xl text-gray-600">Manage your serverless functions</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Create Function
          </Button>
        </div>
      </div>

      {showCreateForm && (
        <div className="mb-8 bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingFunction ? 'Edit Function' : 'Create New Function'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <Input
                  name="Name"
                  value={formData.Name}
                  onChange={handleInputChange}
                  required
                  placeholder="Function name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <Input
                  name="label"
                  value={formData.label}
                  onChange={handleInputChange}
                  placeholder="Display label"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <Input
                  name="Tags"
                  value={formData.Tags}
                  onChange={handleInputChange}
                  placeholder="Comma-separated tags"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Script ID</label>
                <Input
                  name="script_id"
                  value={formData.script_id}
                  onChange={handleInputChange}
                  placeholder="Script identifier"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Execution URL</label>
              <Input
                name="execution_url"
                value={formData.execution_url}
                onChange={handleInputChange}
                placeholder="Function execution URL"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="is_deployed"
                  checked={formData.is_deployed}
                  onChange={handleInputChange}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Is Deployed</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Is Active</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="require_authentication"
                  checked={formData.require_authentication}
                  onChange={handleInputChange}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Require Auth</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="run_as_admin"
                  checked={formData.run_as_admin}
                  onChange={handleInputChange}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Run as Admin</span>
              </label>
            </div>

            <div className="flex space-x-2">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {editingFunction ? 'Update Function' : 'Create Function'}
              </Button>
              <Button type="button" variant="ghost" onClick={cancelEdit}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Functions ({functions.length})
          </h2>
        </div>
        
        {functions.length === 0 ? (
          <div className="p-8 text-center">
            <ApperIcon name="Code" size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No functions found. Create your first function to get started.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {functions.map((func) => (
              <div key={func.Id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {func.label || func.Name}
                      </h3>
                      <div className="flex space-x-2">
                        {func.is_active && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Active
                          </span>
                        )}
                        {func.is_deployed && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Deployed
                          </span>
                        )}
                        {func.require_authentication && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                            Auth Required
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">ID: {func.Id}</p>
                    {func.execution_url && (
                      <p className="text-sm text-gray-500 font-mono break-all">
                        {func.execution_url}
                      </p>
                    )}
                    {func.Tags && (
                      <p className="text-sm text-gray-500 mt-1">Tags: {func.Tags}</p>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(func)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <ApperIcon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(func)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <ApperIcon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Functions;