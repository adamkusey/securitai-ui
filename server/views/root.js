import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <html>
            <head lang="en">
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta http-equiv="x-ua-compatible" content="ie=edge" />
                <title>Rush CAT</title>
                <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon"/>
                <link rel="stylesheet" href="/static/app.css"/>
            </head>
            <body>
            <div id="app"/>
            <script src="/static/app.bundle.js"/>
            </body>
            </html>
        );
    }
}

export default App;