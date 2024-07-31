
export const fetchPhoto = (id) => ({
    type: 'FETCH_PHOTO',
    request: { url: `/photos?id=${id}` },
});

export const fetchUsers = () => ({
    type: 'FETCH_USERS',
    request: { url: `/users` },
});
