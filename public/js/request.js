/* We are just creating the functions given in the array, instead of writing the same thing over and over again like we used to do
 * The first field passed is the function name.
 * The following fields will give the parameter names
 */

functions = [
    ['testfn', 'firstparam', 'secondparam'],
    ['login', 'username', 'password'],
    ['poll']
]

for(fn of functions) {
    //Stores the parameters as strings in the array
    let parameters_arr = []
    for(let i = 1; i < fn.length; i++) {
        parameters_arr.push(fn[i]);
    }

    //Create the string for the parameters passed to the function [eg fn(arg1, arg2, arg3) => parameters_str = '(arg1, arg2, arg3)']
    let parameters_str = '('+parameters_arr.join()+')';

    //Creates the string for the parameters in values array [eg let values = {request_type: 'login', username: 'user', password: 'pass'} => requests_str = ", username: 'user', password: 'pass'"]
    let requests_str = '';
    for(param of parameters_arr) {
        requests_str += `, ${param}:${param}`;
    }

    //Finally, create the function using the above variables using eval function
    eval(`async function ${fn[0]}${parameters_str} {
        let values = {request_type: '${fn[0]}'${requests_str}};
        return request(values);
    }`)
}

async function request(values) {
    return fetch('http://localhost:3000/request', {
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
