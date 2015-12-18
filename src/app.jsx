var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var firebaseURL = 'https://dazzling-heat-6771.firebaseio.com/';

var Header = require('./header');
var List = require('./list');

var ToDoApp = React.createClass({
  mixins: [ ReactFire ],
  getInitialState: function(){
    return {
      items: {},
      loaded: false
    }
  },

  componentWillMount: function(){
    this.fb = new Firebase(firebaseURL + '/items');
    this.bindAsObject(this.fb, 'items');
    this.fb.on('value', this.handleDataLoaded);
  },

  render: function(){
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">To Do Manager</h2>
        <Header itemStore={this.fb} />
        <hr/>
        <div className={"content" + (this.state.loaded? " loaded": "")}>
          <List items={this.state.items} />
          {this.clearButton()}
        </div>
      </div>
    </div>
  },

  handleDataLoaded: function(){
    this.setState({loaded: true});
  },

  clearButton: function() {
    if(!this.state.loaded || !this.state.items) {
      return;
    }
    else {
      return <div className="input-group">
        <button
          className="btn btn-default"
          onClick={this.handleClear}>Clear finished items</button>
      </div>
    }
  },

  handleClear: function(){
    for(var key in this.state.items) {
      if(this.state.items[key].done) {
        this.fb.child(key).remove();
      }
    }
  }
});

var element = React.createElement(ToDoApp, {});
React.render(element, document.querySelector(".container"));
