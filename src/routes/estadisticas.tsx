import { createRoute, Link } from '@tanstack/react-router'
import { Recycle, DollarSign, ArrowLeft } from 'lucide-react'
import { useStore } from '../StoreContext'
import { Route as rootRoute } from './__root'

function Estadisticas() {
  const { totalRecycled, totalEarned } = useStore()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors font-medium">
          <ArrowLeft className="w-5 h-5" /> Volver al Inicio
        </Link>
      </div>
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Tus Estadísticas de Reciclaje</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col items-center justify-center gap-6 relative overflow-hidden group hover:border-brand-mint/50 transition-colors">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-brand-mint/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="bg-gradient-to-br from-brand-mint to-brand-neon p-6 rounded-3xl shadow-inner relative z-10">
            <Recycle className="w-16 h-16 text-brand-deep" />
          </div>
          <div className="relative z-10 text-center">
            <p className="text-gray-500 font-medium uppercase tracking-wider mb-2">Total Reciclado</p>
            <p className="text-5xl font-bold text-gray-800">{totalRecycled.toFixed(2)} <span className="text-2xl text-gray-400 font-medium">kg</span></p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col items-center justify-center gap-6 relative overflow-hidden group hover:border-brand-purple/30 transition-colors">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-brand-purple/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="bg-gradient-to-br from-brand-purple to-purple-400 p-6 rounded-3xl shadow-inner relative z-10">
            <DollarSign className="w-16 h-16 text-white" />
          </div>
          <div className="relative z-10 text-center">
            <p className="text-gray-500 font-medium uppercase tracking-wider mb-2">Ganancia Total</p>
            <p className="text-5xl font-bold text-gray-800"><span className="text-brand-purple">$</span>{totalEarned.toFixed(2)} <span className="text-2xl text-gray-400 font-medium">MXN</span></p>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-400 mt-4">
        El calculo de ganancias es aproximado y esta basado en datos de upcycle.com
      </p>
    </div>
  )
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/estadisticas',
  component: Estadisticas,
})
