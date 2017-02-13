import React, { Component, PropTypes } from 'react';
import Money from './money'

class DungeonEcology extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Dungeon Ecology</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><a href="javascript:Game.saveGame()"><span className="glyphicon glyphicon-floppy-disk"></span> Save</a></li>
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" role="button">
                                    <Money />
                                    <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href="javascript:Game.gain(10)">+10 <span className="glyphicon glyphicon-cd"></span></a></li>
                                    <li><a href="javascript:Game.gain(100)">+100 <span className="glyphicon glyphicon-cd"></span></a></li>
                                    <li><a href="javascript:Game.gain(1000)">+1000 <span className="glyphicon glyphicon-cd"></span></a></li>
                                    <li><a href="javascript:Game.gain(10000)">+10000 <span className="glyphicon glyphicon-cd"></span></a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="javascript:Game.pay(10)">&ndash;10 <span className="glyphicon glyphicon-cd"></span></a></li>
                                    <li><a href="javascript:Game.pay(100)">&ndash;100 <span className="glyphicon glyphicon-cd"></span></a></li>
                                    <li><a href="javascript:Game.pay(1000)">&ndash;1000 <span className="glyphicon glyphicon-cd"></span></a></li>
                                    <li><a href="javascript:Game.pay(10000)">&ndash;10000 <span className="glyphicon glyphicon-cd"></span></a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default DungeonEcology;