import { Text, TouchableHighlight, View } from "react-native";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { authenticateAsync, checkBiometrics, getSecureValueAsync, saveSecureValue, selectEnrolledLevel, selectHasHardware, selectIsAuthenticated, selectSecureValue, selectSupportedAuthTypes } from "..";

export default function Settings() {
    const dispatch = useAppDispatch();

    const enrolledLevel = useAppSelector(selectEnrolledLevel);
    const hasHardware = useAppSelector(selectHasHardware);
    const supportedAuthTypes = useAppSelector(selectSupportedAuthTypes);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const secureValue = useAppSelector(selectSecureValue);

    useEffect(() => {
      dispatch(checkBiometrics());
    }, []);

    return (
        <View>
            <Text>Enrolment level: {enrolledLevel}</Text>
            <Text>Has hardware: {hasHardware ? 'yes' : 'no'}</Text>
            <Text>Supported auth types: {supportedAuthTypes?.join(', ')}</Text>
            <Text>Is authenticated: {isAuthenticated ? 'yes' : 'no'}</Text>
            <Text>Secure value: {secureValue}</Text>
            <TouchableHighlight onPress={() => {
              dispatch(authenticateAsync());
            }}>
              <View><Text>Authenticate</Text></View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {
              dispatch(saveSecureValue('bla bla bla secure!'));
            }}>
              <View><Text>Save value securely</Text></View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => {
              dispatch(getSecureValueAsync());
            }}>
              <View><Text>Get secure value</Text></View>
            </TouchableHighlight>
        </View>
    );
}