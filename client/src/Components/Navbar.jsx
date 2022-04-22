import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          boxShadow: "rgb(231 235 240) 0px -1px 1px inset",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" color="secondary">
            OBE-WAN
          </Typography>
          <Stack spacing={2} direction="row" sx={{ flexGrow: 1 }}>
            <Button color="inherit" style={{ marginLeft: 26 }}>
              Courses
            </Button>
            <Button color="inherit">CLOs</Button>
            <Button color="inherit">PLOs</Button>
            <Button color="inherit">Results</Button>
            <Button color="inherit">Reports</Button>
          </Stack>
          <Button color="secondary">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
