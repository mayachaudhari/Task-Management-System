/*import './globals.css'
import { AuthProvider } from '../context/AuthContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
*/
/*
import './globals.css'
import { AuthProvider } from '../context/AuthContext'

export const metadata = {
  title: 'Task Manager',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
*/


/*
//updated
import './globals.css';
import ClientSocketWrapper from './ClientSocketWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {}
        <ClientSocketWrapper>
          {children}
        </ClientSocketWrapper>
      </body>
    </html>
  );
}


*/

import './globals.css';
import ClientSocketWrapper from './ClientSocketWrapper';
import { AuthProvider } from '../context/AuthContext';  // Adjust path as needed

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {/* Wrap your app with the client socket provider */}
          <ClientSocketWrapper>
            {children}
          </ClientSocketWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
