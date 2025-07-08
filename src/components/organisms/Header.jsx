import { useContext } from 'react';
import { useSelector } from 'react-redux';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import { AuthContext } from '@/App';

const Header = ({ onMenuClick }) => {
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      await logout();
    }
  };

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
            onClick={handleLogout}
            className="h-8 px-2 text-sm"
            title="Logout"
          >
            <ApperIcon name="LogOut" size={16} className="mr-1" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;