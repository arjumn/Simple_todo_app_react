var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      text: ""
    }
  },

  render: function(){
    return <div className="input-group">
      <input
        value={this.state.text}
        type="text"
        className="form-control"
        placeholder="Add Todo"
        onChange={this.handleAddToDo}/>
      <span className="input-group-btn">
        <a
          type="button"
          className="btn btn-default"
          onClick={this.handleAddClick}>
          Add
        </a>
      </span>
    </div>
  },

  handleAddToDo: function(event){
    this.setState({
      text: event.target.value
    })
  },

  handleAddClick: function(){
    this.props.itemStore.push({
      text: this.state.text,
      done: false
    });
    this.setState({
      text: ""
    })
  }
});
