@echo off
chcp 65001 >nul
cd /d "%~dp0"
if "%OPENAI_API_KEY%"=="" (
  echo يجب أولاً ضبط متغير البيئة OPENAI_API_KEY بالمفتاح الجديد.
  echo مثال: setx OPENAI_API_KEY "sk-..."
  pause
  exit /b 1
)
node ai-gateway.cjs
pause
