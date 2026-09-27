# تشغيل التطبيق

## على Windows
شغّل `RUN-WINDOWS.bat` أو نفّذ `npm run desktop` بعد تثبيت الاعتمادات.

## على المتصفح محليًا
يمكن فتح `index.html` مباشرة للتجربة، لكن هذا الوضع يستخدم تخزين المتصفح ولا
يوفر قاعدة SQLite الخاصة بتطبيق سطح المكتب.

## GitHub Pages
ارفع محتويات هذا المجلد إلى مستودع Pages، ثم اجعل `index.html` هو نقطة الدخول.
هذا النشر مناسب للعرض والتجربة فقط، وليس تشغيل SQLite المحلي.

## بيانات التجربة
- admin / 123456 — مدير النظام
- warehouse / 123456 — موظف مستودع
- viewer / 123456 — قراءة فقط

## Android وWindows installers
استخدم `npm run build:win` لإنتاج EXE، أو `npm run build:android:debug` لإنتاج APK
تجريبي. المتطلبات وخطوات الإصدار موضحة في `HOW-TO-GET-INSTALLERS-AR.md`.
