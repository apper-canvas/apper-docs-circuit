import MethodBadge from '@/components/molecules/MethodBadge';
import ParameterTable from '@/components/molecules/ParameterTable';
import CodeBlock from '@/components/molecules/CodeBlock';

const EndpointSection = ({ endpoint }) => {
  const { method, path, description, parameters, examples, responses } = endpoint;

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
          <div className="space-y-4">
            {examples.curl && (
              <CodeBlock
                title="cURL"
                code={examples.curl}
                language="bash"
              />
            )}
            {examples.javascript && (
              <CodeBlock
                title="JavaScript"
                code={examples.javascript}
                language="javascript"
              />
            )}
            {examples.python && (
              <CodeBlock
                title="Python"
                code={examples.python}
                language="python"
              />
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