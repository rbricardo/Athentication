import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './src/components/common/Header';
import { Button } from './src/components/common/Button';
import { Spinner } from './src/components/common/Spinner';
import { Card } from './src/components/common/Card';
import { CardSection } from './src/components/common/CardSection';
import LoginForm from './src/components/LoginForm';

export default class App extends Component {
	
	state = { loggedIn: null };

	componentWillMount() {

		firebase.initializeApp({
	    apiKey: "AIzaSyAi59f0DtgygdaQigorILU9mkuub4FdOPU",
	    authDomain: "authentication-42c37.firebaseapp.com",
	    databaseURL: "https://authentication-42c37.firebaseio.com",
	    projectId: "authentication-42c37",
	    storageBucket: "authentication-42c37.appspot.com",
	    messagingSenderId: "244942057590"
  	});

		firebase.auth().onAuthStateChanged((user) => {

			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}

		});

	}

	renderContent() {

		switch (this.state.loggedIn) {
			case true:
				return (
					<Card>
						<CardSection>
							<Button onPress={() => firebase.auth().signOut()} >
								Log Out
							</Button>
						</CardSection>
					</Card>
				)
			
			case false:
				return <LoginForm />;
			
			default:
				return <Spinner size="large" />
		}	
	}

  render() {
    return(

      <View>
      	<Header headerText="Authentication" />
      			{this.renderContent()}
      </View>
      

    );
  }
}



