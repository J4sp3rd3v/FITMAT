# FitMath App

Applicazione PWA per il fitness e la nutrizione.

## 🚀 Flusso di Deployment

Il progetto utilizza un flusso di Continuous Deployment basato su GitHub e Vercel.

### 1. Come aggiornare l'app (Metodo Consigliato)

Abbiamo creato uno script automatico per semplificare il processo di aggiornamento.

1. Apri il terminale nella cartella del progetto.
2. Esegui il comando:
   ```powershell
   .\deploy_helper.ps1
   ```
3. Segui le istruzioni a schermo.

Questo script si occuperà di:
- Verificare le modifiche.
- Fare il commit con un timestamp.
- Inviare il codice a GitHub (`git push`).

### 2. GitHub Actions

Ogni volta che viene effettuato un push su GitHub, parte automaticamente un workflow (`.github/workflows/ci.yml`) che:
1. Installa le dipendenze.
2. Esegue la build del progetto per verificare che non ci siano errori.

Puoi controllare lo stato delle build nella scheda **Actions** del repository GitHub.

### 3. Vercel Deployment

Vercel è collegato al repository GitHub. Quando il push viene completato con successo:
1. Vercel scarica il nuovo codice.
2. Esegue `npm run build`.
3. Pubblica la nuova versione su `https://fitmath-app.vercel.app/`.

### 🛑 Risoluzione Problemi

**Se le modifiche non appaiono online:**

1. **Controlla GitHub Actions**: Vai su GitHub > Actions e verifica che il workflow "Build & Verify" abbia la spunta verde.
2. **Controlla Vercel**: Vai sulla dashboard di Vercel e controlla l'ultimo Deployment. Se è fallito, leggi i log.
3. **Cache**: Se il deploy è "Ready" ma vedi la vecchia app, è un problema di Cache.
   - Prova ad aprire il sito in navigazione in incognito.
   - L'app è configurata per aggiornarsi automaticamente, ma a volte richiede la chiusura e riapertura del browser.

**Configurazione Cache (Tecnico)**
Il file `vercel.json` gestisce le intestazioni di cache per forzare l'aggiornamento dei file critici (`index.html`, `sw.js`).
