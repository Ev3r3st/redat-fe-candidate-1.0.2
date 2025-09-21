import React from 'react';
import { Box, Alert, CircularProgress, Container, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../appRedux/hooks';
import { fetchUsers } from '../usersListSlice';
import { selectUser, clearUser } from '../userDetailSlice';
import type { RootState } from '../../../appRedux/store';
import type { User } from '../types';
import { UserDetailDialog } from './UserDetailDialog';

export const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s: RootState) => s.usersList);
  const { data: selected } = useAppSelector((s: RootState) => s.userDetail);

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const columns = React.useMemo<GridColDef<User>[]>(
    () => [
      { field: 'id', headerName: 'ID', width: 80 },
      { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
      { field: 'username', headerName: 'Username', flex: 1, minWidth: 130 },
      { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    ],
    []
  );

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>Users</Typography>
      {status === 'failed' && (
        <Alert severity="error" sx={{ mb: 2 }}>{error ?? 'Failed to load users'}</Alert>
      )}
      <Paper sx={{ height: 520, width: '100%', position: 'relative' }}>
        {status === 'loading' && (
          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
            <CircularProgress />
          </Box>
        )}
        <DataGrid
          rows={items}
          columns={columns}
          loading={status === 'loading'}
          onRowDoubleClick={(params) => {
            dispatch(selectUser(params.row as User));
          }}
          onRowClick={(params) => {
            dispatch(selectUser(params.row as User));
          }}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
          pageSizeOptions={[5, 10, 20]}
        />
      </Paper>

      <UserDetailDialog
        open={Boolean(selected)}
        user={selected}
        onClose={() => dispatch(clearUser())}
      />
    </Container>
  );
};

