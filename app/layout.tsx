/* eslint-disable @next/next/no-head-element */
import './globals.css';
import AuthContext from './AuthContext';
import ShowSession from './mysession'

//export default function RootLayout({ children, }: { children: React.ReactNode; }) {
export default function RootLayout({ children, }: React.PropsWithChildren) {
  return (
    <html>
      <head></head>
      <body>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AuthContext>
            <ShowSession />
            {children}
          </AuthContext>
        </div>
      </body>
    </html >
  );
}
