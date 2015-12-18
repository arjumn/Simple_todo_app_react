var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      text: this.props.item.text
    }
  },

  render: function(){
    return <div className="input-group">
      <span className="input-group-addon">
        <input
          type="checkbox"
          onChange={this.handleCheckbox} />
      </span>
      <input
        value={this.state.text}
        type="text"
        className="form-control"
        onChange={this.handleAddOnChange} />
      <span className="input-group-btn">
        <a
          className="btn btn-default">
          Delete
        </a>
      </span>
    </div>
  }
});
