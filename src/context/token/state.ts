export type Token = {
  address: string;
  symbol: string;
  balance: string;
  name: string;
};

export type TokenState = {
  isLoading: boolean;
  error?: string;
};

export type State = {
  tokens: Record<string, Token>;
  tokenStates: Record<string, TokenState>;
};

export type Action =
  | { type: 'SET_TOKEN'; payload: Token }
  | { type: 'SET_TOKEN_STATE'; payload: Pick<Token, 'address'> & TokenState }
  | { type: 'RESET' };

const initialState: State = { tokens: {}, tokenStates: {} };
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      const token = action.payload;
      return {
        ...state,
        tokens: { ...state.tokens, [token.address]: token },
      };
    case 'SET_TOKEN_STATE':
      const { address, ...tokenState } = action.payload;
      return {
        ...state,
        tokenStates: { ...state.tokenStates, [address]: tokenState },
      };
    case 'RESET':
      const shouldReset = Object.keys(state.tokens).length > 0;
      return shouldReset ? initialState : state;
    default:
      throw new Error();
  }
};

export { initialState, reducer };
