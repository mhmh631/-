# مشروع ساحة الدولي — SQLite / Windows / Android

هذه هي مرحلة نقل المشروع من Browser Demo إلى تخزين SQLite أصلي.

## ما تم
- SQLite schema إنتاجي للجداول الأساسية.
- WAL + foreign keys + indexes.
- Windows: Electron + SQLite محلي في مجلد بيانات التطبيق.
- Android: Capacitor + `@capacitor-community/sqlite`.
- Repository/Bridge منفصل عن الواجهة.
- مهام، إشعارات، صلاحيات، تدقيق، سندات، حركات، أرصدة وجرد ضمن المخطط.
- العملة الافتراضية ل.س.

## تشغيل Windows
```bash
npm install
npm run desktop
```

## بناء Windows
```bash
npm run build:win
```

## تجهيز Android
```bash
npm install
npx cap add android
npx cap sync android
npx cap open android
```

## قاعدة البيانات
المخطط: `database/schema.sql`
البيانات الأولية: `database/seed.sql`

`app_state` مستخدم حاليًا كجسر انتقال حتى لا تضيع بيانات الـDemo أثناء نقل كل الخدمات إلى الجداول المطبّعة. المرحلة الإنتاجية النهائية يجب أن تعتمد على `items`, `stock_transactions`, `stock_balances`, receipts, tasks, notifications, users/roles وغيرها مباشرة، مع migrations واختبارات transaction/restore.
