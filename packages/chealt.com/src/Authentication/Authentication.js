import { useSecure } from './secure';

const Authentication = ({ children }) => {
  const { isAuthenticated } = useSecure();

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default Authentication;
