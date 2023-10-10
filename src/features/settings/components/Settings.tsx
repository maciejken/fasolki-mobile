import { Text, TouchableHighlight, View } from "react-native";
import * as LocalAuth from "expo-local-authentication";
import { useEffect, useState } from "react";

export default function Settings() {
    const [enrolmentLevel, setEnrolmentLevel] = useState<LocalAuth.SecurityLevel | null>(null);
    const [hasHardware, setHasHardware] = useState<boolean>(false);
    const [supportedAuthTypes, setSupportedAuthTypes] = useState<LocalAuth.AuthenticationType[]>([]);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        LocalAuth.getEnrolledLevelAsync().then((level) => {
            setEnrolmentLevel(level);
        });
        LocalAuth.hasHardwareAsync().then((hasHardware) => {
            setHasHardware(hasHardware);
        });
        LocalAuth.supportedAuthenticationTypesAsync().then((supportedTypes) => {
            setSupportedAuthTypes(supportedTypes);
        })
        
    })
    return (
        <View>
            <Text>Enrolment level: {enrolmentLevel}</Text>
            <Text>Has hardware: {hasHardware ? 'yes' : 'no'}</Text>
            <Text>Supported auth types: {supportedAuthTypes.join(', ')}</Text>
            <Text>Is authenticated: {authenticated ? 'yes' : 'no'}</Text>
            <TouchableHighlight onPress={() => {
                LocalAuth.authenticateAsync().then((result: LocalAuth.LocalAuthenticationResult) => {
                    setAuthenticated(result.success);
                });
            }}><View><Text>Authenticate</Text></View></TouchableHighlight>
        </View>
    );
}