import { useEffect, useRef } from 'react';
import CopyButton from '@/components/atoms/CopyButton';

const CodeBlock = ({ code, language = 'javascript', title }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      // Simple syntax highlighting for demonstration
      // In production, you'd use a library like Prism.js
      codeRef.current.innerHTML = highlightCode(code, language);
    }
  }, [code, language]);

  const highlightCode = (code, lang) => {
    if (lang === 'json') {
      return code
        .replace(/"([^"]*)":/g, '<span class="token property">"$1":</span>')
        .replace(/: "([^"]*)"/g, ': <span class="token string">"$1"</span>')
        .replace(/: (\d+)/g, ': <span class="token number">$1</span>')
        .replace(/: (true|false)/g, ': <span class="token boolean">$1</span>')
        .replace(/: (null)/g, ': <span class="token null">$1</span>');
    }
    
    if (lang === 'bash') {
      return code
        .replace(/(-H|--header|--request|--data)/g, '<span class="token keyword">$1</span>')
        .replace(/(curl)/g, '<span class="token function">$1</span>')
        .replace(/'([^']*)'/g, '<span class="token string">\'$1\'</span>')
        .replace(/"([^"]*)"/g, '<span class="token string">"$1"</span>');
    }
    
    return code
      .replace(/(const|let|var|function|async|await|return|import|from)/g, '<span class="token keyword">$1</span>')
      .replace(/(fetch|Response|JSON)/g, '<span class="token function">$1</span>')
      .replace(/'([^']*)'/g, '<span class="token string">\'$1\'</span>')
      .replace(/"([^"]*)"/g, '<span class="token string">"$1"</span>');
  };

  return (
    <div className="relative">
      {title && (
        <div className="bg-gray-50 px-4 py-2 border border-b-0 border-gray-200 rounded-t-lg">
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
      )}
      <div className="relative bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
        <div className="absolute top-3 right-3 z-10">
          <CopyButton text={code} />
        </div>
        <pre className="prism-code overflow-x-auto">
          <code ref={codeRef} className="block">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;