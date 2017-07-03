import qwest from 'qwest';

qwest.setDefaultDataType('json');

function handleError(err, xhr, callback) {
    let error = err;

    if (xhr.status === 200) {
        error = null;
    }

    callback(error, xhr.response);
}

function getBody(response) {
    return response.response;
}

export function get(url, callback) {
    qwest.get(url, undefined)
        .then((xhr, response) => callback(null, response))
        .catch((err, xhr) => handleError(err, xhr, callback));
}

export function post(url, data, callback) {
    qwest.post(url, data)
        .then((xhr, response) => callback(null, response))
        .catch((err, xhr) => handleError(err, xhr, callback));
}

export function put(url, data, callback) {
    qwest.put(url, data)
        .then((xhr, response) => callback(null, response))
        .catch((err, xhr) => handleError(err, xhr, callback));
}

export function del(url, data, callback) {
    qwest.delete(url, data)
        .then((xhr, response) => callback(null, response))
        .catch((err, xhr) => handleError(err, xhr, callback));
}
