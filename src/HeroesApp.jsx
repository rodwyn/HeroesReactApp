import { AuthProvider } from "./auth"
import { AppRouter } from "./heroes/router/AppRouter"

export const HeroesApp = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}
