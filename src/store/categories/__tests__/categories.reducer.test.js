import { 
    categoriesReducer, 
    CATEGORIES_INITIAL_STATE 
} from "../category.reducer";

import { 
    fetchCategoriesStart, 
    fetchCategoriesSuccess, 
    fetchCategoriesFailed 
} from "../category.action";

describe('Categories Reducer tests', () => {
    test('fetchCategoriesStart action', () => {
        const expectedState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: true
        }

        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesStart()))
        .toEqual(expectedState);
    });

    test('fetchCategoriesSuccess action', () => {
        const mockData = [
            {
                title: 'mens',
                imageUrl:'test',
                items: [
                    { id: 1, name: 'product 1' },
                    { id: 2, name: 'product 2' }
                ]
            },
            {
                title: 'womens',
                imageUrl:'test',
                items: [
                    { id: 3, name: 'product 3' },
                    { id: 4, name: 'product 4' }
                ]
            }
        ]

        const expectedState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: false,
            categories: mockData
        }

        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesSuccess(mockData)))
        .toEqual(expectedState);

    });

    test('fetchCategoriesFailed action', () => {
        const mockError = new Error('error');

        const expectedState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: false,
            error: mockError
        }

        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesFailed(mockError)))
        .toEqual(expectedState);
    });
})