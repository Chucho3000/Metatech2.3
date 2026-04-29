import { HeadContent, Scripts, createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { Leaf, Recycle } from 'lucide-react'
import { StoreProvider, useStore } from '../StoreContext'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Metatech',
      },
    ],
  }),
  shellComponent: RootDocument,
  component: RootComponent,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-brand-mint selection:text-brand-purple flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-brand-deep via-brand-blue to-brand-mint text-white py-8 px-4 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <Link to="/" className="text-4xl md:text-5xl font-bold tracking-tight mb-2 drop-shadow-sm flex items-center justify-center md:justify-start gap-3 hover:opacity-90 transition-opacity">
              <img src="/logo.png" alt="Metatech logo" className="w-20 h-20 object-contain animate-pulse" />
              Metatech
            </Link>
            <p className="text-lg md:text-xl font-light text-brand-neon tracking-wide mt-2">
              Tecnología que cuida el planeta desde tu hogar
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 md:py-12">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-8 text-center mt-auto">
        <p className="text-gray-500 flex items-center justify-center gap-2 font-medium">
          <Leaf className="w-4 h-4 text-brand-mint" />
          Metatech © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}
