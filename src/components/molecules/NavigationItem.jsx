import { NavLink } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const NavigationItem = ({ to, icon, children, isActive }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
        ${isActive 
          ? 'bg-primary text-white' 
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        }
      `}
    >
      <ApperIcon name={icon} size={16} className="mr-3" />
      {children}
    </NavLink>
  );
};

export default NavigationItem;