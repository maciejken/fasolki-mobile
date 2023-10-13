import * as LocalAuth from 'expo-local-authentication';

export function getIsEnrolled(): Promise<boolean> {
    return LocalAuth.isEnrolledAsync();
}

export function getEnrolledLevel(): Promise<LocalAuth.SecurityLevel> {
    return LocalAuth.getEnrolledLevelAsync();
}

export function getHasHardware(): Promise<boolean> {
    return LocalAuth.hasHardwareAsync();
}

export function getSupportedAuthTypes(): Promise<LocalAuth.AuthenticationType[]> {
    return LocalAuth.supportedAuthenticationTypesAsync()
}

export function authenticate(): Promise<LocalAuth.LocalAuthenticationResult> {
    return LocalAuth.authenticateAsync();
}

export type SecurityLevel = LocalAuth.SecurityLevel;

export type AuthType = LocalAuth.AuthenticationType;

export type AuthResult = LocalAuth.LocalAuthenticationResult;