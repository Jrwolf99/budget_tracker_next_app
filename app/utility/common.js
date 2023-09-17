import axios from 'axios';
import { createToken, session_token, deleteAuth } from './cookies';
import { setCurrentUserId } from './localStorage';

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const isInNoHeaderList = (pathname) => {
  const noHeaderList = [
    '/login',
    '/register',
    '/verify-email',
    '/reset-password',
  ];
  return noHeaderList.includes(pathname);
};

const redirectToLogin = () => {
  const loginPath = '/login';
  if (typeof window !== 'undefined' && window.location.pathname !== loginPath) {
    window.location.href = loginPath;
  }
};

export function isLoggedIn() {
  return session_token() !== undefined && session_token() !== null;
}

export function login(email, password, router) {
  axios
    .post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL_DOMAIN}/api/v1/authentications/sign_in`,
      {
        email,
        password,
      }
    )
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        alert('Login successful');
        const token = res.headers.get('X-Session-Token');
        createToken(token);
        setCurrentUserId(res.data.user_id);
        router.push('/transactions?selected_identifier=all');
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.data) {
        console.log(JSON.stringify(err.response.data));
        alert(
          'Login failed, error: ' + JSON.stringify(err.response.data.error)
        );
      }
    });
}

export function logout() {
  authedDelete('authentications/sign_out', {
    params: { signed_id: session_token() },
  });
  deleteAuth();
  window.location.href = '/';
}

const validateStatus = (status) => {
  if (status === 401) {
    deleteAuth();
  }
  return status < 400;
};

export function unauthedGet(url, config = {}) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`, {
    ...config,
  });
}

const authHeaders = (isFormData = false) => ({
  'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
  AUTHORIZATION: `Token ${session_token()}`,
});

export function authedGet(url, config = {}) {
  if (!isLoggedIn()) redirectToLogin();
  config.headers = authHeaders();
  return axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`, {
    validateStatus,
    ...config,
  });
}

export function authedDelete(url, config = {}) {
  if (!isLoggedIn()) redirectToLogin();
  return axios
    .delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`, {
      headers: authHeaders(),
      validateStatus,
      ...config,
    })
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        alert('Delete successful');
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.data) {
        console.log(JSON.stringify(err.response.data));
        alert(
          'Delete failed, error: ' + JSON.stringify(err.response.data.error)
        );
      }
    });
}

export function authedPost(url, data, config = {}, isFormData = false) {
  if (!isLoggedIn()) redirectToLogin();
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`, data, {
      headers: {
        ...authHeaders(isFormData),
        ...config.headers,
      },
      validateStatus,
      ...config,
    })
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        alert(isFormData ? 'CSV upload successful' : 'Post successful');
        if (!isFormData) return;
        const { created_count, duplicate_count } = res.data;
        alert(
          `Created ${created_count} transactions, skipped ${duplicate_count} duplicates`
        );
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.data) {
        console.log(JSON.stringify(err.response.data));
        alert('Post failed, error: ' + JSON.stringify(err.response.data.error));
      }
    });
}

export function authedPut(url, data, config = {}) {
  if (!isLoggedIn()) redirectToLogin();
  return axios
    .put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`, data, {
      headers: {
        ...authHeaders(),
        ...config.headers,
      },
      validateStatus,
      ...config,
    })
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        console.log(`put successful from url: ${url}`);
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.data) {
        console.log(JSON.stringify(err.response.data));
        alert('Put failed, error: ' + JSON.stringify(err.response.data.error));
      }
    });
}
