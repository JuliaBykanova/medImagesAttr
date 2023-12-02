import { SET_USER_INFO } from './userActions';

interface UserState {
    lastName: string;
    firstName: string;
    patronymic: string;
    email: string;
    password: string;
}

const initialState: UserState = {
    lastName: '',
    firstName: '',
    patronymic: '',
    email: '',
    password: '',
};

const userReducer = (state = initialState, action: any): UserState => {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
