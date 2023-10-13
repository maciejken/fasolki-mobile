import * as SecureStore from 'expo-secure-store';


// Error: You must set `NSFaceIDUsageDescription` in your Info.plist file to use the `requireAuthentication` option
export function saveSecure(key: string, value: string): Promise<void> {
    return SecureStore.setItemAsync(key, value, { requireAuthentication: true });
}

export function getSecure(key: string): Promise<string | null> {
    return SecureStore.getItemAsync(key, { requireAuthentication: true });
}