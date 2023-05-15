import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./register.module.css";

export const Register = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const registerSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("First Name required"),

        lastName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Last Name required"),

        email: Yup.string().email("Please enter a valid Email").required("Email required"),
        password: Yup.string()
            .min(8, "Password must be 8 characters long")
            .matches(/[0-9]/, "Password must include a number")
            .matches(/[a-z]/, "Password must include a lowercase letter")
            .matches(/[A-Z]/, "Password must include an uppercase letter")
            .required("Required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Required"),
    });

    // useEffect(() => {
    //     const currentUser = AuthService.getCurrentUser();
    //     if (currentUser) {
    //         navigate("/profile");
    //     }
    // }, []);

    const handleRegister = (formValue: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) => {
        const { firstName, lastName, email, password, confirmPassword } = formValue;

        setMessage("");
        setLoading(true);

        console.log(firstName, lastName, email, password, confirmPassword);

        AuthService.register(firstName, lastName, email, password).then(response => {
            if (response.error) {
                setMessage(response.error.toString());
                setLoading(false);
            } else {
                navigate("/login");
            }
        });
    };

    return (
        <div
            className={styles.outerMostDiv}
            style={{ height: "100vh", display: "flex", flexDirection: "column" }}
        >
            <div
                className="card card-container mx-auto page-background"
                style={{ maxWidth: 500, marginTop: "5rem", borderRadius: "20px" }}
            >
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={registerSchema}
                    onSubmit={handleRegister}
                >
                    <Form className="m-5">
                        <h1 style={{}}>Register</h1>
                        <div className="form-group mx-auto" style={{ maxWidth: 400 }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: "1rem",
                                }}
                            >
                                <div style={{ flex: "1", marginRight: "1rem" }}>
                                    <label htmlFor="firstName">First Name</label>
                                    <Field
                                        name="firstName"
                                        type="text"
                                        className="form-control form-control-sm"
                                    />
                                    <ErrorMessage
                                        name="firstName"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div style={{ flex: "1" }}>
                                    <label htmlFor="lastName">Last Name</label>
                                    <Field
                                        name="lastName"
                                        type="text"
                                        className="form-control form-control-sm"
                                    />
                                    <ErrorMessage
                                        name="lastName"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email">Email</label>
                                <Field
                                    name="email"
                                    type="text"
                                    className="form-control form-control-sm"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div style={{ marginTop: "1rem" }}>
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

                            <div style={{ marginTop: "1rem" }}>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <Field
                                    name="confirmPassword"
                                    type="password"
                                    className="form-control form-control-sm"
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div style={{ marginTop: "1rem" }}>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    disabled={loading}
                                >
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Create Account</span>
                                </button>
                            </div>
                        </div>

                        {message && (
                            <div className="form-group mx-auto" style={{ maxWidth: 400 }}>
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}

                        <div>
                            <Link to="/login">Already have an account ?</Link>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};
