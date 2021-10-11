export const SHOW_SCREEN_LOADING = 'SHOW_SCREEN_LOADING';
export const HIDE_SCREEN_LOADING = 'HIDE_SCREEN_LOADING';

export function showScreenLoading(message?: string) {
  return {
    type: SHOW_SCREEN_LOADING,
    payload: {message},
  };
}

export function hideScreenLoading() {
  return {
    type: HIDE_SCREEN_LOADING,
  };
}
