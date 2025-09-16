import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import CodeBlock from '@/components/molecules/CodeBlock';

const Authentication = () => {
  const authHeaderExample = `Authorization: Bearer your-token-here`;
  const handleApiCall = async () => {
    try {
      const res = await fetch("https://akshay-test-apper-test-1e4hb.bunny.run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "A":"A"
        })
      });
    } catch (error) {
      console.log(error)
    }
  };

  const curlExample = `curl -X GET 'https://api.apper.com/ap/user/12345/projects/project-123/ApperFunction' \\
  -H 'Authorization: Bearer your-token-here' \\
  -H 'Content-Type: application/json'`;

  const jsExample = `const response = await fetch('https://api.apper.com/ap/user/12345/projects/project-123/ApperFunction', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer your-token-here',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();`;

  const pythonExample = `import requests

headers = {
    'Authorization': 'Bearer your-token-here',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.apper.com/ap/user/12345/projects/project-123/ApperFunction',
    headers=headers
)

data = response.json()`;

  const errorResponse = `{
  "data": null,
  "success": false,
  "message": "Unauthorized: Invalid or missing token"
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
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
            <ApperIcon name="Key" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Authentication
            </h1>
            <p className="text-xl text-gray-600">
              Secure your API requests with Bearer tokens
            </p>
          </div>
        </div>
        
        <p className="text-lg text-gray-600 leading-relaxed">
          The ApperFunctions API uses Bearer token authentication to secure all requests. 
          Every API call must include a valid authentication token in the request headers.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Authentication Method</h2>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
              <ApperIcon name="Shield" size={16} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Bearer Token</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Include your API token in the Authorization header of every request using the Bearer scheme:
          </p>
          <CodeBlock
            code={authHeaderExample}
            language="bash"
            title="Authorization Header"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <ApperIcon name="CheckCircle" size={20} className="text-green-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Secure</h3>
            </div>
            <p className="text-gray-600">
              All API requests are made over HTTPS, ensuring your token and data are encrypted in transit.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <ApperIcon name="Zap" size={20} className="text-blue-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Fast</h3>
            </div>
            <p className="text-gray-600">
              Bearer tokens provide quick authentication without complex handshakes or multiple round trips.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Your Token</h2>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <div className="flex items-start">
            <ApperIcon name="AlertTriangle" size={20} className="text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">API Token Required</h3>
              <p className="text-gray-600">
                You'll need to generate an API token from your Apper dashboard before you can make API requests. 
                Keep your token secure and never expose it in client-side code.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-4 font-semibold">
              1
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Log in to your Apper Dashboard</h3>
              <p className="text-gray-600">
                Visit your Apper dashboard and navigate to the API section under your account settings.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-4 font-semibold">
              2
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Generate a New Token</h3>
              <p className="text-gray-600">
                Click "Generate New Token" and give it a descriptive name for easy management.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-4 font-semibold">
              3
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Copy and Secure Your Token</h3>
              <p className="text-gray-600">
                Copy the generated token immediately and store it securely. For security reasons, 
                the token will only be displayed once.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Examples</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">cURL</h3>
            <CodeBlock
              code={curlExample}
              language="bash"
              title="cURL Example"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">JavaScript</h3>
            <CodeBlock
              code={jsExample}
              language="javascript"
              title="JavaScript Example"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Python</h3>
            <CodeBlock
              code={pythonExample}
              language="python"
              title="Python Example"
            />
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Error Handling</h2>
        
        <p className="text-gray-600 mb-6">
          If your request lacks authentication or uses an invalid token, you'll receive a 401 Unauthorized response:
        </p>
        
        <CodeBlock
          code={errorResponse}
          language="json"
          title="Authentication Error Response"
        />
      </div>

      <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-8 border border-red-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <ApperIcon name="AlertCircle" size={24} className="text-red-600 mr-3" />
          Security Best Practices
        </h2>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start">
            <ApperIcon name="Check" size={16} className="text-red-500 mr-3 mt-0.5" />
            <span>Never expose your API token in client-side code or public repositories</span>
          </li>
          <li className="flex items-start">
            <ApperIcon name="Check" size={16} className="text-red-500 mr-3 mt-0.5" />
            <span>Use environment variables to store your token securely</span>
          </li>
          <li className="flex items-start">
            <ApperIcon name="Check" size={16} className="text-red-500 mr-3 mt-0.5" />
            <span>Regularly rotate your API tokens for enhanced security</span>
          </li>
          <li className="flex items-start">
            <ApperIcon name="Check" size={16} className="text-red-500 mr-3 mt-0.5" />
            <span>Monitor your API usage and revoke tokens if compromised</span>
          </li>
        </ul>
      </div>
      <div className="mt-12">
        <button
          onClick={handleApiCall}
          className="px-5 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90"
        >
          Call API
        </button>        
      </div>
    </motion.div>
  );
};

export default Authentication;