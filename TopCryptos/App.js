import React from 'react';
import axios from 'axios';
import { Container, Header, Content, List, ListItem, Button, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';


export default class App extends React.Component {
	state = {
		coins: [],
		toggledIndex: null
	}


componentDidMount(){
	axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=10')
		.then(response => {
			this.setState({coins : response.data});
		})
		.catch(error => {
			console.log(error);
		});
}

generateCoinInfo(){
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	})
	var coin = this.state.coins[this.state.toggledIndex]
	return (
		<View style={styles.container}>
			<Text>{coin.name}</Text>
			<Text>Market Cap: {formatter.format(coin.market_cap_usd)}</Text>
			<Button onPress ={() => this.setState({toggledIndex: null})}>
				<Text>Go Back</Text>
			</Button>
		</View>
	)
}

generateCoinList() {
	return this.state.coins.map((coin, index) => {
		return (
			<ListItem>
				<Button onPress ={() => this.setState({toggledIndex: index})}>
					<Text>{coin.name}</Text>
				</Button>
			</ListItem>)
		})

}

	render() {
		if(this.state.toggledIndex != null){
			return(
				this.generateCoinInfo()
			)
		}
		return(
			<View style={styles.container}>
			<List>{this.generateCoinList()}</List>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
 	},
});
