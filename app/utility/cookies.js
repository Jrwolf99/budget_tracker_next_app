import Cookie from 'js-cookie';

export function deleteAuth() {
  Cookie.remove('session_token');
}

export function session_token() {
  return Cookie.get('session_token');
}

export function createToken(token) {
  Cookie.set('session_token', token, {
    expires: 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
}
