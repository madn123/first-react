import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserCard from '../views/local/UserCard';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { setUser } from '../../redux-state/data/userSlice';
import { useQuery, Query } from '@redux-requests/react';

const User = () => {
    const dispatch = useDispatch();

    const { data, error, loading, pristine } = useQuery({ type: 'FETCH_USERS' });

    // const user = useSelector(selectUsers);

    // useEffect(() => {
    //     dispatch(fetchUsers());
    // }, [dispatch]);

    const handleCLick = () => {
        dispatch(setUser({id:999, name:'Kirill Admin'}));
    }
    
    return (
        <>
            {/* <Query
                type={'FETCH_USERS'}
                errorComponent={'RequestError'}
                loadingComponent={'Spinner'}
                noDataMessage={<p>There is no entity currently.</p>}
            >
                {({ data }) => {
                    data.map((user) => {
                        return <UserCard user={user} key={user.id} />
                    }
                )}}
            </Query> */}
            <Box sx={{ flexGrow: 1, maxWidth: 800, justifySelf: 'center' }}>
                <Grid container spacing={2}>
                    {loading && <div>Loading...</div>}
                    {!loading && error ? <div>Error: {error}</div> : null}
                    {!loading && data.length ? (
                        data.map((user) => {
                            return <Grid xs={4}><UserCard user={user} key={user.id} /></Grid>
                        })
                    ) : null }
                </Grid>
            </Box>

            <Link onClick={() => handleCLick()}>Авторизоваться под админом</Link>
        </>
    )
}

export default User;