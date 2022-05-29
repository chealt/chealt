import { useRoute } from 'preact-iso';

const View = () => {
  const {
    params: { documentKey }
  } = useRoute();

  console.log(documentKey);

  return <div />;
};

export default View;
