import React, {Component} from 'react';
import {Text,View} from 'react-native';
import firebase from 'firebase';
import {Button, Card, CardSection, Input, Spinner } from './common';


class LoginForm extends Component{
    state={email:'',password:'',error:'',loading1:false,loading2:false}

    onLoginPress(){
        const {email,password }=this.state;
        this.setState({error:'',loading1:true});
        
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(this.onLoginSuccess.bind(this))
                .catch(
                    this.onLoginFailFirst.bind(this)
                );
    }

    onSignUpPress(){
        const {email,password }=this.state;
        this.setState({error:'',loading2:true});
            firebase.auth().signInWithEmailAndPassword(email,password)
            .then(this.onDupLoginFail.bind(this))
                .catch(()=>{
                    firebase.auth().createUserWithEmailAndPassword(email,password)
                        .then(this.onLoginSuccess.bind(this))
                            .catch(this.onLoginFail.bind(this));
                });
    }

    onDupLoginFail(){
        this.setState({ error: 'User Already Exists', loading1: false,loading2:false });
    }

    onLoginFailFirst(){
      this.setState({ error: 'Wrong credentials or User does not exist', loading1: false, loading2:false });
    }
    onLoginFail() {
        this.setState({ error: 'Authentication Failed', loading1: false, loading2:false });
      }
    
    onLoginSuccess() {
        this.setState({
          email: '',
          password: '',
          loading1: false,
          loading2:false,
          error: ''
        });
      }

    renderSignIn() {
        if (this.state.loading1) {
          return <Spinner size="small" />;
        }
    
        return (
          <Button onPress={this.onLoginPress.bind(this)}>
            <Text>Log in</Text>
          </Button>
        );
    }  
    renderSignUp() {
        if (this.state.loading2) {
          return <Spinner size="small" />;
        }
    
        return (
          <Button onPress={this.onSignUpPress.bind(this)}>
            <Text>Sign up</Text>
          </Button>
        );
    } 

    render() {
        return (
            
          <Card>
            <CardSection>
              <Input
                label="Email"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                placeholder="user@gmail.com"
              />
            </CardSection>
    
            <CardSection>
              <Input
                secureTextEntry
                placeholder="password"
                label="Password"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </CardSection>
            
            <Text style={styles.errorTextStyle}>
                {this.state.error}
            </Text>

            <CardSection>
              {this.renderSignIn()}
              {this.renderSignUp()}
              
            </CardSection>
          </Card>
          
          
        );
      }
        
}
const styles = {
    errorTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red'
    },
    cardStyle:{
        flex: 1,
        flexDirection: 'row',
    },
    buttonStyle:{
        flex:1
    }
  };
export default LoginForm;