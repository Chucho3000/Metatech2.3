import { createFileRoute, Link } from '@tanstack/react-router'
import { MapPin, ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/mapa')({
  component: Mapa,
})

function Mapa() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => setMounted(true), [])

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors font-medium">
        <ArrowLeft className="w-5 h-5" /> Volver al Inicio
      </Link>
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col h-[70vh] min-h-[500px]">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-3 rounded-xl">
              <MapPin className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Centros de Reciclaje en Querétaro</h2>
              <p className="text-gray-500">Encuentra dónde llevar tus latas compactadas</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 w-full bg-gray-100 relative">
          {mounted ? (
            <iframe 
              title="Centros de reciclaje en Querétaro"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy" 
              allowFullScreen 
              referrerPolicy="no-referrer-when-downgrade" 
              src="https://maps.google.com/maps?q=recicladora%20de%20latas%20queretaro&t=&z=12&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 grayscale-[20%] contrast-[1.1] rounded-b-3xl"
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
              Cargando mapa...
            </div>
          )}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur px-6 py-3 rounded-full shadow-xl text-sm text-gray-700 font-bold whitespace-nowrap pointer-events-none border border-gray-100">
            Mostrando resultados para Querétaro (Qro)
          </div>
        </div>
      </div>
    </div>
  )
}
