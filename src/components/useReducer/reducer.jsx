export const todoReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case 'add':
            return [...state, payload]
        case 'delete':
            return state.filter((user) => user.id !== payload);
        case 'edit':
            return state.map((user) => user.id === payload.id ? payload : user)
        default:
            break;
    }
}