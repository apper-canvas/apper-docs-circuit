import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import EndpointSection from '@/components/organisms/EndpointSection';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import documentationService from '@/services/api/documentationService';

const Secrets = () => {
  const [endpoints, setEndpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadEndpoints = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await documentationService.getSecretEndpoints();
      setEndpoints(data);
    } catch (err) {
      setError('Failed to load secret endpoints');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEndpoints();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadEndpoints} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
            <ApperIcon name="Lock" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Secrets
            </h1>
            <p className="text-xl text-gray-600">
              Manage encrypted environment variables and configuration
            </p>
          </div>
        </div>
        
        <p className="text-lg text-gray-600 leading-relaxed">
          The Secrets API allows you to securely store and manage environment variables, API keys, 
          and other sensitive configuration data. All secret values are encrypted at rest and 
          accessible to your functions at runtime.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Secret Management</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center mb-4">
              <ApperIcon name="Shield" size={20} className="text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Encrypted Storage</h3>
            </div>
            <p className="text-gray-600">
              All secret values are encrypted using industry-standard encryption algorithms before storage.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center mb-4">
              <ApperIcon name="Eye" size={20} className="text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Masked Values</h3>
            </div>
            <p className="text-gray-600">
              Secret values are masked in API responses to prevent accidental exposure in logs.
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <div className="flex items-start">
            <ApperIcon name="AlertTriangle" size={20} className="text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Notice</h3>
              <p className="text-gray-600">
                Secret values are only displayed in full when initially created. After that, they are masked 
                for security. Make sure to copy and store your secret values securely when creating them.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {endpoints.map((endpoint) => (
          <EndpointSection key={endpoint.id} endpoint={endpoint} />
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-8 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Using Secrets in Functions</h2>
        <p className="text-gray-600 mb-6">
          Secrets are automatically available as environment variables in your functions. 
          You can access them using the standard environment variable syntax:
        </p>
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
          <code className="text-sm font-mono text-gray-900">
            {`// Access secrets in your function code
const apiKey = process.env.API_KEY;
const databaseUrl = process.env.DATABASE_URL;

// Use them in your function logic
const response = await fetch('https://api.example.com/data', {
  headers: {
    'Authorization': \`Bearer \${apiKey}\`
  }
});`}
          </code>
        </div>
        <p className="text-gray-600">
          Environment variables are injected at runtime, so you don't need to worry about 
          managing or updating function code when secret values change.
        </p>
      </div>
    </motion.div>
  );
};

export default Secrets;