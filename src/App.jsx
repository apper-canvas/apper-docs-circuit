import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import Introduction from '@/components/pages/Introduction';
import Authentication from '@/components/pages/Authentication';
import Functions from '@/components/pages/Functions';
import Secrets from '@/components/pages/Secrets';
import Errors from '@/components/pages/Errors';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Layout>
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/authentication" element={<Authentication />} />
            <Route path="/functions" element={<Functions />} />
            <Route path="/secrets" element={<Secrets />} />
            <Route path="/errors" element={<Errors />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="!bg-white !text-gray-900 !border !border-gray-200"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;