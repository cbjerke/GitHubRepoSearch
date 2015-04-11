'use strict';

var React = require('react-native');

var SearchUser = require('./SearchUser');

var {
  NavigatorIOS,
  StyleSheet,
  ActivityIndicatorIOS
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

var GitHubRepoSearch = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: SearchUser,
          title: 'GitHub Repo Search'
        }}/>
    );
  }
});

React.AppRegistry.registerComponent('GitHubRepoSearch', () => GitHubRepoSearch);














