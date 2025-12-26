# Script di Deployment Automatico FitMath
# Esegui questo script per inviare aggiornamenti a GitHub e triggerare il deploy su Vercel

$ErrorActionPreference = "Stop"

function Show-Step {
    param([string]$Message)
    Write-Host "`n🔵 $Message" -ForegroundColor Cyan
}

function Show-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Show-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

try {
    Show-Step "Verifica stato repository..."
    $status = git status --porcelain
    if (-not $status) {
        Write-Host "⚠️  Nessuna modifica rilevata. Il repository è aggiornato." -ForegroundColor Yellow
        exit
    }

    Show-Step "Aggiunta file al staging (git add)..."
    git add .

    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    $defaultMsg = "update: deployment $timestamp"
    
    Write-Host "`nInserisci messaggio di commit (Premi Invio per: '$defaultMsg')" -ForegroundColor Yellow
    $userMsg = Read-Host "> "
    
    if ([string]::IsNullOrWhiteSpace($userMsg)) {
        $commitMsg = $defaultMsg
    } else {
        $commitMsg = $userMsg
    }

    Show-Step "Creazione commit..."
    git commit -m "$commitMsg"

    Show-Step "Invio modifiche a GitHub (git push)..."
    git push origin main

    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n"
        Show-Success "DEPLOYMENT INVIATO CON SUCCESSO!"
        Write-Host "------------------------------------------------" -ForegroundColor Gray
        Write-Host "1. Il codice è stato caricato su GitHub."
        Write-Host "2. GitHub Actions verificherà la build."
        Write-Host "3. Vercel rileverà il commit e avvierà il deploy."
        Write-Host "   Attendi circa 60-90 secondi per vedere le modifiche live."
        Write-Host "------------------------------------------------" -ForegroundColor Gray
    } else {
        throw "Git push fallito."
    }

} catch {
    Show-Error "Errore durante il processo: $_"
    exit 1
}
