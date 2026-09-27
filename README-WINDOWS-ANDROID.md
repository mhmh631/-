# مشروع ساحة الدولي — Windows + Android

## الوضع الفعلي الحالي (بعد الدمج والتنظيف)
- `index.html` هو التطبيق الوحيد الفعلي (واجهة + منطق كامل بداخله).
- على Windows: يتصل تلقائيًا بقاعدة SQLite حقيقية عبر `electron/` (WAL + Foreign Keys).
- على Android: يتصل تلقائيًا بـ `@capacitor-community/sqlite` عبر نفس الواجهة.
- إن تعذّر الاتصال بأي منهما (تشغيل من متصفح عادي فقط) يستخدم التطبيق تخزين المتصفح
  المحلي كخطة بديلة للتجربة فقط، وليس هذا وضع الإنتاج.
- الملفات القديمة غير المستخدمة (نسخة تجريبية أولى) نُقلت إلى `legacy-unused/`.

## Windows — البناء
1. ثبّت Node.js LTS.
2. داخل مجلد المشروع نفّذ: `npm install`
3. للتجربة المباشرة: `npm run desktop`
4. لإنشاء ملف التنصيب: `npm run build:win`
5. الناتج يظهر داخل `dist/`: ملف Installer (NSIS) وملف Portable.
6. لأن التطبيق غير موقّع رقميًا (Code Signing)، سيظهر تحذير "Windows protected your PC" —
   اضغط "More info" ثم "Run anyway". هذا طبيعي لتطبيق داخلي غير منشور على المتجر.

## Android — البناء
1. ثبّت Android Studio (يجلب معه Android SDK).
2. داخل المشروع نفّذ: `npm install`
3. أنشئ مشروع Android أول مرة: `npm run android:add`
   (هذا يجهز مجلد `www/` تلقائيًا قبل الإضافة)
4. بعد أي تعديل على `index.html`: `npm run android:sync`
5. افتح Android Studio: `npm run android:open`
6. من Android Studio: Build → Generate Signed Bundle / APK لإصدار APK قابل للتنصيب.
   (يمكن أيضًا تنفيذ `npm run build:android:debug` من سطر الأوامر للحصول على APK
   تجريبي بسرعة دون فتح Android Studio.)

## لا تملك جهاز بناء جاهز؟ (الطريقة الأسهل)
أضيف إلى المشروع بناء تلقائي عبر GitHub Actions (`.github/workflows/build.yml`).
راجع ملف **HOW-TO-GET-INSTALLERS-AR.md** في جذر المشروع — يبني GitHub تلقائيًا
ملف EXE لويندوز وملف APK لأندرويد ويتيحهما للتنزيل، دون تثبيت أي شيء على جهازك
سوى متصفح وحساب GitHub مجاني.
