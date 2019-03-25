// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';

// Make a component
const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    elevation: 1.5,
    position: 'relative', 
    borderColor:'black',
    marginBottom:15
    
  },
  textStyle: {
    fontSize: 20,
    color:'black',
    backgroundColor:'transparent'
  }
};

// Make the component available to other parts of the app
export  {Header};