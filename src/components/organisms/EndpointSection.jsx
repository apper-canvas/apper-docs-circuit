import { useState } from 'react';
import MethodBadge from '@/components/molecules/MethodBadge';
import ParameterTable from '@/components/molecules/ParameterTable';
import CodeBlock from '@/components/molecules/CodeBlock';
import { ApperIcon } from '@/components/ApperIcon';

const EndpointSection = ({ endpoint }) => {
  const { method, path, description, parameters, examples, responses } = endpoint;
  const [expandedExamples, setExpandedExamples] = useState({});

  const toggleExample = (type) => {
    setExpandedExamples(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="mb-12 pb-8 border-b border-gray-200 last:border-b-0">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <MethodBadge method={method} />
          <code className="text-lg font-mono text-gray-900 bg-gray-100 px-3 py-1 rounded">
            {path}
          </code>
        </div>
        <p className="text-gray-600 text-base leading-relaxed">
          {description}
        </p>
      </div>

      {parameters && parameters.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Parameters</h4>
          <ParameterTable parameters={parameters} />
        </div>
      )}

{examples && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Request Examples</h4>
          <div className="space-y-3">
            {examples.curl && (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleExample('curl')}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">cURL</span>
                    <span className="text-sm text-gray-500">Command Line</span>
                  </div>
                  <ApperIcon 
                    name={expandedExamples.curl ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-gray-400 transition-transform duration-200"
                  />
                </button>
                {expandedExamples.curl && (
                  <div className="border-t border-gray-200">
                    <CodeBlock
                      title=""
                      code={examples.curl}
                      language="bash"
                    />
                  </div>
                )}
              </div>
            )}
            
            {examples.javascript && (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleExample('javascript')}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">JavaScript</span>
                    <span className="text-sm text-gray-500">Fetch API</span>
                  </div>
                  <ApperIcon 
                    name={expandedExamples.javascript ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-gray-400 transition-transform duration-200"
                  />
                </button>
                {expandedExamples.javascript && (
                  <div className="border-t border-gray-200">
                    <CodeBlock
                      title=""
                      code={examples.javascript}
                      language="javascript"
                    />
                  </div>
                )}
              </div>
            )}
            
            {examples.python && (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleExample('python')}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">Python</span>
                    <span className="text-sm text-gray-500">Requests Library</span>
                  </div>
                  <ApperIcon 
                    name={expandedExamples.python ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-gray-400 transition-transform duration-200"
                  />
                </button>
                {expandedExamples.python && (
                  <div className="border-t border-gray-200">
                    <CodeBlock
                      title=""
                      code={examples.python}
                      language="python"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {responses && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Response Examples</h4>
          <div className="space-y-4">
            {responses.success && (
              <CodeBlock
                title="Success Response"
                code={responses.success}
                language="json"
              />
            )}
            {responses.error && (
              <CodeBlock
                title="Error Response"
                code={responses.error}
                language="json"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EndpointSection;