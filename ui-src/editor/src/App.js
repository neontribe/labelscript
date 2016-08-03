import React, { Component } from 'react';
// Well, I tried this... 'import materialize; //Try This!'
import { connect } from 'react-redux';
import Logo from './components/Logo/Logo.js'
import PreviewBox from './components/PreviewBox/PreviewBox.js'
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
          <Button class="waves-effect waves-light btn" icon="system_update_alt" />
          <Button class="waves-effect waves-light btn" icon="present_to_all" />
          <Button class="waves-effect waves-light btn" icon="description" />
          <Button class="waves-effect waves-light btn" icon="print" />
        </div>
        <PreviewBox x="1" />
      </div>
    );
  }
}

export default connect((state) => { return {}})(App);
