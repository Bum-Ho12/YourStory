import Navigation from './lib/navigation'
import {useColorScheme} from 'react-native'
import { ColorThemeProvider } from './lib/utils/state-context'

export default function App() {
  const colorScheme = useColorScheme()
  return (
    <ColorThemeProvider>
      <Navigation colorScheme={colorScheme}/>
    </ColorThemeProvider>
  )
}