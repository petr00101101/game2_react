export const SET_TOKEN_EXPIRED = 'SET_TOKEN_EXPIRED';

export function setTokenExpired(value) {
  return {
      type: SET_TOKEN_EXPIRED,
      value
  }
}