import FollowersScreen from '../screens'
import { AxiosProvider } from '../context'

function App() {
  return (
    <AxiosProvider>
      <FollowersScreen />
    </AxiosProvider>
  )
}

export default App
