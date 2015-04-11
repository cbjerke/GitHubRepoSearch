'use strict';

var React = require('react-native');

var ProfilePage = require('./ProfilePage');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

var SearchUser = React.createClass({
  
	getInitialState: function(){
		return{
			searchString: '',
			loading: false
		};
	},

	onSearchTextChange: function(event){
		this.setState({searchString: event.nativeEvent.text});
	},

	onSearchPress: function(){
		
		var url = 'https://api.github.com/users/' + this.state.searchString + '/repos';
		
		this.fetchUsers(url);
	},

	fetchUsers: function(url){
		this.setState({loading: true})
		fetch(url)
			.then((response) => response.json())
			.then((json) => this.handleResponse(json))
			.catch(error => console.log('!!!!!!!!!Error: ', error))
			.done();
	},

	handleResponse: function(response){
		this.setState({isLoading: false});
		this.props.navigator.push({
			title: 'Profile',
			component: ProfilePage,
			passProps: {repos: response, userName: this.state.searchString}
		});
	},

	render: function() {

		var githubAvatarUri = 'https://avatars.githubusercontent.com/u/9919?v=3';

	    return (
	      <View style={styles.container}>
	      	  <Image
	      	  	style={styles.githubAvatar}
	      	  	source={{uri: githubAvatarUri }}/>
			  <Text style={styles.title}>Find User:</Text>
		      <TextInput
		          style={styles.textInput}
		          placeholder='Look up user'
		          onChange={this.onSearchTextChange}/>
		   
		      <TouchableHighlight style={styles.button}
		      	   onPress={this.onSearchPress}>
		      	<Text style={styles.buttonText}>Search</Text>
			  </TouchableHighlight>
	      </View>

	    );
	}
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 75,
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  title: {
    alignItems: 'flex-start',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5
  },
  button: {
  	width: 100,
  	height: 36,
  	margin: 10,
  	backgroundColor: '#5cb85c',
  	borderColor: '#4cae4c',
  	justifyContent: 'center'
  },
  buttonText: {
  	fontSize: 18,
  	alignSelf: 'center',
  	color: 'white'
  },
  githubAvatar: {
  	marginLeft: 80,
  	marginBottom: 15,
  	height: 200,
  	width: 200
  },
});

module.exports = SearchUser;





