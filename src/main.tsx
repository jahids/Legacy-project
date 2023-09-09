import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme.ts'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'


ReactDOM.createRoot(document.getElementById('root')!).render(

  <ChakraProvider theme={theme} >

    <Provider store={store}>
      <App />
    </Provider>

  </ChakraProvider>
)
