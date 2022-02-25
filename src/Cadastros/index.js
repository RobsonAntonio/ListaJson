import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Cadastros({ data }) {
    return (
      
            <View style={styles.card}>
                <Text style={styles.text}>ID: {data.id}</Text>
                <Text style={styles.text}>Nome: {data.name}</Text>
                <Text style={styles.text}>Gênero: {data.gender}</Text>
                <Text style={styles.text}>E-mail: {data.email}</Text>
                <Text style={styles.text}>Status: {data.status}</Text>
            </View>
       

    );
}

const styles = StyleSheet.create({
    card: {
        
        backgroundColor: '#FFF',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10
    }, text: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 5
    }
})