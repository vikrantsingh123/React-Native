import React, { Component } from 'react';
import {Text, View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDVfBaSEg5oDoxBuCGsbDkvRf0TaKvMZng",
    authDomain: "auth-8ef68.firebaseapp.com",
    databaseURL: "https://auth-8ef68.firebaseio.com",
    projectId: "auth-8ef68",
    storageBucket: "auth-8ef68.appspot.com",
    messagingSenderId: "944747816662"
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
          <CardSection>
          <Button onPress={() => firebase.auth().signOut()}>
            <Text>Log Out</Text>
          </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;