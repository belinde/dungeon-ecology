import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Money extends Component {
    render() {
        return (
            <span className="money">
                <span className="glyphicon glyphicon-cd"></span>
                {this.props.amount}
            </span>
        );
    }
}

Money.propTypes = {
    amount: PropTypes.number.isRequired
}

export default connect(
    (state) => ({ amount: state.money }),
    () => ({})
)(Money);