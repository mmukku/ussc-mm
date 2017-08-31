import CacheNanny from 'appcache-nanny';

export default function register() {
  if (!('serviceWorker' in navigator)) {
    console.log('registering appcache');
    CacheNanny.start();
  }
}
