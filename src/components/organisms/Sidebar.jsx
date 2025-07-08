import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import NavigationItem from '@/components/molecules/NavigationItem';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';

const Sidebar = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    { path: '/introduction', icon: 'Home', label: 'Introduction' },
    { path: '/authentication', icon: 'Key', label: 'Authentication' },
    { path: '/functions', icon: 'Code', label: 'Functions' },
    { path: '/secrets', icon: 'Lock', label: 'Secrets' },
    { path: '/errors', icon: 'AlertTriangle', label: 'Errors' }
  ];

  const filteredItems = navigationItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
      <div className="flex flex-col h-full bg-white border-r border-gray-200">
        <div className="flex-shrink-0 px-6 py-4">
          <div className="flex items-center">
            <ApperIcon name="FileText" size={24} className="text-primary mr-3" />
            <h1 className="text-xl font-bold text-gray-900">ApperDocs</h1>
          </div>
        </div>

        <div className="flex-1 px-4 pb-4 overflow-y-auto sidebar-scroll">
          <div className="mb-4">
            <SearchBar 
              onSearch={setSearchQuery}
              placeholder="Search docs..."
            />
          </div>

          <nav className="space-y-1">
            {filteredItems.map((item) => (
              <NavigationItem
                key={item.path}
                to={item.path}
                icon={item.icon}
              >
                {item.label}
              </NavigationItem>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-25"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg"
          >
            <div className="flex flex-col h-full">
              <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ApperIcon name="FileText" size={24} className="text-primary mr-3" />
                    <h1 className="text-xl font-bold text-gray-900">ApperDocs</h1>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="h-8 w-8 p-0"
                  >
                    <ApperIcon name="X" size={20} />
                  </Button>
                </div>
              </div>

              <div className="flex-1 px-4 py-4 overflow-y-auto">
                <div className="mb-4">
                  <SearchBar 
                    onSearch={setSearchQuery}
                    placeholder="Search docs..."
                  />
                </div>

                <nav className="space-y-1">
                  {filteredItems.map((item) => (
                    <NavigationItem
                      key={item.path}
                      to={item.path}
                      icon={item.icon}
                    >
                      {item.label}
                    </NavigationItem>
                  ))}
                </nav>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;