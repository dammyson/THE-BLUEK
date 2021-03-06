import React, { Component } from "react";
import { View } from "react-native";
import AnimatedMultistep from "react-native-animated-multistep";

import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";



 class Create extends Component {
  constructor(props) {
    super(props);
    this.onEventPress = this.onEventPress.bind(this)

    this.state = {};
  }

  onNext = () => {
    console.log("Next");
  };
  onBack = () => {
    console.log("Back");
  };

  finish = state => {
    console.log("TCL: App -> state", state);
  };

  onEventPress() {
    this.props.navigation.navigate('ServieDetails');
}

  render() {


   
    return (
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <AnimatedMultistep
          steps={[
            { name: "step 1", component: Step1 },
            { name: "step 2", component: Step2 },
            { name: "step 3", component: Step3 },
          
          ]}
          onFinish={this.finish}
          onBack={this.onBack}
          onNext={this.onNext} 
        />
      </View>
    );
  }
}


export default Create;


