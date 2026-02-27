const BASE_URL = 'http://localhost:5000/api';

export const apiRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem('adminToken');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log(`[API] Sending Authorization header for ${endpoint}`);
    } else {
        console.warn(`[API] No token found in localStorage for ${endpoint}`);
    }

    console.log(`[API] Fetching ${BASE_URL}${endpoint}`);
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('adminToken');
        window.location.reload();
        throw new Error('Unauthorized');
    }

    return response.json();
};
