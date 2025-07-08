import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import secretService from '@/services/api/secretService';

const Secrets = () => {
  const [secrets, setSecrets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingSecret, setEditingSecret] = useState(null);
  const [showValue, setShowValue] = useState({});
  const [formData, setFormData] = useState({
    Name: '',
    value: '',
    Tags: '',
    project_id: ''
  });

  const loadSecrets = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await secretService.getAll();
      setSecrets(data);
    } catch (err) {
      setError('Failed to load secrets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSecrets();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingSecret) {
      const result = await secretService.update(editingSecret.Id, formData);
      if (result) {
        setSecrets(prev => prev.map(s => s.Id === editingSecret.Id ? result : s));
        setEditingSecret(null);
        setShowCreateForm(false);
        resetForm();
      }
    } else {
      const result = await secretService.create(formData);
      if (result) {
        setSecrets(prev => [result, ...prev]);
        setShowCreateForm(false);
        resetForm();
      }
    }
  };

  const handleEdit = (secret) => {
    setEditingSecret(secret);
    setFormData({
      Name: secret.Name || '',
      value: '', // Don't pre-fill value for security
      Tags: secret.Tags || '',
      project_id: secret.project_id || ''
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (secret) => {
    if (confirm(`Are you sure you want to delete secret "${secret.Name}"?`)) {
      const success = await secretService.delete(secret.Id);
      if (success) {
        setSecrets(prev => prev.filter(s => s.Id !== secret.Id));
      }
    }
  };

  const toggleShowValue = (secretId) => {
    setShowValue(prev => ({
      ...prev,
      [secretId]: !prev[secretId]
    }));
  };

  const maskValue = (value) => {
    if (!value) return '***';
    if (value.length <= 4) return '*'.repeat(value.length);
    return value.substring(0, 2) + '*'.repeat(Math.max(4, value.length - 4)) + value.substring(value.length - 2);
  };

  const resetForm = () => {
    setFormData({
      Name: '',
      value: '',
      Tags: '',
      project_id: ''
    });
  };

  const cancelEdit = () => {
    setEditingSecret(null);
    setShowCreateForm(false);
    resetForm();
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadSecrets} />;
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
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
              <ApperIcon name="Lock" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Secrets</h1>
              <p className="text-xl text-gray-600">Manage encrypted environment variables</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Create Secret
          </Button>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <div className="flex items-start">
            <ApperIcon name="AlertTriangle" size={20} className="text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Notice</h3>
              <p className="text-gray-600">
                Secret values are encrypted and masked for security. Make sure to copy and store your secret values securely when creating them.
              </p>
            </div>
          </div>
        </div>
      </div>

      {showCreateForm && (
        <div className="mb-8 bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingSecret ? 'Edit Secret' : 'Create New Secret'}
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
                  placeholder="SECRET_NAME"
                  disabled={editingSecret} // Name cannot be changed when editing
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project ID</label>
                <Input
                  name="project_id"
                  value={formData.project_id}
                  onChange={handleInputChange}
                  placeholder="Project identifier"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Value *</label>
              <Input
                type="password"
                name="value"
                value={formData.value}
                onChange={handleInputChange}
                required
                placeholder="Secret value"
              />
              {editingSecret && (
                <p className="text-sm text-gray-500 mt-1">
                  Leave empty to keep current value
                </p>
              )}
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

            <div className="flex space-x-2">
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                {editingSecret ? 'Update Secret' : 'Create Secret'}
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
            Secrets ({secrets.length})
          </h2>
        </div>
        
        {secrets.length === 0 ? (
          <div className="p-8 text-center">
            <ApperIcon name="Lock" size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No secrets found. Create your first secret to get started.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {secrets.map((secret) => (
              <div key={secret.Id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {secret.Name}
                      </h3>
                      <ApperIcon name="Lock" size={16} className="text-purple-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">ID: {secret.Id}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Value:</span>
                        <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                          {showValue[secret.Id] ? secret.value : maskValue(secret.value)}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleShowValue(secret.Id)}
                          className="p-1"
                        >
                          <ApperIcon 
                            name={showValue[secret.Id] ? "EyeOff" : "Eye"} 
                            size={14} 
                          />
                        </Button>
                      </div>
                      {secret.Tags && (
                        <p className="text-sm text-gray-500">Tags: {secret.Tags}</p>
                      )}
                      {secret.project_id && (
                        <p className="text-sm text-gray-500">Project: {secret.project_id}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(secret)}
                      className="text-purple-600 hover:text-purple-700"
                    >
                      <ApperIcon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(secret)}
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

export default Secrets;