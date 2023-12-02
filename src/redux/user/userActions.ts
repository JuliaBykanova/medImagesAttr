export const SET_USER_INFO = 'SET_USER_INFO';

export const setUserInfo = (userInfo: any) => ({
    type: SET_USER_INFO,
    payload: userInfo,
});
