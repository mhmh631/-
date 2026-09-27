# مشروع ساحة الدولي — SQLite migration

تم نقل التخزين الإنتاجي إلى SQLite عبر طبقة بيانات مشتركة:

- Windows: SQLite محلي داخل مجلد بيانات التطبيق، مع WAL وforeign keys.
- Android: `@capacitor-community/sqlite` 8.1.1.
- الواجهة لا تتعامل مباشرة مع SQLite؛ تستخدم Repository/Bridge.
- قاعدة البيانات تحتوي جداول المستخدمين والصلاحيات والمواد والمستودعات والسندات والحركات والأرصدة والجرد والمهام والإشعارات والتدقيق والإعدادات.
- `app_state` موجود كجسر انتقال للنسخة الحالية، إلى أن تُرحّل خدمات الواجهة بالكامل إلى الاستعلامات المطبّعة.

## بناء Windows
`npm install` ثم `npm run desktop` أو `npm run build:win`.

## بناء Android
ثبّت Android Studio وSDK ثم `npm install` و`npx cap add android` ثم `npm run build:android:debug` أو افتح المشروع عبر `npx cap open android`.

> هذه المرحلة تجهز طبقة SQLite الأصلية وتبقي الواجهة الحالية متوافقة أثناء الانتقال. قبل الاعتماد النهائي يجب إكمال ترحيل الخدمات من `app_state` إلى الجداول المطبّعة، وتطبيق hashing لكلمات المرور واختبارات الاستعادة والترحيل.

## Phase 1 completed
- SQLite schema validated.
- Desktop SQLite bridge exposes atomic stock operations.
- Incoming increases stock and records a stock transaction.
- Outgoing decreases stock and rejects negative balances.
- Transfers atomically decrease source and increase destination.
- WAL, foreign keys, busy timeout and indexed stock queries enabled.

## Next integration step
The UI receipt forms will call the desktop stock bridge directly instead of relying on browser `app_state`. The same service contract will be mapped to Capacitor SQLite on Android.
