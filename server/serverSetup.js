import Hapi from 'hapi';
import Good from 'good';
import requireAll from 'require-all';
import config from './config/default';
import _ from 'lodash';

let server = new Hapi.Server();

function loadControllers() {
    server.route({
        method: 'GET',
        path: '/static/{params*}',
        config: {
            auth: false
        },
        handler: {
            directory: {
                path: '.build'
            }
        }
    });

    let controllers = requireAll(__dirname + '/controllers'),
        routes = _.flatten(_.values(controllers).map(_.values));

    server.route(routes);
}

server.connection({
    port: parseInt(process.env.PORT, 10) || config.port,
    host: '0.0.0.0'
});

function addViews() {
    server.views({
        engines: {
            js: require('hapi-react-views')
        },
        relativeTo: __dirname,
        path: 'views'
    });
}

function getPlugins() {
    return [
        require('vision'),
        require('inert'),
        {
            register: Good,
            options: {
                reporters: {
                    console: [{
                        module: 'good-squeeze',
                        name: 'Squeeze',
                        args: [{
                            response: '*',
                            log: '*'
                        }]
                    }, {
                        module: 'good-console'
                    }, 'stdout']
                }
            }
        }
    ];
}

export function setup(callback) {
    server.register(getPlugins(), (err) => {
        if (err) {
            throw err; // something bad happened loading the plugin
        }

        loadControllers();
        addViews();

        callback(server);
    });
}
