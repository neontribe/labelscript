import React, { Component } from 'react';
import './PreviewBox.css';

export default class PreviewBox extends Component {
	propTypes: {
		x: React.PropTypes.Number
	}

	render() {
		return (
			<div className="previewbox">
			{this.props.x}
			</div>
		);
	}
}