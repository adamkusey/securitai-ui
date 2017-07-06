import React, { Component } from 'react';
require('./header.scss');

class Header extends Component {
    render() {
        return (
            <header className="ui-header">
                <img src='/static/images/hacker-lock.png'/>SecuritAI
            </header>
        );
    }
}

export default Header;
