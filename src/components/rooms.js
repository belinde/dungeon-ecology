
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class RoomList extends Component {
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Rooms</h3>
                </div>
                <div className="list-group" id="rooms">
                    <a className="list-group-item room disabled">No rooms yet :-(</a>
                </div>
                <div className="panel-footer">
                    <a className="btn btn-primary btn-block" data-toggle="modal" data-target="#modalNewRoom">
                        <span className="glyphicon glyphicon-shopping-cart"></span> Buy a room
                                </a>
                </div>
            </div>
        );
    }
}
class RoomDetail extends Component {
    render() {
        return (
            <div className="panel panel-default hidden" id="showRoom">
                <div className="panel-heading">
                    <h3 className="panel-title">Room name</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                    </div>
                </div>
            </div>
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
