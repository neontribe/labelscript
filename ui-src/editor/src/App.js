import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logo from './components/Logo/Logo.js'
import Button from './components/Button/Button.js'
import './App.css';

class App extends Component {
  propTypes: {
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Demo Page For Each Component</h2>
        </div>
        <div>
          <Logo />
        </div>
        <div>
          <Button imageUrl="http://megaicons.net/static/img/icons_sizes/8/178/256/very-basic-upload-icon.png"/>
          <Button imageUrl="http://image.flaticon.com/icons/png/512/0/532.png"/>
          <Button imageUrl="https://camo.githubusercontent.com/5ae5ccd3db74db855491b71855f9f25bca07e54d/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f333633363631312f313130373039362f36313130333533632d313935362d313165332d393930342d3536366266373038626338372e706e67"/>
          <Button imageUrl="https://image.freepik.com/free-icon/printer_318-50329.png"/>
        </div>
      </div>
    );
  }
}

export default connect((state) => { return {}})(App);
