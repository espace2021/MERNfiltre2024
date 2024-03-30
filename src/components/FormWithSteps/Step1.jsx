import React  from "react";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useForm  } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const UserSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    password2: z.string(),
    avatar:z.string().url().optional(),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords do not match",
    path: ["password2"], // path of error
   });

const theme = createTheme();

export default function Register(props) {

  const { 
      // handleSubmit: function to handle form submission
  handleSubmit,
    // register: function to register input elements
    register, 
   // formState: object containing information about form state
  formState: { errors } // Destructure errors 
  } = useForm({
     // resolver: specify resolver for form validation using Zod
    resolver: zodResolver(UserSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true
  });
 

  const onSubmit = (data) => {
     props.setObjectData(data)
 };

 
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box  sx={{ mt: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
               <TextField 
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  defaultValue={props.objectData.name}
                   error={!!errors.name}
                  helperText={errors.name && errors.name.message} // Affichage du message d'erreur
                  {...register("name")} 
                />
         
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  defaultValue={props.objectData.email}
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                  {...register("email")} 
                 />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  defaultValue={props.objectData.password}
                  type="password"
                  error={!!errors.password?.message}
                  helperText={errors.password?.message}
                  {...register("password")} 
                 />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Retype Password"
                  name="password2"
                  defaultValue={props.objectData.password2}
                  type="password"
                  error={!!errors.password2?.message}
                  helperText={errors.password2?.message}
                  {...register("password2")} 
                 />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Avatar"
                  name="avatar"
                  defaultValue={props.objectData.avatar}
                  error={!!errors.password2?.message}
                  helperText={errors.password2?.message}
                  {...register("avatar")} 
                />
              </Grid>
            </Grid>
            <button type="submit" variant="contained" color="primary">
            Submit
          </button>
        </form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
