export const fetchApi = (url, method, body) => {
  return fetch(url, {
    method: method || 'get',
    body: JSON.stringify(body) || null
  })
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(json => json);
};
