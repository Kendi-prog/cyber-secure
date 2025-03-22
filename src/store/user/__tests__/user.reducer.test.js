import { 
    userReducer,
    USER_INITIAL_STATE
} from "../user.reducer";

import { 
    signInSuccess, 
    signOutSuccess,
    signInFailed,
    signOutFailed,
    signUpFailed
} from "../user.action";

describe('User Reducer tests', () => {
    test('signInSuccess action', () => {
        const mockUser = {
            id: 1,
            name: 'test user'
        }

        const expectedState = {
            ...USER_INITIAL_STATE,
            currentUser: mockUser,
        }

        expect(userReducer(USER_INITIAL_STATE, signInSuccess(mockUser)))
        .toEqual(expectedState);
    });

    test('signOutSuccess action', () => {
        const expectedState = {
            ...USER_INITIAL_STATE,
            currentUser: null
        }

        expect(userReducer(USER_INITIAL_STATE, signOutSuccess()))
        .toEqual(expectedState);
    });

    test('signInFailed actions', () => {
        const mockError = new Error('oops! an error occurred');

        const expectedState = {
            ...USER_INITIAL_STATE,
            error: mockError
        }

        expect(userReducer(
            USER_INITIAL_STATE, 
            signInFailed(mockError)))
        .toEqual(expectedState);
    } );

    
    test('signOutFailed actions', () => {
        const mockError = new Error('oops! an error occurred');

        const expectedState = {
            ...USER_INITIAL_STATE,
            error: mockError
        }

        expect(userReducer(
            USER_INITIAL_STATE, 
            signOutFailed(mockError)))
        .toEqual(expectedState);
    } );

    
    test('signUpFailed actions', () => {
        const mockError = new Error('oops! an error occurred');

        const expectedState = {
            ...USER_INITIAL_STATE,
            error: mockError
        }

        expect(userReducer(
            USER_INITIAL_STATE, 
            signUpFailed(mockError)))
        .toEqual(expectedState);
    } );
});

