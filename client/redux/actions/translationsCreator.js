export const TRANSLATIONS_RECEIVED = 'TRANSLATIONS_RECEIVED';

const translationReceived = (payload) => {
    return {
        type: TRANSLATIONS_RECEIVED,
        payload
    };
};

export const actions = {
    translationReceived
};

