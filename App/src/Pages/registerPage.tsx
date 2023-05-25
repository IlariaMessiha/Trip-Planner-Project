import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useEffect, useState } from "react";
import { FormGroup, FormHelperText } from "@mui/material";
import Alert from "@mui/material/Alert";
import { literal, object, string, TypeOf } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
const registerSchema = object({
    firstName: string()
        .nonempty("Name is required")
        .max(32, "Name must be less than 100 characters"),
    lastName: string()
        .nonempty("Name is required")
        .max(32, "Name must be less than 100 characters"),
    email: string().nonempty("Email is required").email("Email is invalid"),
    password: string()
        .nonempty("Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    confirmPassword: string().nonempty("Please confirm your password"),
}).refine(data => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});

type RegisterInput = TypeOf<typeof registerSchema>;

const Copyright = (props: any) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
};

const defaultTheme = createTheme();

export const SignUp = () => {
    const navigate = useNavigate();

   

    const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<RegisterInput> = values => {
        AuthService.register(values.firstName, values.lastName, values.email, values.password).then(
            response => {
                console.log(response);
                if (response.error) {
                    
                    toast.error(response.error, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 4000,
                        hideProgressBar: true,
                    });
                    reset();
                    console.log("Registration error");
                } else {
                    toast.success("User Created Successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 4000,
                        hideProgressBar: true,
                    });
                    navigate("/login");
                }
            }
        );

        console.log(values);
    };
    console.log(errors);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit(onSubmitHandler)}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    error={!!errors["firstName"]}
                                    helperText={
                                        errors["firstName"] ? errors["firstName"].message : ""
                                    }
                                    {...register("firstName")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    autoComplete="family-name"
                                    error={!!errors["lastName"]}
                                    helperText={
                                        errors["lastName"] ? errors["lastName"].message : ""
                                    }
                                    {...register("lastName")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    type="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    error={!!errors["email"]}
                                    helperText={errors["email"] ? errors["email"].message : ""}
                                    {...register("email")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    id="password"
                                    error={!!errors["password"]}
                                    helperText={
                                        errors["password"] ? errors["password"].message : ""
                                    }
                                    {...register("password")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    autoComplete="confirmPassword"
                                    fullWidth
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    error={!!errors["confirmPassword"]}
                                    helperText={
                                        errors["confirmPassword"]
                                            ? errors["confirmPassword"].message
                                            : ""
                                    }
                                    {...register("confirmPassword")}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item >
                                <Link href={"/login"} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
};
