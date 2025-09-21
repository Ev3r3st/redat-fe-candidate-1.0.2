import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, TextField } from '@mui/material';
import type { User } from '../types';

type Props = {
  open: boolean;
  user: User | null;
  onClose: () => void;
};

export const UserDetailDialog: React.FC<Props> = ({ open, user, onClose }) => {
  const [form, setForm] = React.useState<User | null>(user);
  const [errors, setErrors] = React.useState<{ email?: string; website?: string }>({});

  React.useEffect(() => {
    setForm(user);
  }, [user]);

  const handleChange = (field: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSave = () => {
    if (!form) return;
    const nextErrors: { email?: string; website?: string } = {};
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Invalid email format';
    }
    // Removed website scheme validation per request
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const payload = {
      id: form.id,
      name: form.name,
      username: form.username,
      email: form.email,
      phone: form.phone,
      website: form.website,
    };
    // As requested: no API call, just log the JSON payload
    // eslint-disable-next-line no-console
    console.log('SAVE payload:', JSON.stringify(payload, null, 2));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>User detail</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="Name" value={form?.name ?? ''} onChange={handleChange('name')} />
          <TextField label="Username" value={form?.username ?? ''} onChange={handleChange('username')} />
          <TextField label="Email" value={form?.email ?? ''} onChange={handleChange('email')} error={Boolean(errors.email)} helperText={errors.email} />
          <TextField label="Phone" value={form?.phone ?? ''} onChange={handleChange('phone')} />
          <TextField label="Website" value={form?.website ?? ''} onChange={handleChange('website')} error={Boolean(errors.website)} helperText={errors.website} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};
