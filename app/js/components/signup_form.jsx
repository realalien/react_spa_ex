import React from 'react';
import Link from './link';
////////////////////////////////////////////////////////
//
//  User name and telephone form  ( from Are's proposed design)
//
////////////////////////////////////////////////////////
var SignUpForm = React.createClass({
  getInitialState: function() {
    return {
      name: undefined,  // TIP: to avoid uncontrolled warning, SUG: https://github.com/erikras/redux-form/issues/735
      phone: undefined,
      verfified : false,  // flag to make sure only shown once after user input by server
      clickedSave : false // flag to control the save enable/disable
    };
  },

  closeBtnClicked : function(event){

  },

  handleNameInputChange : function(event){
      this.setState({name: event.target.value});
  },

  handlePhoneInputChange : function(event){
      this.setState({phone: event.target.value});
  },

  saveUserInfo : function(e){
    this.setState({clickedSave: true});
    console.log("saveUserInfo  .... not implemented.");
  },

  render : function(){
    var overlayStyle = {
      width : "90%",
      height : "70%",
      marginLeft : "5%",
      marginRight : "5%",
      borderRadius : 5,
      backgroundColor: "rgba(218, 33, 39, 1)",
      textAlign : "center",
      color : "white",
      position : "absolute",
      top : 130,
      marginTop: "12%",
      zIndex : 9999
    };

    var inputContainerStyle = {
      marginTop: 30,
      marginBottom : 30
    };

    var inputTextStyle ={
        width : "90%",
        height : 50,
        textAlign : "center",
        fontSize : 26,
        marginTop : 20
    };


    var inputSaveBtnStyle = {
      height : 50,
      width : "90%",
      backgroundColor: "#630709",
      fontSize: 26,
      color: "white",
      marginTop : 70,
      padding: 0,
      border: "none"
    };

    var enableSaveBtn = (
         this.state.name!== undefined
      && this.state.name!== ""
      && this.state.phone!== undefined
      && this.state.phone!== "");
    // console.log(enableSaveBtn);

    return (
      <div style={overlayStyle} onClick={this.closeBtnClicked}>
        <h1>Sign Up</h1>
        <p>Blah blah blah ... Blah blah blah ... Blah blah blah ... </p>
        <div style={inputContainerStyle}>
          <input
            style={inputTextStyle}
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleNameInputChange}
          />
          <input
            style={inputTextStyle}
            placeholder="Phone Number"
            value={this.state.phone}
            type="number"
            onChange={this.handlePhoneInputChange}
          />

          <button
            style={inputSaveBtnStyle}
            type="submit"
            disabled={!enableSaveBtn}
            onClick={this.saveUserInfo}>
            Save
          </button>

        </div>
      </div>
    );
  }
});


export default SignUpForm;
