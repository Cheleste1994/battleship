import { Suspense } from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Loading from './components/Loading/Loading';
import Home from './pages/Home/Home';
import { store } from './store/store';

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      </Provider>
    </ErrorBoundary>
  );
}
