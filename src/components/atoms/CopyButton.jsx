import { useState } from 'react';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const CopyButton = ({ text, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className={`${className} h-8 w-8 p-0 hover:bg-gray-100`}
      aria-label="Copy to clipboard"
    >
      <ApperIcon 
        name={copied ? 'Check' : 'Copy'} 
        size={16} 
        className={copied ? 'text-green-600' : 'text-gray-500'} 
      />
    </Button>
  );
};

export default CopyButton;