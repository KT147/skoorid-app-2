import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sinuette.skooridapp',
  appName: 'Saaremaa Piljard: Skoorid',
  webDir: 'dist',
  plugins: {
    Keyboard: {
      resize: "ionic", // Ensures the layout is resized properly when the keyboard is visible
      style: 'dark',   // Optional: 'light' or 'dark' for the keyboard appearance
      resizeOnFullScreen: true // Helps with fullscreen apps
    }
  }
};

export default config;
