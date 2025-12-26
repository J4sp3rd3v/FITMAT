import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserProvider } from './context/UserContext.tsx'

console.log('App Version: 2.4.0 - VERCEL FORCE DEPLOY ' + new Date().toISOString())

if ('serviceWorker' in navigator) {
  let didTriggerReload = false
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      const scriptUrl = registration.active?.scriptURL ?? ''
      if (scriptUrl.includes('/sw.js')) {
        registration.unregister().then((didUnregister) => {
          if (didUnregister && !didTriggerReload) {
            didTriggerReload = true
            window.location.reload()
          }
        })
      }
    }
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
)
