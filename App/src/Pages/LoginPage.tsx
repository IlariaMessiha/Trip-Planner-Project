import { zodResolver } from "@hookform/resolvers/zod";
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
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string, TypeOf } from "zod";
import { fetchData } from "../api/FetchData";
import { useAuthContext } from "../context/authContext";
import AuthService from "../services/auth.service";

const registerSchema = object({
    email: string().nonempty("Email is required").email("Email is invalid"),
    password: string().nonempty("Password is required"),
});

type RegisterInput = TypeOf<typeof registerSchema>;

const Copyright = (props: any) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {"Copyright © "}
            <Link color="inherit" href="/">
                Trip Planner
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const LoginPage = () => {
    const { setUserInContext } = useAuthContext();

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
        await AuthService.login({
            email: values.email,
            password: values.password,
        })
            .then(async response => {
                localStorage.setItem("accessToken", response.accessToken);
                const token = localStorage.getItem("accessToken");
                if (token) {
                    const user = await fetchData.getMe(token);
                    setUserInContext(user);
                    navigate("/");
                } else {
                    setUserInContext(null);
                }
            })
            .catch(e => {
                toast.error(e.response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 4000,
                    hideProgressBar: true,
                });
                console.log(e);
                reset();
            });
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
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmitHandler)}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            error={!!errors["email"]}
                            helperText={errors["email"] ? errors["email"].message : ""}
                            {...register("email")}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={!!errors["password"]}
                            helperText={errors["password"] ? errors["password"].message : ""}
                            {...register("password")}
                        />

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/auth/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
};
