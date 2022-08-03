//액션 타입
const UPDATE_SCORE = 'match/UPDATE_SCORE';

interface scoreData {
  redScore: number;
  blueScore: number;
  redPenalty: number;
  bluePenalty: number;
}

//액션 생성 함수
export const updateScore = (data: scoreData) => {
  return {
    type: UPDATE_SCORE,
    payload: data,
  };
};

//reducer
const initialState = { redScore: 0, blueScore: 0, redPenalty: 0, bluePenalty: 0 };
export default function (state = initialState, action: any) {
  switch (action.type) {
    case UPDATE_SCORE:
      return {
        ...state,
        redScore: action.payload.redScore,
        blueScore: action.payload.blueScore,
        redPenalty: action.payload.redPenalty,
        bluePenalty: action.payload.bluePenalty,
      };

    default:
      return state;
  }
}
