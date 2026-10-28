import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
    interface Window {
        Pusher: typeof Pusher;
        Echo?: any;
    }
}

window.axios = axios;
window.Pusher = Pusher;

// Only initialize Echo if Pusher credentials are configured
if (import.meta.env.VITE_PUSHER_APP_KEY) {
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        forceTLS: true,
        authEndpoint: '/broadcasting/auth',
    });
} else {
    console.warn('Pusher credentials not configured. Real-time features will be disabled.');
}

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
