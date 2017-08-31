import CacheNanny from 'appcache-nanny';

export default function register() {
  if (!('serviceWorker' in navigator)) {
    CacheNanny.start();
  }
}
