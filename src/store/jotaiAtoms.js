import { atom } from 'jotai';

export const accessTokenAtom = atom(localStorage.getItem('accessToken') || '');

export const setAccessToken = (newToken) => {
  localStorage.setItem('accessToken', newToken);
  accessTokenAtom[1](newToken);
};