import { createRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Bluetooth, Recycle, Activity, Smartphone, ArrowLeft } from 'lucide-react'
import { useStore } from '../StoreContext'
import { Route as rootRoute } from './__root'

function Conexion() {
  const [device, setDevice] = useState<BluetoothDevice | null>(null)
  const [weight, setWeight] = useState(0)
  const { addRecycled } = useStore()
  
  const PRICE_PER_KG = 18

  const connectBluetooth = async () => {
    try {
      if (!navigator.bluetooth) {
        alert("La API de Web Bluetooth no está disponible en este navegador (intenta usar Chrome o Edge en HTTPS).")
        return
      }
      const selectedDevice = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['0000ffe0-0000-1000-8000-00805f9b34fb'] 
      })
      const server = await selectedDevice.gatt?.connect()
      if (!server) throw new Error("No se pudo conectar al servidor GATT")
      setDevice(selectedDevice)
      try {
        const service = await server.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb')
        const characteristic = await service.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb')
        await characteristic.startNotifications()
        characteristic.addEventListener('characteristicvaluechanged', (e: any) => {
          const value = new TextDecoder().decode(e.target.value)
          const parsedWeight = parseFloat(value)
          if (!isNaN(parsedWeight)) setWeight(parsedWeight)
        })
      } catch (e) {
        console.warn("No se encontró el servicio/característica serie genérica.", e)
      }
      selectedDevice.addEventListener('gattserverdisconnected', () => setDevice(null))
    } catch (error: any) {
      console.error(error)
      alert("Error al conectar: " + error.message)
    }
  }

  const simulateData = () => setWeight(Math.random() * 2.4 + 0.1)

  const registerSession = () => {
    if (weight > 0) {
      addRecycled(weight, PRICE_PER_KG)
      setWeight(0)
    }
  }

  const disconnectBluetooth = () => {
    if (device && device.gatt?.connected) device.gatt.disconnect()
    setDevice(null)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors font-medium">
        <ArrowLeft className="w-5 h-5" /> Volver al Inicio
      </Link>
      <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 flex flex-col h-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="bg-brand-blue/10 p-3 rounded-xl">
            <Smartphone className="w-6 h-6 text-brand-blue" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Conexión Metatech</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center py-6 relative z-10">
          <div className="relative mb-8">
            <div className={`absolute inset-0 rounded-full blur-xl ${device ? 'bg-brand-neon/40 animate-pulse' : 'bg-gray-200/50'}`}></div>
            <div className={`relative w-48 h-48 rounded-full border-8 flex flex-col items-center justify-center transition-colors duration-500 bg-white ${device ? 'border-brand-neon text-brand-deep' : 'border-gray-100 text-gray-400'}`}>
              <span className="text-5xl font-bold font-mono tracking-tighter">{weight.toFixed(2)}</span>
              <span className="text-lg font-medium mt-1 uppercase text-gray-500">kg</span>
            </div>
          </div>
          <div className="w-full bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 font-medium">Ganancia Estimada:</span>
              <span className="text-xl font-bold text-brand-purple">${(weight * PRICE_PER_KG).toFixed(2)} MXN</span>
            </div>
            <div className="text-xs text-right text-gray-400">Basado en ${PRICE_PER_KG} MXN / kg</div>
          </div>
          {device ? (
            <div className="w-full space-y-3">
              <button onClick={registerSession} disabled={weight <= 0}
                className="w-full py-4 rounded-xl font-bold text-lg bg-brand-neon text-brand-deep hover:bg-brand-light transition-all shadow-lg hover:shadow-brand-neon/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                <Recycle className="w-5 h-5" /> Registrar Reciclaje
              </button>
              <button onClick={disconnectBluetooth}
                className="w-full py-3 rounded-xl font-semibold text-gray-500 hover:bg-gray-100 transition-all border border-gray-200 flex items-center justify-center gap-2">
                Desconectar
              </button>
            </div>
          ) : (
            <div className="w-full space-y-3">
              <button onClick={connectBluetooth}
                className="w-full py-4 rounded-xl font-bold text-lg bg-brand-blue text-white hover:bg-brand-deep transition-all shadow-lg hover:shadow-brand-blue/40 flex items-center justify-center gap-2">
                <Bluetooth className="w-5 h-5" /> Conectar a Dispositivo
              </button>
              <button onClick={simulateData}
                className="w-full py-3 rounded-xl font-semibold text-brand-blue hover:bg-brand-blue/5 transition-all border-2 border-brand-blue/20 flex items-center justify-center gap-2">
                <Activity className="w-5 h-5" /> Simular Datos
              </button>
            </div>
          )}
          <p className="mt-6 text-sm text-gray-400 text-center">
            El calculo de ganancias es aproximado y esta basado en datos de upcycle.com
          </p>
        </div>
      </div>
    </div>
  )
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/conexion',
  component: Conexion,
})
