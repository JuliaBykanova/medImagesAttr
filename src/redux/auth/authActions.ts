export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const RESET_AUTH_MESSAGE = 'RESET_AUTH_MESSAGE';
export const loginSuccess = () => ({
    type: LOGIN_SUCCESS,
});

export const loginFailure = (errorMessage: string) => ({
    type: LOGIN_FAILURE,
    payload: errorMessage,
});

interface ResetAuthMessageAction {
    type: typeof RESET_AUTH_MESSAGE;
}

export const resetAuthMessage = (): ResetAuthMessageAction => ({
    type: RESET_AUTH_MESSAGE,
});