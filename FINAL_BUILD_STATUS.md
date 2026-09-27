# مشروع ساحة الدولي — حالة الدمج والبناء

## ما تم فحصه ودمجه/إصلاحه الآن
- تأكدت أن `index.html` هو التطبيق الحقيقي الوحيد، وأنه يتصل فعليًا (وليس نظريًا فقط)
  بجسر Electron/SQLite على Windows (`electron/preload.js` ↔ `electron/main.js` ↔
  `electron/sqlite.cjs`)، وبـ Capacitor SQLite على Android — مع سقوط تلقائي لتخزين
  المتصفح فقط إذا شُغّل التطبيق كصفحة ويب عادية دون Electron أو Capacitor.
- وجدت أن `app.js` / `app.css` / `sw.js` / `manifest.json` / `src/data/*` كانت نسخة
  تجريبية أولى منفصلة تمامًا وغير مرتبطة بـ `index.html` إطلاقًا (كود ميت). نقلتها
  إلى `legacy-unused/` بدل حذفها، حتى تراجعها بنفسك قبل حذفها نهائيًا.
- أصلحت خطأً في `package.json` كان سيمنع بناء EXE يعمل فعليًا: `better-sqlite3` كانت
  مصنّفة كأداة بناء (devDependency) بدل حزمة تشغيل (dependency)، وقائمة `files` في
  إعداد electron-builder لم تكن تتضمن `node_modules/` ولا `database/` — أي أن EXE
  الناتج كان سيعمل بلا قاعدة بيانات فعلية. تم إصلاح الاثنين.
- أصلحت خطأً في `capacitor.config.ts`: كان `webDir` يشير إلى جذر المشروع بالكامل
  (`.`)، ما كان سينسخ `node_modules` ومجلد `android` نفسه داخل تطبيق أندرويد. أضفت
  `scripts/prepare-www.cjs` الذي يجهّز مجلد `www/` نظيفًا (index.html + assets +
  database/schema.sql) قبل أي `cap add/sync android`.
- حدّثت `README-WINDOWS-ANDROID.md` (كان يصف حالة قديمة غير دقيقة).
- أضفت `.github/workflows/build.yml` لبناء تلقائي سحابي لكلا الملفين.

## ما لم يُبنَ فعليًا كملف تنفيذي بعد
بيئة هذه المحادثة لا تملك اتصال إنترنت (Sandbox معزول)، لذلك لا يمكن تشغيل
`npm install` أو تحميل Electron/Android SDK/Gradle هنا لإنتاج EXE أو APK حقيقيين
مباشرة. راجع **HOW-TO-GET-INSTALLERS-AR.md** لإكمال هذه الخطوة الأخيرة إما تلقائيًا
عبر GitHub Actions (بدون تثبيت شيء) أو محليًا على جهازك.

## ملاحظة هندسية للمستقبل (اختيارية، ليست عائقًا أمام البناء)
`app_state` (حفظ كل بيانات التطبيق كسجل JSON واحد) ما زال هو مسار الحفظ الأساسي،
مع مزامنة تلقائية إلى جداول مطبّعة (`users`, `items`, `stock_transactions`...) في كل
حفظ. هذا يعمل بشكل صحيح للاستخدام الحالي. عند التوسّع لاحقًا (تقارير معقّدة، عدة
أجهزة تكتب بالتزامن) يُستحسن نقل شاشات الواجهة تدريجيًا لتقرأ/تكتب من الجداول
المطبّعة مباشرة بدل `app_state`.
