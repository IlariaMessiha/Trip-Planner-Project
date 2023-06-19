import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { object, string, TypeOf } from "zod";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                {t("navBar.logo")}
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
};

const defaultTheme = createTheme();

export const RegisterPage = () => {
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
    }, [isSubmitSuccessful, reset]);

    const onSubmitHandler: SubmitHandler<RegisterInput> = async values => {

        await AuthService.register({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
        })
            .then(async () => {
                toast.success("User Created Successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 4000,
                    hideProgressBar: true,
                });
                navigate("/auth/login");
            })
            .catch(e => {
                toast.error(e.response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 4000,
                    hideProgressBar: true,
                });
                reset();
                console.log("Registration error");
            });

        console.log(values);
    };
    console.log(errors);
    const { t } = useTranslation();
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
                        {t("user.signUp")}
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
                                    label={t("registration.firstName")}
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
                                    label={t("registration.lastName")}
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
                                    label={t("common.email")}
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
                                    label={t("registration.pw")}
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
                                    label={t("registration.confirmPw")}
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
                            {t("user.signUp")}
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href={"/auth/login"} variant="body2">
                                    {t("user.haveAccount")}
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
