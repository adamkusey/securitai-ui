export const RECEIVED_MODAL_CLOSE = 'RECEIVED_MODAL_CLOSE';
export const RECEIVED_MODAL_SHOW = 'RECEIVED_MODAL_SHOW';

export const closeModal = () => {
    return {
        type: RECEIVED_MODAL_CLOSE
    };
};

export const showModal = (payload) => {
    return {
        type: RECEIVED_MODAL_SHOW,
        payload
    };
};
