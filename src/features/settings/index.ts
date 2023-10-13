import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getIsEnrolled, getEnrolledLevel, getSupportedAuthTypes, SecurityLevel, AuthType, getHasHardware, AuthResult, authenticate } from "./effects/localAuth";
import { AppDispatch, RootState } from "src/app/store";
import { getSecure, saveSecure } from "./effects/secureStore";
import { Settings } from "react-native";

interface SettingsState {
  isEnrolled: boolean | null;
  enrolledLevel: SecurityLevel | null;
  supportedAuthTypes: AuthType[] | null;
  hasHardware: boolean | null;
  isAuthenticated: boolean;
  secureValue: string | null;
}

export const initialState: SettingsState = {
  isEnrolled: null,
  enrolledLevel: null,
  supportedAuthTypes: null,
  hasHardware: null,
  isAuthenticated: false,
  secureValue: null,
};

const getIsEnrolledAsync = createAsyncThunk('settings/getIsEnrolledAsync', getIsEnrolled);

const getEnrolledLevelAsync = createAsyncThunk('settings/getEnrolmentLevelAsync', getEnrolledLevel);

const getSupportedAuthTypesAsync = createAsyncThunk('settings/getSupportedAuthTypesAsync', getSupportedAuthTypes);

const getHasHardwareAsync = createAsyncThunk('settings/getHasHardwareAsync', getHasHardware);

export const authenticateAsync = createAsyncThunk('settings/authenticateAsync', async (): Promise<boolean> => {
  const authResult: AuthResult = await authenticate();
  return authResult.success;
});

export const getSecureValueAsync = createAsyncThunk('settings/getSecureAsync', () => getSecure('secureValue'));

const beansSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setIsEnrolled: (state: SettingsState, action: PayloadAction<boolean>) => {
      state.isEnrolled = action.payload;
    },
    setEnrolmentLevel: (state: SettingsState, action: PayloadAction<SecurityLevel>) => {
      state.enrolledLevel = action.payload;
    },
    setSupportedAuthTypes: (state: SettingsState, action: PayloadAction<AuthType[]>) => {
      state.supportedAuthTypes = action.payload;
    },
    setHasHardware: (state: SettingsState, action: PayloadAction<boolean>) => {
      state.hasHardware = action.payload;
    },
    setIsAuthenticated: (state: SettingsState, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setSecureValue: (state: SettingsState, action: PayloadAction<string>) => {
      state.secureValue = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getIsEnrolledAsync.fulfilled, (state, action) => {
      state.isEnrolled = action.payload;
    });

    builder.addCase(getEnrolledLevelAsync.fulfilled, (state, action) => {
      state.enrolledLevel = action.payload;
    });

    builder.addCase(getSupportedAuthTypesAsync.fulfilled, (state, action) => {
      state.supportedAuthTypes = action.payload;
    });

    builder.addCase(getHasHardwareAsync.fulfilled, (state, action) => {
      state.hasHardware = action.payload;
    });

    builder.addCase(authenticateAsync.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload;
    });

    builder.addCase(getSecureValueAsync.fulfilled, (state, action) => {
      state.secureValue = action.payload;
    })
  }
});

export const { setIsEnrolled, setEnrolmentLevel, setSupportedAuthTypes, setHasHardware } = beansSlice.actions;

export default beansSlice.reducer;

const selectSettings = (state: RootState) => state.settings;

export const selectIsEnrolled = createSelector(selectSettings, (settings: SettingsState): boolean | null => settings.isEnrolled);

export const selectEnrolledLevel = createSelector(selectSettings, (settings: SettingsState): SecurityLevel | null => settings.enrolledLevel);

export const selectSupportedAuthTypes = createSelector(selectSettings, (settings: SettingsState): AuthType[] | null => settings.supportedAuthTypes);

export const selectHasHardware = createSelector(selectSettings, (settings: SettingsState): boolean | null => settings.hasHardware);

export const selectIsAuthenticated = createSelector(selectSettings, (settings: SettingsState): boolean | null => settings.isAuthenticated);

export const selectSecureValue = createSelector(selectSettings, (settings: SettingsState) => settings.secureValue);


export function checkBiometrics() {
  return function checkBiometricsThunk(dispatch: AppDispatch) {
    dispatch(getIsEnrolledAsync());
    dispatch(getEnrolledLevelAsync());
    dispatch(getHasHardwareAsync());
    dispatch(getSupportedAuthTypesAsync());
  }
}

export function saveSecureValue(val: string) {
  return function saveSecureValueThunk() {
    saveSecure('secureValue', val);
  }
}

