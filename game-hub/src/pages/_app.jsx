// /src/pages/_app.jsx
import '../styles/globals.css'; // Import global styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Header from '../components/Header'; // Import Header

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <main style={{ padding: '20px' }}>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default MyApp;
