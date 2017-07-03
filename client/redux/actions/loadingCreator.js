export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';

export const showLoader = () => {
    return {
        type: SHOW_LOADER
    };
};

export const hideLoader = () => {
    return {
        type: HIDE_LOADER
    };
};
