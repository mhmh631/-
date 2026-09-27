import type { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.saha.international',
  appName: 'مشروع ساحة الدولي',
  webDir: 'www',
  bundledWebRuntime: false,
  server: { androidScheme: 'https' },
  plugins: {
    CapacitorSQLite: {
      androidIsEncryption: false,
      electronIsEncryption: false,
      electronWindowsLocation: 'C:\\ProgramData\\SahaInternationalDatabases'
    }
  }
};
export default config;
