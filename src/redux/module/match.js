const CREATE_MATCH = 'match/CREATE_MATCH';

export const createMatch = match => {
  return {
    type: CREATE_MATCH,
    payload: { id: match.id, inviteCode: match.inviteCode },
  };
};

const initialState = { id: 0, inviteCode: '' };

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_MATCH:
      return {
        ...state,
        id: action.payload.id,
        inviteCode: action.payload.inviteCode,
      };

    default:
      return state;
  }
}
