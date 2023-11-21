import { atom } from 'jotai';

export const accessTokenAtom = atom(localStorage.getItem('accessToken') || '');

export const updateToken = (newToken) => {
  localStorage.setItem('accessToken', newToken);
  accessTokenAtom[1](newToken);
};