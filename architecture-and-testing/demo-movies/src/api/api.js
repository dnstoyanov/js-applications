const host = 'http://localhost:3030';

export async function request(url, options) {
    try {
        const response = await fetch(host + url, options);

        if (response.ok != true) {
            if (response.status == 403) {
                sessionStorage.removeItem('userData');
            } else {
                const error = await response.json();
                throw new Error(error.message);
            }
        }

        const data = await response.json();

        if (response.status == 204) {
            return response;
        } else {
            return data;
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export async function get(url) {
    return request(url, createOptions());
}

async function createOptions(method = 'get', data) {
    const options = {
        method, 
        headers: {}
    };

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
    }

    const userData =JSON.parse(sessionStorage.getItem('userData'));

    if (userData != null) {
        options.headers['X-Authorization'] = userData.token;
        options.body = JSON.stringify(data);
    }
}


export async function post(url, data) {
    return request(url, createOptions('post', data));
}

export async function put(url, data) {
    return request(url, createOptions('put', data));
}

export async function del(url) {
    return request(url, createOptions('delete'));
}

export async function login(email, password) {
    const response = await request('/users/login', createOptions('post', { email, password }));
    const userData =  {
        email: response.email,
        id: response._id,
        token: response.accessToken
    };

    sessionStorage.setItem('userData', JSON.stringify(userData));
}

export async function register(email, password) {
    const response = await request('/users/register', createOptions('post', { email, password }));
    const userData =  {
        email: response.email,
        id: response._id,
        token: response.accessToken
    };

    sessionStorage.setItem('userData', JSON.stringify(userData));
}

export async function logout() {
    await request('users/logout', createOptions());
    sessionStorage.removeItem('userData');
}

