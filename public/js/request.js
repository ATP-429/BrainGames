/* We are just creating the functions given in the array, instead of writing the same thing over and over again like we used to do
 * The first field passed is the function name.
 * The following fields will give the parameter names
 */

AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;

functions = [
    ['login', 'username', 'password'],
    ['register', 'username', 'email', 'password'],
    ['create_game', 'name'],
    ['get_games'],
    ['poll']
]

for(fn of functions) {
    fn_str = `
        let values = {request_type:'${fn[0]}',${Array.from(fn.slice(1), (x => x + ':' + x)).join(',')}};
        return request(values);
    `
    eval(`${fn[0]} = new AsyncFunction(...fn.slice(1), fn_str);`);
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
        body: JSON.stringify({file_id: file_id})
    }).then(res => res.blob());
}

async function request(values) {
    return fetch('/request', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    }).then(response => response.json());
}

async function log(data) {
    console.log(data);
}
