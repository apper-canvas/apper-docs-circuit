import { motion } from 'framer-motion';

const Loading = ({ type = 'skeleton' }) => {
  if (type === 'skeleton') {
    return (
      <div className="animate-pulse">
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
                <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
              </div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              <div className="h-32 w-full bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
      />
    </div>
  );
};

export default Loading;