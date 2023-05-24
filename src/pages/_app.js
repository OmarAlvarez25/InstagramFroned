import '@/styles/globals.scss';

// Redux Store
import { Provider } from 'react-redux';
import { store } from '@/store/store';

import { Toaster } from 'sonner';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster richColors closeButton />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
