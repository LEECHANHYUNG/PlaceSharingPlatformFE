import { signOut, useSession } from 'next-auth/react';

import { useEffect } from 'react';

const refreshTokenHandler = () => {
  const session = useSession();
  useEffect(() => {
    if (!!session) {
      if (
        session.status === 'authenticated' &&
        !session.data.user.accessToken
      ) {
        signOut({ redirect: false });
      }
      if (session.status === 'unauthenticated') {
        signOut({ redirect: false });
      }
    }
  }, [session]);
  return null;
};

export default refreshTokenHandler;
