import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import CodeBlock from '@/components/molecules/CodeBlock';
import Badge from '@/components/atoms/Badge';

const Errors = () => {
  const errorCodes = [
    {
      code: 200,
      status: 'OK',
      description: 'Request succeeded',
      type: 'success'
    },
    {
      code: 201,
      status: 'Created',
      description: 'Resource created successfully',
      type: 'success'
    },
    {
      code: 400,
      status: 'Bad Request',
      description: 'Invalid request format or parameters',
      type: 'error'
    },
    {
      code: 401,
      status: 'Unauthorized',
      description: 'Authentication token is missing or invalid',
      type: 'error'
    },
    {
      code: 403,
      status: 'Forbidden',
      description: 'Insufficient permissions to access resource',
      type: 'error'
    },
    {
      code: 404,
      status: 'Not Found',
      description: 'Resource does not exist',
      type: 'error'
    },
    {
      code: 409,
      status: 'Conflict',
      description: 'Resource already exists or conflict detected',
      type: 'error'
    },
    {
      code: 422,
      status: 'Unprocessable Entity',
      description: 'Request contains invalid data',
      type: 'error'
    },
    {
      code: 429,
      status: 'Too Many Requests',
      description: 'Rate limit exceeded',
      type: 'error'
    },
    {
      code: 500,
      status: 'Internal Server Error',
      description: 'Server encountered an unexpected error',
      type: 'error'
    }
  ];

  const errorResponse = `{
  "data": null,
  "success": false,
  "message": "Function not found"
}`;

  const validationErrorResponse = `{
  "data": null,
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "Name",
      "message": "Function name is required"
    },
    {
      "field": "SourceCode",
      "message": "Source code cannot be empty"
    }
  ]
}`;

  const rateLimitResponse = `{
  "data": null,
  "success": false,
  "message": "Rate limit exceeded. Please try again later."
}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
            <ApperIcon name="AlertTriangle" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Errors
            </h1>
            <p className="text-xl text-gray-600">
              Understanding API error responses and troubleshooting
            </p>
          </div>
        </div>
        
        <p className="text-lg text-gray-600 leading-relaxed">
          The ApperFunctions API uses standard HTTP status codes to indicate the success or failure of requests. 
          All error responses follow a consistent format to help you understand and handle errors effectively.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Error Response Format</h2>
        
        <p className="text-gray-600 mb-6">
          All API responses follow a consistent structure with a <code className="bg-gray-100 px-2 py-1 rounded">success</code> boolean, 
          optional <code className="bg-gray-100 px-2 py-1 rounded">data</code> field, and descriptive 
          <code className="bg-gray-100 px-2 py-1 rounded">message</code>:
        </p>
        
        <CodeBlock
          code={errorResponse}
          language="json"
          title="Standard Error Response"
        />
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">HTTP Status Codes</h2>
        
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {errorCodes.map((error, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={error.type === 'success' ? 'get' : 'delete'}>
                        {error.code}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{error.status}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {error.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Error Scenarios</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Validation Errors</h3>
            <p className="text-gray-600 mb-4">
              When request data fails validation, the API returns a 422 status with detailed field-level errors:
            </p>
            <CodeBlock
              code={validationErrorResponse}
              language="json"
              title="Validation Error Response"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Rate Limiting</h3>
            <p className="text-gray-600 mb-4">
              If you exceed the API rate limits, you'll receive a 429 status code:
            </p>
            <CodeBlock
              code={rateLimitResponse}
              language="json"
              title="Rate Limit Error Response"
            />
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting Guide</h2>
        
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-start">
              <ApperIcon name="AlertCircle" size={20} className="text-red-600 mr-3 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">401 Unauthorized</h3>
                <p className="text-gray-600 mb-3">
                  This error occurs when your authentication token is missing, invalid, or expired.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Verify your token is included in the Authorization header</li>
                  <li>• Check that the token format is correct: <code className="bg-gray-100 px-1 rounded">Bearer your-token</code></li>
                  <li>• Ensure your token hasn't expired</li>
                  <li>• Generate a new token if the current one is compromised</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start">
              <ApperIcon name="Search" size={20} className="text-blue-600 mr-3 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">404 Not Found</h3>
                <p className="text-gray-600 mb-3">
                  The requested resource doesn't exist or you don't have permission to access it.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Double-check the endpoint URL and parameters</li>
                  <li>• Verify that the resource ID exists</li>
                  <li>• Confirm you have the correct project and user IDs</li>
                  <li>• Check your account permissions</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start">
              <ApperIcon name="Clock" size={20} className="text-yellow-600 mr-3 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">429 Rate Limited</h3>
                <p className="text-gray-600 mb-3">
                  You're making too many requests too quickly. Implement proper rate limiting in your application.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Implement exponential backoff for retries</li>
                  <li>• Cache responses where appropriate</li>
                  <li>• Batch multiple operations when possible</li>
                  <li>• Monitor your API usage patterns</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <div className="flex items-start">
              <ApperIcon name="AlertTriangle" size={20} className="text-purple-600 mr-3 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">500 Internal Server Error</h3>
                <p className="text-gray-600 mb-3">
                  Something went wrong on our end. These errors are typically temporary.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Try the request again after a brief delay</li>
                  <li>• Check our status page for any ongoing issues</li>
                  <li>• Contact support if the error persists</li>
                  <li>• Include the full error response when reporting issues</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
        <p className="text-gray-600 mb-6">
          If you're still experiencing issues after following this troubleshooting guide, 
          we're here to help. Our support team can assist with API integration challenges.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <ApperIcon name="MessageCircle" size={16} className="mr-2" />
            Contact Support
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <ApperIcon name="ExternalLink" size={16} className="mr-2" />
            Status Page
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <ApperIcon name="BookOpen" size={16} className="mr-2" />
            API Examples
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Errors;