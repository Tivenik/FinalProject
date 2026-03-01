export function setCookie(name, value, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

export function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');

    if (parts[0] === name) {
      return parts[1] ? decodeURIComponent(parts[1]) : '';
    }

    return r;
  }, '');
}

