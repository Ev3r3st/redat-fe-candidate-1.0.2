import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, TextField, IconButton, Avatar, Tooltip, Divider, Grid, InputAdornment, Slide } from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import type { User } from '../types';

type Props = {
  open: boolean;
  user: User | null;
  onClose: () => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const UserDetailDialog: React.FC<Props> = ({ open, user, onClose }) => {
  const [form, setForm] = React.useState<User | null>(user);
  const [errors, setErrors] = React.useState<{ email?: string; website?: string }>({});

  React.useEffect(() => {
    setForm(user);
  }, [user]);

  const handleChange = (field: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    const value = e.target.value;
    setForm({ ...form, [field]: value });
    if (field === 'email') {
      setErrors((prev) => ({ ...prev, email: value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : undefined }));
    }
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

  const isDirty = React.useMemo(() => {
    if (!user || !form) return false;
    const keys: (keyof User)[] = ['name', 'username', 'email', 'phone', 'website'];
    return keys.some((k) => form[k] !== user[k]);
  }, [form, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave();
  };

  const initials = React.useMemo(() => {
    const n = form?.name?.trim() || user?.name || '';
    if (!n) return '';
    const parts = n.split(' ');
    return (parts[0]?.[0] || '').toUpperCase() + (parts[1]?.[0] || '').toUpperCase();
  }, [form?.name, user?.name]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" TransitionComponent={Transition}>
      <DialogTitle sx={{ pr: 6 }}>
        <Stack direction="column" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {initials || <PersonIcon />}
          </Avatar>
          User detail
        </Stack>
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <form onSubmit={handleSubmit} noValidate>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                value={form?.name ?? ''}
                onChange={handleChange('name')}
                fullWidth
                autoFocus
                InputProps={{ startAdornment: (<InputAdornment position="start"><PersonIcon fontSize="small" /></InputAdornment>) }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Username"
                value={form?.username ?? ''}
                onChange={handleChange('username')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                value={form?.email ?? ''}
                onChange={handleChange('email')}
                error={Boolean(errors.email)}
                helperText={errors.email}
                fullWidth
                InputProps={{ startAdornment: (<InputAdornment position="start"><MailOutlineIcon fontSize="small" /></InputAdornment>) }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone"
                value={form?.phone ?? ''}
                onChange={handleChange('phone')}
                fullWidth
                InputProps={{ startAdornment: (<InputAdornment position="start"><PhoneIcon fontSize="small" /></InputAdornment>) }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Website"
                value={form?.website ?? ''}
                onChange={handleChange('website')}
                error={Boolean(errors.website)}
                helperText={errors.website}
                fullWidth
                placeholder="example.com or https://example.com"
                InputProps={{ startAdornment: (<InputAdornment position="start"><LanguageIcon fontSize="small" /></InputAdornment>) }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Tooltip title="Esc">
            <Button onClick={onClose} color="inherit">Cancel</Button>
          </Tooltip>
          <Tooltip title="Enter">
            <span>
              <Button type="submit" variant="contained" disabled={!form || !isDirty || Boolean(errors.email)}>
                Save
              </Button>
            </span>
          </Tooltip>
        </DialogActions>
      </form>
    </Dialog>
  );
};
