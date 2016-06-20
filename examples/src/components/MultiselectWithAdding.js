import React from 'react';
import Select from 'react-select';

const FLAVOURS = [
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },
];

var MultiSelectField = React.createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
			isLoading: false,
			options: FLAVOURS,
			values: [],
		};
	},
	handleSelectChange (values) {
		console.log('You\'ve selected:', values);
		this.setState({ values });
	},
	handleNewItem (value) {
		if (this.state.options.find(option => option.value === value)) {
			return null;
		}

		var item = {
			label: value,
			value: value.toLowerCase()
		};

		return new Promise((resolve, reject) => {
			this.state.options.push(item);
			setTimeout(() => resolve(item), 2500);
		});
	},
	toggleIsLoading () {
		this.setState({ isLoading: !this.state.isLoading });
	},
	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select
					multi 
					value={this.state.values} 
					placeholder="Select your favourite(s) or try add new" 
					options={this.state.options} 
					isLoading={this.state.isLoading}
					onChange={this.handleSelectChange} 
					onNewItem={this.handleNewItem}
				/>

				<div className="checkbox-list">
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" checked={this.state.isLoading} onChange={this.toggleIsLoading} />
						<span className="checkbox-label">Control is loading</span>
					</label>
				</div>
			</div>
		);
	}
});

module.exports = MultiSelectField;
