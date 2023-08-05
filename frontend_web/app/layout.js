import './globals.css';
import { Inter } from 'next/font/google';
import ServiceWorkerProvider from '@/shared/providers/ServiceWorkerProvider';
import RecoilProvider from '@/shared/providers/RecoilProvider';
import { IsClientCtxProvider } from '@/shared/providers/IsClientCtxProvider';
import ReactQueryProvider from '@/shared/providers/ReactQueryProvider';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import '@fortawesome/fontawesome-svg-core/styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Flashlyf',
  description: 'The time based social media.',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ServiceWorkerProvider /> */}
        <RecoilProvider>
          <IsClientCtxProvider>
            <ReactQueryProvider>
              <ToastContainer />
              {children}
            </ReactQueryProvider>
          </IsClientCtxProvider>
        </RecoilProvider>
      </body>
    </html>
  )
}
