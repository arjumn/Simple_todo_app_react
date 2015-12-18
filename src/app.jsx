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
      items: {}
    }
  },

  componentWillMount: function(){
    this.fb = new Firebase(firebaseURL + '/items');
    this.bindAsArray(this.fb, 'items');
  },

  render: function(){
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">To Do Manager</h2>
        <Header itemStore={this.fb} />
        <hr/>
        <div className="form-group">
          <List items={this.state.items} />
        </div>
      </div>
    </div>
  }
});

var element = React.createElement(ToDoApp, {});
React.render(element, document.querySelector(".container"));
