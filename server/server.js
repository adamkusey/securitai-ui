import { setup } from './serverSetup';

setup((server) => {
    server.start(() => console.log('Server started at: ' + server.info.uri));
});
