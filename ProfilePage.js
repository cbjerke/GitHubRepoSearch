'use strict';

var React = require('react-native');

var {
	View,
	Image,
	Text,
	Component,
	StyleSheet,
	ListView,
	TouchableHighlight
} = React;


var ProfilePage = React.createClass({

	statics: {
		sectionHeader: 'Repositories'
	},

	getInitialState: function(){
  
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		var temp = [];
		var avatarUrl = '';

		console.log('REPOS!!!!!',this.props.repos)

		if(this.props.repos.message === 'Not Found'){
			temp.push('No public repositories.');
		} else {

			if(this.props.repos[0]){
				avatarUrl = this.props.repos[0].owner.avatar_url
			}
			
			for (var index = 0; index < this.props.repos.length; index++) {
				temp.push(this.props.repos[index].name);
			};
		}

		return {
			dataSource: ds.cloneWithRows(temp),
			userName: this.props.userName,
			avatarUrl: avatarUrl
		};	
	},

	render: function() {
		return (
			<View style={styles.mainContainer}>
				<View style={styles.container}>
					<Image
						style={styles.avatar}
						source={{uri: this.state.avatarUrl}}/>
					<Text style={styles.userName}>{this.state.userName}</Text>
				</View>
				<View style={styles.listViewContainer}>
					<ListView
				      dataSource={this.state.dataSource}
				      renderRow={this.renderRow}
				      renderHeader={this.renderHeader}/>
				</View>
				
			</View>
		);
	},

	renderHeader: function(){
		return (
			<View style={styles.sectionHeaderContainer}>
				<Text style={styles.sectionHeaderTitles}>
					Repositories:
				</Text>
			</View>
		)
	},

	renderRow: function(rowData, sectionID, rowID){

		return (
			<TouchableHighlight
				underlayColor='#dddddd'>
				<View>
					<View style={styles.rowContainer}>
						<View style={styles.textContainer}>
							<Text style={styles.rowText}>
								{rowData}
							</Text>
						</View>
					</View>
					<View style={styles.separator}/>
				</View>
			</TouchableHighlight>
		);
	}
});

var styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		flexDirection: 'column',
	},
	listViewContainer: {
		flex: 2
	},
	sectionHeaderContainer:{
		flex: 1,
		margin: 10,
	},
	container:{
		flex: 1,
		marginTop: 85,
		marginLeft: 10,
	    alignItems: 'flex-start',
	},
	userName:{
		margin: 5,
		fontSize: 18,
		color: 'black',
		fontWeight: 'bold'
	},
	avatar:{
		width: 150,
		height: 150
	}, 
	rowContainer: {
	    flexDirection: 'row',
	    margin: 10,
	},
	rowText:{
		fontSize: 20,
	    color: '#656565'
	},
	sectionHeaderTitles:{
		fontSize: 12,
		fontWeight: 'bold'
	},
	textContainer: { 
	    flex: 1,
	},
	separator: {
		height: 1,
	    backgroundColor: '#dddddd'
	}
});

module.exports = ProfilePage;




