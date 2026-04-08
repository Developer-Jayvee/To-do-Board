import { configureEcho } from "@laravel/echo-react";
import Pusher from "pusher-js";
import { TOKEN_NAME } from "src/constants";

if(typeof window !== "undefined"){
    // window.Pusher = Pusher;

//  for web socket ( notif )
configureEcho({
    broadcaster: 'reverb', 
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    // forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: 'http://localhost:8000/api/broadcasting/auth',

    auth: {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_NAME)
        }
    },
});

}