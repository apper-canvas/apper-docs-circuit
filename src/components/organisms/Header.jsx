import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Header = ({ onMenuClick }) => {
  return (
    <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="h-8 w-8 p-0 mr-3"
          >
            <ApperIcon name="Menu" size={20} />
          </Button>
          <div className="flex items-center">
            <ApperIcon name="FileText" size={20} className="text-primary mr-2" />
            <h1 className="text-lg font-bold text-gray-900">ApperDocs</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <ApperIcon name="Github" size={16} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;