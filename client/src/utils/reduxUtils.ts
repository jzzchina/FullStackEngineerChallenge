import { Reducer, ReducersMapObject } from 'redux';

export function createReducer<T>(initialState: T, handlers: ReducersMapObject = {}): Reducer<T> {
    return (state = initialState, action) => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        }
        return state;
    };
}

export default createReducer;
