import { h } from 'preact';
import { useContext } from 'preact/hooks';

import Page from '../../components/Page/Page';
import Title from '../../components/Page/Title';
import GoogleSessions from '../../components/GoogleFit/Sessions/Sessions';
import Toast from '../../components/Toast/Toast';
import { Context } from '../../components/context';
import NoAuth from '../../components/Authentication/NoAuth';

const Home = () => {
  const { googleUser, isLoadingAuth } = useContext(Context);

  return (
    <>
      <Page>
        <Title>Fitter</Title>
        {googleUser && (
          <GoogleSessions />
        )}
        {!googleUser && !isLoadingAuth && (
          <NoAuth />
        )}
      </Page>
      <Toast />
    </>
  );
};

export default Home;
