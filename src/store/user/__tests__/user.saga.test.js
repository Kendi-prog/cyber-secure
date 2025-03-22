import { call } from "typed-redux-saga/macro";
import { testSaga, expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";

import { 
    getSnapshotFromUserAuth,
    signInWithGoogle,
    signInWithEmail,
    isUserAuthenticated,
    signUp,
    signOut,
    signInAfterSignUp,
    onGoogleSignInStart,
    onEmailSignInStart,
    onCheckUserSession,
    onSignOutStart,
    onSignUpStart,
    onSignUpSuccess,
    userSagas

} from "../user.saga";

import { 
    signOutFailed,
    signOutSuccess,
    signInFailed,
    signInSuccess,
    signUpFailed,
    signUpSuccess,
 } from "../user.action";

 import { 
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser
 } from "../../../utils/firebase/firebase.utils";

import { USER_ACTION_TYPES } from "../user.type";
import { displayPartsToString } from "typescript";

describe('User Saga tests', () => {
    test('userSagas', () => {
        testSaga(userSagas)
            .next()
            .all([
                call(onCheckUserSession),
                call(onGoogleSignInStart),
                call(onEmailSignInStart),
                call(onSignOutStart),
                call(onSignUpStart),
                call(onSignUpSuccess)
            ])
            .next()
            .isDone();
    });

    test('onGoogleSignInStartsaga should takeLatest GOOGLE_SIGN_IN_START and call signInWithGoogle ', 
        () => {
            testSaga(onGoogleSignInStart)
                .next()
                .takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
                .next()
                .isDone();
        });

    test('onCheckUserSession saga should takeLatest CHECK_USER_SESSION and call isUserAuthenticated',
        () => {
            testSaga(onCheckUserSession)
                .next()
                .takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
                .next()
                .isDone();
        });

    test('onEmailSignInStart saga should takeLatest EMAIL_SIGN_IN_START and call signInWithEmail',
        () => {
            testSaga(onEmailSignInStart)
                .next()
                .takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
                .next()
                .isDone();
        });

    test('onSignUpStart saga should takeLatest SIGN_UP_START and call signUp',
        () => {
            testSaga(onSignUpStart)
                .next()
                .takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
                .next()
                .isDone();
        });

    test('onSignUpSuccess saga should takeLatest SIGN_UP_SUCCESS and call signInAfterSignUp',
        () => {
            testSaga(onSignUpSuccess)
                .next()
                .takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
                .next()
                .isDone();
        });

    test('onSignOutStart saga should takeLatest SIGN_OUT_START and call signOut',
        () => {
            testSaga(onSignOutStart)
                .next()
                .takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
                .next()
                .isDone();
        });

    test('signInAfterSignUp saga should call getUserFromAuth and signIn', () => {
        const mockUser = { id: 1, name: 'test'};
        const mockAdditionalDetails = { displayName: 'test'};
        const mockPayload = {
            user: mockUser,
            additionalDetails: mockAdditionalDetails
        }
        testSaga(signInAfterSignUp, {
            payload: mockPayload
        })
            .next()
            .call(getSnapshotFromUserAuth, mockUser, mockAdditionalDetails)
            .next()
            .isDone();
    });

    test('signOut saga success path should call signOutUser and put signOutSuccess if successfull', 
        () => {
        return expectSaga(signOut)
            .provide([[call(signOutUser)]])
            .put(signOutSuccess())
            .run();
    });

    test('signOut saga error path should call signOutUser and put signOutFailed if error', 
        () =>  {
            const error = new Error('error test');

            return expectSaga(signOut)
                .provide([[call(signOutUser), throwError(error)]])
                .put(signOutFailed(error))
                .run();

    });

    test('signUp success path should call createAuthUserWithEmailAndPassword and put signUpSuccess if successfull', 
        () => {
            const mockEmail = 'test@test';
            const mockPassword = 'password';
            const mockDisplayName = 'test';
            const mockUser = { displayName: mockDisplayName, email: mockEmail };
            const mockUserCredentials = { id: 1, user: mockUser};

            const mockPayload = {
                email: mockEmail,
                password: mockPassword,
                displayName: mockDisplayName
            }

            return expectSaga(signUp, {
                payload: mockPayload
            })
                .provide([
                    [
                        call(createAuthUserWithEmailAndPassword, mockEmail, mockPassword),
                        mockUserCredentials
                    ]
                ])
                .put(signUpSuccess(mockUserCredentials.user, { displayName: mockDisplayName }))
                .run();

        });

    test('signUp error path should call createAuthUserWithEmailAndPassword and put signUpFailed if error', 
        () => {
            const mockEmail = 'test@test';
            const mockPassword = 'password';
            const mockError = new Error('error test');

            const mockPayload = {
                email: mockEmail,
                password: mockPassword,
            }

            return expectSaga(signUp, {
                payload: mockPayload
            })
                .provide([
                    [
                        call(createAuthUserWithEmailAndPassword, mockEmail, mockPassword),
                        throwError(mockError)
                    ]
                ])
                .put(signUpFailed(mockError))
                .run();
        });

    test('isUserAuthenticated saga success path should call getCurrentUser and signIn if successful', 
        () => {
            const mockUserAuth = { id: 1, name: 'test'};

            return expectSaga(isUserAuthenticated)
                .provide([[call(getCurrentUser), mockUserAuth]])
                .call(getSnapshotFromUserAuth, mockUserAuth)
                .run();
        });

    test('isUserAuthenticated saga error path should call getCuurentUser and signFailed if failed', 
        () => {
            const mockError = new Error('error test');

            return expectSaga(isUserAuthenticated)
                .provide([[call(getCurrentUser), throwError(mockError)]])
                .put(signInFailed(mockError))
                .run();
        });

    test('signInWithEmail saga success path should call signInAuthUserWithEmailAndPassword and getSnapshotFromUserAuth if successful',
        () => {
            const mockEmail = 'test@test';
            const mockPassword = 'password';
            const mockUser = { id: 1, name: 'test', email: mockEmail};
            const mockUserCredentials = { id: 1, user: mockUser};

            const mockPayload = {
                email: mockEmail,
                password: mockPassword
            }

            return expectSaga(signInWithEmail, {
                payload: mockPayload
            })
                .provide([
                    [
                        call(signInAuthUserWithEmailAndPassword, mockEmail, mockPassword),
                        mockUserCredentials
                    ]
                ])
                .call(getSnapshotFromUserAuth, mockUser)
                .run();
        });

    test('signInWithEmail saga error path should call signInAuthUserWithEmailAndPassword and signInFailed if error',
        () => {
            const mockEmail = 'test@test';
            const mockPassword = 'password';
            const mockError = new Error('error test');

            const mockPayload = {
                email: mockEmail,
                password: mockPassword
            }

            return expectSaga(signInWithEmail, {
                payload: mockPayload
            })
                .provide([
                    [
                        call(signInAuthUserWithEmailAndPassword, mockEmail, mockPassword),
                        throwError(mockError)
                    ]
                ])
                .put(signInFailed(mockError))
                .run();
        }); 

    test('signInWithGoogle saga success path should call signInWithGooglePopup and getSnapshotFromUserAuth if successful',
        () => {
            const mockUser = { id: 1, name: 'test'};
            const mockGoogleVal = { user: mockUser};

            return expectSaga(signInWithGoogle)
                .provide([
                    [
                        call(signInWithGooglePopup),
                        mockGoogleVal
                    ]
                ])
                .call(getSnapshotFromUserAuth, mockUser)
                .run();
        });

    test('signInWithGoogle saga error path should call signInWithGooglePopup and signInFailed if error',
        () => {
            const mockError = new Error('error test');

            return expectSaga(signInWithGoogle)
                .provide([
                    [
                        call(signInWithGooglePopup),
                        throwError(mockError)
                    ]
                ])
                .put(signInFailed(mockError))
                .run();
        });

    test('getSnapshotFromUserAuth should call createUserDocumentFromAuth and put signInSuccess', 
        () => {
            const mockUserAuth = { id: 1, name: 'test'};
            const mockAdditionalDetails = { displayName: 'test'};
            const mockUserSnapShot = {
                id: 2, data: () => ({ displayName: 'test'})
            }

            return expectSaga(
                getSnapshotFromUserAuth, 
                mockUserAuth, 
                mockAdditionalDetails
            )
                .provide([
                    [
                        call(createUserDocumentFromAuth, mockUserAuth, mockAdditionalDetails), 
                        mockUserSnapShot
                    ]
                ])
                .put(signInSuccess({ id: mockUserSnapShot.id, ...mockUserSnapShot.data()}))
                .run();
        });

    test('getSnapshotFromUserAuth saga error path should put signInFailed on error', 
        () => {
            const mockUserAuth = { id: 1, name: 'test'};
            const mockAdditionalDetails = { displayName: 'test'};
            const mockError = new Error('error test');

            return expectSaga(getSnapshotFromUserAuth, mockUserAuth, mockAdditionalDetails)
                .provide([
                    [
                        call(createUserDocumentFromAuth, mockUserAuth, mockAdditionalDetails),
                        throwError(mockError)
                    ]
                ])
                .put(signInFailed(mockError))
                .run();
        });
});