import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {gql, useQuery} from "@apollo/client";

const GREETING_QUERY = gql`
    query GetGreeting {
        greeting
    }
`

export default function HomeScreen() {

    const { data, loading, error } = useQuery(GREETING_QUERY);

    if (loading) {
        return (
            <View style={styles.container}>
            <ActivityIndicator color='black' size='large' />
            </View>
        );
    }



    return (
         <View style={styles.container}>
            <Text>{error? error?.message : data?.greeting}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
