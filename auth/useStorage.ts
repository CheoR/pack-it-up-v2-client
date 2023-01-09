import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

type Value = string | Function | undefined
type Key = string

async function storeTokenFor(key: Key, value: Value) {
  if(value === undefined) throw new Error("useStorage: value undefined")
  if (value instanceof Function) value = ''
  try {
    await SecureStore.setItemAsync(key, value);
  }  catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("useStorage: Could not store token")
    } else {
      throw new Error(`userStorage error: ${error}`)
    }
  }
} 

async function getStoredTokenFor(key: Key) {

  let value
  try {
    value = await SecureStore.getItemAsync(key)
    return value
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("useStorage: Could not find token")
    } else {
      throw new Error(`userStorage error: ${error}`)
    }
  }
}

async function removeTokenFor(key: Key) {
  let resp
  try {
    resp = await SecureStore.deleteItemAsync(key)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("useStorage: Could not remove token")
    } else {
      throw new Error(`userStorage error: ${error}`)
    }
  }
}

async function getToken(key: Key, initialValue: Value) {
  const value = getStoredTokenFor(key)
  if(value) return value

  if (initialValue instanceof Function) return initialValue()

  return initialValue
}

export default function useStorage(key: Key, initialValue: Value) {
  const [value, setValue] = useState(() => {
    return getToken(key, initialValue)
  })

  useEffect(() => {
    
    async function storeToken() {
      await storeTokenFor(key, value)
    }
    storeToken()
  }, [value])

  return [value, setValue]
}

