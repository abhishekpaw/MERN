import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { store } from './redux/store.ts'
import './styles/app.scss'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}><App /></Provider>,
)
