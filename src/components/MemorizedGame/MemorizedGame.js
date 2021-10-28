import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllWords } from "../../store/actions/words";

class MemorizedGame extends Component {
  componentDidMount() {
    this.props.fetchAllWords(this.props.match.params.id);
    console.log(this.props.loading);
  }
  render() {
    return (
      <div>
        {!this.props.loading && this.props.AllWords[0] ? (
          <h1>{this.props.AllWords[0].rus}</h1>
        ) : (
          <h1 onClick={() => console.log(this.props.loading)}>Ждем....</h1>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    AllWords: state.words.AllWords,
    loading: state.words.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllWords: (id) => dispatch(fetchAllWords(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MemorizedGame);
