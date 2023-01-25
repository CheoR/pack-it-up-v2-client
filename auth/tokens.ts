import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { Buffer } from 'buffer';

import { getHost } from '../graphql/getHost';

// per site, keep order consistent 
const tokenList = ['host', 'accessToken', 'refreshToken']

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface IToken {
  id: string;
  exp: number;
  iat: number;
}

export const setTokens = ({ accessToken, refreshToken }: Tokens) => {
  AsyncStorage.multiSet([
    ['host', getHost()],
    ['accessToken', accessToken],
    ['refreshToken', refreshToken],
  ]).catch((error: any) => {
    console.error(`Error setting tokens: ${error.message}`);
  });
};

export const getTokens = async () => {
  const kvArray = await AsyncStorage.multiGet(tokenList);
  const host = kvArray[0][1];
  return host === getHost()
    ? { accessToken: kvArray[1][1], refreshToken: kvArray[2][1] }
    : { accessToken: null, refreshToken: null };
};

// see if the app has tokens set and at least one is not expired
export const hasValidTokens = async () => {
  const { accessToken, refreshToken } = await getTokens();
  return isTokenValid(accessToken) || isTokenValid(refreshToken);
};

export const clearTokens = () => {
  AsyncStorage.multiRemove(tokenList);
};

export const tokenExpiryTime = (token: string) =>
  new Date(jwt_decode<IToken>(token)?.iat);

// adapted from https://stackoverflow.com/a/69058154/2805154
const isTokenValid = (token: string | null) => {
  if (token?.length) {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    const expiration = JSON.parse(decodedJson).exp * 1000;
    return Date.now() <= expiration;
  } else return false;
};
