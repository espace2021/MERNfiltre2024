import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import './style.css'

export default function Preferences() {
 
  return (
 
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
       
         <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <label className="switch">
                <input type="checkbox" />
                <span></span>
                </label> I want to receive Emails
            </Grid>    
            <Grid item xs={12}>
                <label className="switch">
                <input type="checkbox" />
                <span></span>
                </label> I want to receive notifications
            </Grid>   
            </Grid>
         </Box>
        </Box>
       
    
  );
}