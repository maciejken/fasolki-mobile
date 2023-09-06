declare module '@env' {
    // Firebase config (see .env -> Secrets)
    export const FIREBASE_API_KEY: string;
    export const FIREBASE_AUTH_DOMAIN: string;
    export const FIREBASE_PROJECT_ID: string;
    export const FIREBASE_STORAGE_BUCKET: string;
    export const FIREBASE_MESSAGING_SENDER_ID: string;
    export const FIREBASE_APP_ID: string;
    export const FIREBASE_MEASUREMENT_ID: string;

    // other/public variables
    export const EXPO_PUBLIC_HEADER_TITLE: string;
    export const EXPO_PUBLIC_INITIAL_BEANS_ID: string;
}