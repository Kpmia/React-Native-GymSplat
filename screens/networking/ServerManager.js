
import React from 'react'
import { AsyncStorage } from 'react-native'

export const Storage = {

    getItem: async function (key) {
        let item = await AsyncStorage.getItem(key);
        return JSON.parse(item);
    },
    setItem: async function (key, value) {
        return await AsyncStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: async function (key) {
        return await AsyncStorage.removeItem(key);
    }
};

