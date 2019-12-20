import React from 'react';
import axios from 'axios';
import { Container, Header, Content, List, ListItem, Button, Text, Icon, Left, Right } from 'native-base';
import { StyleSheet, View } from 'react-native';


export default class App extends React.Component {
	state = {
		coins: [],
		toggledIndex: null
	}


	componentDidMount(){
		axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=' + api_limit)
			.then(response => {
				this.setState({coins : response.data});
			})
			.catch(error => {
				console.log(error);
			}
		);
	}

	generateCoinInfo(){
		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2
		});
		const coin = this.state.coins[this.state.toggledIndex];
		return (
			<View style={styles.defaultContainer}>
				<Text style = {styles.titleText}>{coin.name}{"\n"}</Text>
				<Text style = {styles.descriptor}>
					Market Cap: <Text style = {styles.coinData} >{formatter.format(coin.market_cap_usd)}{"\n"}</Text>
				</Text>
				<Text style = {styles.descriptor}>
					24h:
					<Text style = {coin.percent_change_24h > 0 ? styles.percentChangePositive : styles.percentChangeNegative}> {coin.percent_change_24h}%</Text>
					{"\t\t"}7d:
					<Text style = {coin.percent_change_7d > 0 ? styles.percentChangePositive : styles.percentChangeNegative}> {coin.percent_change_7d}%</Text>{"\n"}
				</Text>
				<Text style ={styles.descriptor}>
					Current Price: <Text style = {styles.coinData} >{formatter.format(coin.price_usd)}{"\n"}</Text>
				</Text>
				<Button onPress ={() => this.setState({toggledIndex: null})}>
					<Text>Go Back</Text>
				</Button>
			</View>
		)
	}

	generateCoinList() {
		return this.state.coins.map((coin, index) => {
			return (
				<ListItem key={index} button onPress ={() => this.setState({toggledIndex: index})} >
						<Left>
							<Text style = {styles.listElem}>{coin.rank}. {coin.name}</Text>
						</Left>
						<Right>
							<Icon active name="arrow-forward" />
						</Right>
				</ListItem>
			)
		});
	}

	render() {
		if(this.state.toggledIndex != null){
			return(
				this.generateCoinInfo()
			)
		}
		return(
			<Container>
				<Header>
					<Text style = {styles.titleText}>Top {api_limit} Cryptocurrencies</Text>
				</Header>
				<Content>
					<List>{this.generateCoinList()}</List>
				</Content>
			</Container>
		);
	}
}
const api_limit = "20";

const styles = StyleSheet.create({
	defaultContainer: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
 	},
	titleText:{
		fontSize: 30,
		fontWeight: "bold",
		textAlign: "center"
	},
	listElem:{
		fontSize: 20,
	},
	descriptor: {
		fontSize: 24,
	},
	coinData: {
		fontSize: 24
	},
	percentChangePositive: {
		color: "#009966",
		fontSize: 24
	},
	percentChangeNegative: {
		color: "#990033",
		fontSize: 24
 }
});
