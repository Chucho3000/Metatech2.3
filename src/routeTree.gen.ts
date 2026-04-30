import { Route as rootRoute } from './routes/__root'
import { Route as IndexRoute } from './routes/index'
import { Route as ConexionRoute } from './routes/conexion'
import { Route as EstadisticasRoute } from './routes/estadisticas'
import { Route as MapaRoute } from './routes/mapa'

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  ConexionRoute,
  EstadisticasRoute,
  MapaRoute,
])
