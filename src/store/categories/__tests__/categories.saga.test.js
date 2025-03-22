import { testSaga, expectSaga } from "redux-saga-test-plan";
import { call } from "typed-redux-saga/macro";
import { throwError } from "redux-saga-test-plan/providers";
import { 
    onFetchCategories, 
    categoriesSaga, 
    fetchCategoriesAsync 
} from "../category.saga";

import { CATEGORIES_ACTION_TYPES } from "../category.types";
import { getCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";
import { fetchCategoriesSuccess, fetchCategoriesFailed } from "../category.action";

describe('Categories Saga tests', () => {
    test('categoriesSaga', () => {
        testSaga(categoriesSaga)
            .next()
            .all([call(onFetchCategories)])
            .next()
            .isDone();
    });

    test('onFetchCategories', () => {
        testSaga(onFetchCategories)
            .next()
            .takeLatest(
                CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
                fetchCategoriesAsync
            )
            .next()
            .isDone();
    });

    test('fetchCategoriesAsync success', () => {
        const mockCategoriesArray = [
            { id: 1, name: 'category 1' },
            { id: 2, name: 'category 2' }
        ]

        
        return expectSaga(fetchCategoriesAsync)
            .provide([[call(getCategoriesAndDocuments), mockCategoriesArray]])
            .put(fetchCategoriesSuccess(mockCategoriesArray))
            .run();
    });

    test('fetchCategoriesAsync failure', () => {
        const mockError = new Error('an error occurred');

        return expectSaga(fetchCategoriesAsync)
            .provide([[call(getCategoriesAndDocuments), throwError(mockError)]])
            .put(fetchCategoriesFailed(mockError))
            .run();
    });
});