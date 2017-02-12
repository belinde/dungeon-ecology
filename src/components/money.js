import React, { Component, PropTypes } from 'react';

class Money extends Component {
    render() { 
        const { amount } = this.props;
        return (
<span className="money">
    <span className="glyphicon glyphicon-cd"></span>
    {amount} fava
</span>
        );
    }
}

Money.propTypes = {
    amount: PropTypes.number.isRequired
}

export default Money;