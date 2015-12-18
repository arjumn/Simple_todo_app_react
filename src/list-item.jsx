var React = require('react');
var Firebase = require('firebase');
var firebaseURL = 'https://dazzling-heat-6771.firebaseio.com/';

module.exports = React.createClass({
  getInitialState: function(){
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      editing: false
    }
  },

  componentWillMount: function(){
    this.fb = new Firebase(firebaseURL + 'items/' + this.props.item.key);
  },

  render: function(){
    return <div className="input-group">
      <span className="input-group-addon">
        <input
          checked={(this.state.done)? "checked": ""}
          type="checkbox"
          onChange={this.handleCheckbox} />
      </span>
      <input
        value={this.state.text}
        type="text"
        className="form-control"
        onChange={this.handleEdit}
        disabled={(this.state.done)?'disabled':''}/>
      <span className="input-group-btn">
        {this.saveUndoButtons()}
        <a
          className="btn btn-default"
          onClick={this.handleDelete}>
          Delete
        </a>
      </span>
    </div>
  },

  handleCheckbox: function(event){
    var checked = !this.state.done;
    this.fb.update({done: checked});
    this.setState({done: checked});
  },

  handleEdit: function(event){
    this.setState({
      text: event.target.value,
      editing: true
    });
  },

  saveUndoButtons: function(){
    if(this.state.editing){
      return [
        <a
          className="btn btn-default"
          onClick={this.handleSave}>
          Save
        </a>,
        <a
          className="btn btn-default"
          onClick={this.handleUndo}>
          Undo
        </a>
      ]
    }
    else {
      return;
    }
  },

  handleSave: function(event){
    this.fb.update({text: this.state.text});
    this.setState({editing: false});
  },

  handleUndo: function(){
    this.setState({
      editing: false,
      text: this.props.item.text
    });
  },

  handleDelete: function(){
    this.fb.remove();
  }
});
