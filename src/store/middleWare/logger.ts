import { Middleware } from 'redux';
import { RootState } from '../store';
import { AnyAction } from 'redux';

interface KnownAction extends AnyAction {
    type: string;
    payload?: any;
}

function isKnownAction(action: AnyAction): action is KnownAction {
    return action.type !== undefined;
}

export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action: unknown) => {
    if (!isKnownAction(action as AnyAction)) {
        return next(action);
    }

    next(action);
}