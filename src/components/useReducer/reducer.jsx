import {crudActions} from './actions';
export const todoReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case crudActions.ADD:
            return [...state, payload]
        case crudActions.DELETE:
            return state.filter((user) => user.id !== payload);
        case crudActions.EDIT:
            return state.map((user) => user.id === payload.id ? payload : user)
        default:
            break;
    }
}