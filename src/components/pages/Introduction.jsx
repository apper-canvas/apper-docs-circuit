import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import CodeBlock from '@/components/molecules/CodeBlock';

const Introduction = () => {
  const quickStartCode = `// Install the Apper SDK
npm install @apper/sdk

// Create your first function
import { createUniversalApp } from '@apper/sdk';

async function handler(request) {
  return new Response(JSON.stringify({
    message: "Hello from Apper Functions!"
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

const app = createUniversalApp({ cors: true });
await app.serve(handler);`;

  const authExample = `// Using the API with authentication
const response = await fetch('https://api.apper.com/ap/user/12345/projects/project-123/ApperFunction', {
  headers: {
    'Authorization': 'Bearer your-token-here',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center mr-4">
            <ApperIcon name="Zap" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              ApperFunctions API
            </h1>
            <p className="text-xl text-gray-600">
              Build and deploy serverless functions with ease
            </p>
          </div>
        </div>
        
        <p className="text-lg text-gray-600 leading-relaxed">
          The ApperFunctions API allows you to create, manage, and deploy serverless functions 
          in the cloud. With support for JavaScript, TypeScript, and modern web standards, 
          you can build powerful applications without managing infrastructure.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <ApperIcon name="Rocket" size={16} className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Quick Start</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Deploy your first function in minutes with our simple API and SDK.
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <ApperIcon name="Check" size={16} className="text-green-500 mr-2" />
              No infrastructure setup required
            </li>
            <li className="flex items-center">
              <ApperIcon name="Check" size={16} className="text-green-500 mr-2" />
              Automatic scaling and deployment
            </li>
            <li className="flex items-center">
              <ApperIcon name="Check" size={16} className="text-green-500 mr-2" />
              Built-in CORS and security
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <ApperIcon name="Shield" size={16} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Secure by Default</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Built-in authentication, encryption, and security best practices.
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <ApperIcon name="Check" size={16} className="text-green-500 mr-2" />
              Bearer token authentication
            </li>
            <li className="flex items-center">
              <ApperIcon name="Check" size={16} className="text-green-500 mr-2" />
              Encrypted environment variables
            </li>
            <li className="flex items-center">
              <ApperIcon name="Check" size={16} className="text-green-500 mr-2" />
              Role-based access control
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Authentication</h3>
            <p className="text-gray-600 mb-4">
              All API requests require authentication using a Bearer token. You can obtain 
              your API token from your Apper dashboard.
            </p>
            <CodeBlock
              code={authExample}
              language="javascript"
              title="Authentication Example"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Create Your First Function</h3>
            <p className="text-gray-600 mb-4">
              Functions are written in JavaScript and deployed to our serverless platform. 
              Here's a simple example to get you started:
            </p>
            <CodeBlock
              code={quickStartCode}
              language="javascript"
              title="Quick Start Example"
            />
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">API Overview</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center mb-3">
              <ApperIcon name="Code" size={20} className="text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Functions</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Create, update, and manage serverless functions with full lifecycle control.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">GET</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">POST</span>
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">PUT</span>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">DELETE</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center mb-3">
              <ApperIcon name="Lock" size={20} className="text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Secrets</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Manage encrypted environment variables and sensitive configuration data.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">GET</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">POST</span>
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">PUT</span>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">DELETE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
        <p className="text-gray-600 mb-6">
          Our documentation covers everything you need to know about the ApperFunctions API. 
          If you need additional support, we're here to help.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <ApperIcon name="BookOpen" size={16} className="mr-2" />
            View Examples
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <ApperIcon name="MessageCircle" size={16} className="mr-2" />
            Contact Support
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <ApperIcon name="Github" size={16} className="mr-2" />
            GitHub Examples
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Introduction;