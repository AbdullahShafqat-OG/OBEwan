import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          boxShadow: '#bdbdbd 0px -1px 1px inset',
        }}
      >
        <Toolbar>
          <Button sx={{ p: 0 }} href="/">
            <Typography variant="logo" component="div" color="secondary">
              OBE-WAN
            </Typography>
          </Button>
          <Stack spacing={2} direction="row" sx={{ flexGrow: 1 }}>
            <Button color="inherit" style={{ marginLeft: 26 }} href="/courses">
              Courses
            </Button>
            <Button color="inherit" href="/activities">
              Activities
            </Button>
            <Button color="inherit" href="/clos">
              CLOs
            </Button>
            <Button color="inherit" href="/plos">
              PLOs
            </Button>
            <Button color="inherit" href="/reports">
              Reports
            </Button>
          </Stack>
          <Button color="secondary">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
