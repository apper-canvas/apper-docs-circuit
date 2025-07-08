import Badge from '@/components/atoms/Badge';

const MethodBadge = ({ method }) => {
  const getVariant = (method) => {
    switch (method.toUpperCase()) {
      case 'GET':
        return 'get';
      case 'POST':
        return 'post';
      case 'PUT':
        return 'put';
      case 'DELETE':
        return 'delete';
      default:
        return 'default';
    }
  };

  return (
    <Badge variant={getVariant(method)}>
      {method.toUpperCase()}
    </Badge>
  );
};

export default MethodBadge;