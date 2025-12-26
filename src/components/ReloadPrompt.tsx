import { useRegisterSW } from 'virtual:pwa-register/react'

function ReloadPrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r: unknown) {
      console.log('SW Registered: ' + r)
    },
    onRegisterError(error: unknown) {
      console.log('SW registration error', error)
    },
  })

  const close = () => {
    setNeedRefresh(false)
  }

  return (
    <div className="Container">
      {needRefresh && (
        <div className="fixed bottom-20 left-4 right-4 z-[100] p-4 bg-slate-800 border border-indigo-500 rounded-xl shadow-2xl flex flex-col gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🚀</div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-sm">Aggiornamento Disponibile!</h3>
              <p className="text-xs text-slate-300 mt-1">
                Una nuova versione dell'app è pronta. Clicca su aggiorna per vedere le ultime novità.
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full">
             <button 
               className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg text-xs font-bold transition-colors"
               onClick={() => updateServiceWorker(true)}
             >
               Aggiorna Ora
             </button>
             <button 
               className="px-4 bg-slate-700 hover:bg-slate-600 text-slate-300 py-2 rounded-lg text-xs font-bold transition-colors"
               onClick={() => close()}
             >
               Chiudi
             </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReloadPrompt
