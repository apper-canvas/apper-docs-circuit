import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import EndpointSection from '@/components/organisms/EndpointSection';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import documentationService from '@/services/api/documentationService';

const Functions = () => {
  const [endpoints, setEndpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadEndpoints = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await documentationService.getFunctionEndpoints();
      setEndpoints(data);
    } catch (err) {
      setError('Failed to load function endpoints');
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
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
            <ApperIcon name="Code" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Functions
            </h1>
            <p className="text-xl text-gray-600">
              Create, manage, and deploy serverless functions
            </p>
          </div>
        </div>
        
        <p className="text-lg text-gray-600 leading-relaxed">
          The Functions API allows you to create, update, retrieve, and delete serverless functions. 
          Each function can be configured with custom source code, authentication requirements, and execution permissions.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Function Management</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center mb-4">
              <ApperIcon name="Play" size={20} className="text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Deploy & Execute</h3>
            </div>
            <p className="text-gray-600">
              Functions are automatically deployed and ready to execute immediately after creation.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center mb-4">
              <ApperIcon name="Shield" size={20} className="text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Authentication Control</h3>
            </div>
            <p className="text-gray-600">
              Configure whether functions require authentication and admin privileges.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {endpoints.map((endpoint) => (
          <EndpointSection key={endpoint.id} endpoint={endpoint} />
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Function Execution</h2>
        <p className="text-gray-600 mb-6">
          Once created, each function receives a unique execution URL that you can use to invoke it directly. 
          The execution URL format follows this pattern:
        </p>
        <div className="bg-white border border-gray-200 rounded-lg p-4 font-mono text-sm">
          https://apper-function-proxy.workers.dev/user/[userId]/functions/[functionName]
        </div>
        <p className="text-gray-600 mt-4">
          You can make HTTP requests to this URL to execute your function. The function will receive 
          the request object and can return any valid HTTP response.
        </p>
      </div>
    </motion.div>
  );
};

export default Functions;