import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./login.module.css";

export const Login = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const SignInSchema = Yup.object().shape({
        username: Yup.string().email("Please enter a valid Email").required("Email required"),
        password: Yup.string().required("Password Required"),
    });

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            navigate("/");
        }
    }, []);

    const handleLogin = (formValue: { username: string; password: string }) => {
        const { username, password } = formValue;

        setMessage("");
        setLoading(true);

        AuthService.login(username, password).then(response => {
            if (response.error) {
                const resMessage = response.error.toString();
                setMessage(resMessage);
                setLoading(false);
            } else {
                navigate("/");
            }
        });
    };

    return (
        <div
            className={styles.outerMostDiv}
            style={{ height: "100vh", display: "flex", flexDirection: "column" }}
        >
            <div
                className="card card-container mx-auto"
                style={{ width: "30vw", marginTop: "9rem", borderRadius: "20px" }}
            >
                <Formik
                    initialValues={{ username: "", password: "" }}
                    validationSchema={SignInSchema}
                    onSubmit={handleLogin}
                >
                    <Form className="m-5">
                        <h1>Login</h1>
                        <div className="form-group mx-auto" style={{ maxWidth: 400 }}>
                            <label htmlFor="username">Email</label>
                            <Field
                                name="username"
                                type="text"
                                className="form-control form-control-sm"
                            />
                            <ErrorMessage
                                name="username"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>

                        <div className="form-group mx-auto" style={{ maxWidth: 400 }}>
                            <label htmlFor="password">Password</label>
                            <Field
                                name="password"
                                type="password"
                                className="form-control form-control-sm"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>

                        <div className="form-group mx-auto" style={{ maxWidth: 400 }}>
                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                                disabled={loading}
                            >
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </button>
                        </div>

                        {message && (
                            <div className="form-group mx-auto" style={{ maxWidth: 400 }}>
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}

                        <div>
                            <Link to="/register">Don't have account?</Link>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};
