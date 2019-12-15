import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';


export default function App() {
	return (
		<View style={styles.container}>
		<Text>Default w/ dependencies</Text>
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
