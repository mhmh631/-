@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo مشروع ساحة الدولي
where node >nul 2>nul || (echo Node.js غير مثبت. ثبته ثم شغل الملف مرة أخرى. & pause & exit /b 1)
if not exist node_modules\.bin\electron.cmd (
  echo جاري تثبيت مكونات التشغيل لأول مرة...
  call npm install || (echo فشل تثبيت المكونات. & pause & exit /b 1)
)
if not exist node_modules\.bin\electron.cmd (
  echo لم يكتمل تثبيت Electron. احذف node_modules ثم شغل الملف مرة أخرى.
  pause
  exit /b 1
)
echo تشغيل التطبيق...
call npm run desktop
pause
