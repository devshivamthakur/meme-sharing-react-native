import { UPDATE_PROFILE } from "./Constant"

const initialState = {
   useInfo: {},

}

export default function UserInforReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_PROFILE:
            return {
                ...state,
                useInfo: action.payload,
            }
        default:
            return state
    }
}
