/* We are just creating the functions given in the array, instead of writing the same thing over and over again like we used to do
 * The first field passed is the function name.
 * The following fields will give the parameter names
 */
AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
functions = [
  ['logout'],
  ['login', 'username', 'password'], 
  ['register', 'username', 'email', 'password'],
  ['get_details', 'id'],
  ['create_game', 'name', 'details'], 
  ['get_games'], 
  ['get_games_list'],
  ['poll']];

for (fn of functions) {
  fn_str = `
        let values = {request_type:'${fn[0]}',${Array.from(fn.slice(1), x => x + ':' + x).join(',')}};
        return request(values);
    `;
  eval(`${fn[0]} = new AsyncFunction(...fn.slice(1), fn_str);`);
}

//https://stackoverflow.com/a/4004010/14686793
function getCookies() {
  var c = document.cookie, v = 0, cookies = {};
  if (document.cookie.match(/^\s*\$Version=(?:"1"|1);\s*(.*)/)) {
      c = RegExp.$1;
      v = 1;
  }
  if (v === 0) {
      c.split(/[,;]/).map(function(cookie) {
          var parts = cookie.split(/=/, 2),
              name = decodeURIComponent(parts[0].trimLeft()),
              value = parts.length > 1 ? decodeURIComponent(parts[1].trimRight()) : null;
          cookies[name] = value;
      });
  } else {
      c.match(/(?:^|\s+)([!#$%&'*+\-.0-9A-Z^`a-z|~]+)=([!#$%&'*+\-.0-9A-Z^`a-z|~]*|"(?:[\x20-\x7E\x80\xFF]|\\[\x00-\x7F])*")(?=\s*[,;]|$)/g).map(function($0, $1) {
          var name = $0,
              value = $1.charAt(0) === '"'
                        ? $1.substr(1, -1).replace(/\\(.)/g, "$1")
                        : $1;
          cookies[name] = value;
      });
  }
  return cookies;
}

function getSelfID() {
  return getCookies().userID;
}

async function upload(formData) {
  return fetch('/upload', {
    method: 'post',
    body: formData
  }).then(response => response.json());
}

async function get_file(file_id) {
  return fetch('/download', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      file_id: file_id
    })
  }).then(res => res.blob());
}

async function request(values) {
  return fetch('/request', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  }).then(response => {console.log(response); return response.json()});
}

async function log(data) {
  console.log(data);
}