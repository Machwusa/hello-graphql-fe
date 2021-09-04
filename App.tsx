import React, {useEffect, useState} from 'react';
import {AsyncStorage} from 'react-native';
import HomeScreen from "./src/screens/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {persistCache} from 'apollo3-cache-persist'
import AppLoading from 'expo-app-loading'
import {StatusBar} from "expo-status-bar";


const Stack = createNativeStackNavigator();

const cache = new InMemoryCache()

const client = new ApolloClient({
    uri: 'http://192.168.1.205:9000',
    cache,
    defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network',  } },
})

export default function App() {

    const [loadingCache, setLoadingCache] = useState<boolean>(true);

    useEffect(() => {
        persistCache({
            cache,
            storage: AsyncStorage,
        }).then(() => setLoadingCache(false))
    }, [])

    if (loadingCache) {
        return <AppLoading />
    }

    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                </Stack.Navigator>
                <StatusBar style="light" />
            </NavigationContainer>
        </ApolloProvider>
    );
}
