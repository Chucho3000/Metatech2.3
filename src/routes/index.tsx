import { createRoute } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
})

const phrases = [
  "Cada lata reciclada es un paso hacia un planeta más limpio.",
  "Lo que reciclas hoy, mejora el mañana.",
  "Pequeñas acciones crean grandes cambios.",
  "Reciclar no cuesta nada, pero vale mucho.",
  "Tu esfuerzo verde sí hace la diferencia.",
  "El planeta necesita héroes, y tú ya empezaste.",
  "Convertir residuos en oportunidades empieza contigo.",
  "Sigue reciclando, estás sembrando futuro.",
  "Cada botella cuenta, cada acción importa.",
  "No subestimes el poder de tu hábito.",
  "Menos basura, más vida.",
  "Tu constancia inspira a otros a cambiar.",
  "Reciclar hoy es respirar mejor mañana.",
  "Cada material recuperado es una victoria.",
  "El cambio ambiental comienza en tus manos.",
  "Hazlo una vez, repítelo siempre.",
  "Lo que separas hoy, salva recursos mañana.",
  "Ser constante también es ser ecológico.",
  "Sigue adelante, el planeta te lo agradece.",
  "Reciclar es pequeño para ti, enorme para todos."
];

function Dashboard() {
  const [randomPhrase, setRandomPhrase] = useState("")

  useEffect(() => {
    setRandomPhrase(phrases[Math.floor(Math.random() * phrases.length)])
  }, [])

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gray-800 drop-shadow-sm flex items-center justify-center gap-3">
          Bienvenido a tu centro de reciclaje Metatech
        </h2>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Controla tus depósitos, observa tus ganancias y encuentra el centro de reciclaje más cercano de manera rápida y sencilla.
        </p>
      </div>

      {randomPhrase && (
        <div className="bg-brand-mint/10 border border-brand-mint/30 rounded-2xl p-6 text-center shadow-sm max-w-3xl mx-auto">
          <p className="text-xl text-brand-deep italic font-medium">
            "{randomPhrase}"
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card: Conexión Bluetooth */}
        <Link to="/conexion" className="group bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 hover:border-brand-blue/50 hover:shadow-xl transition-all relative overflow-hidden flex flex-col h-full">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-blue/10 transition-colors"></div>
          <div className="bg-brand-blue/10 p-4 rounded-2xl w-fit mb-6 text-brand-blue group-hover:scale-110 transition-transform">
            <Bluetooth className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Conexión y Pesaje</h3>
          <p className="text-gray-500 flex-1 mb-8">
            Conecta tu dispositivo vía Bluetooth para registrar el peso de tus latas y calcular tus ganancias al instante.
          </p>
          <div className="flex items-center text-brand-blue font-bold group-hover:gap-3 gap-2 transition-all">
            Ir a Conexión <ArrowRight className="w-5 h-5" />
          </div>
        </Link>

        {/* Card: Estadísticas */}
        <Link to="/estadisticas" className="group bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 hover:border-brand-mint/50 hover:shadow-xl transition-all relative overflow-hidden flex flex-col h-full">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-mint/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-mint/10 transition-colors"></div>
          <div className="bg-brand-mint/20 p-4 rounded-2xl w-fit mb-6 text-brand-deep group-hover:scale-110 transition-transform">
            <Activity className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Estadísticas</h3>
          <p className="text-gray-500 flex-1 mb-8">
            Revisa todo tu historial de reciclaje, la cantidad de kilos de latas compactadas y tus ganancias acumuladas.
          </p>
          <div className="flex items-center text-brand-deep font-bold group-hover:gap-3 gap-2 transition-all">
            Ver Estadísticas <ArrowRight className="w-5 h-5" />
          </div>
        </Link>

        {/* Card: Mapa de Reciclaje */}
        <Link to="/mapa" className="group bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 hover:border-red-400/50 hover:shadow-xl transition-all relative overflow-hidden flex flex-col h-full">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-red-100 transition-colors"></div>
          <div className="bg-red-100 p-4 rounded-2xl w-fit mb-6 text-red-500 group-hover:scale-110 transition-transform">
            <MapPin className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Mapa de Centros</h3>
          <p className="text-gray-500 flex-1 mb-8">
            Localiza las recicladoras de latas más cercanas a ti en Querétaro para ir a cambiar tu material por dinero.
          </p>
          <div className="flex items-center text-red-500 font-bold group-hover:gap-3 gap-2 transition-all">
            Ver Mapa en Qro <ArrowRight className="w-5 h-5" />
          </div>
        </Link>
      </div>
    </div>
  )
}
