import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signInValidationSchema } from "../../utils/validations"
import { Signin } from "@/src/types/interface/auth";
import { auth } from "@service";
import { useState } from "react";
import "./style.scss"
import { useNavigate } from "react-router-dom";

const index = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const initialValues: Signin = {
        email: "",
        password: "",
    }
    const handleSubmit = async (values: Signin) => {
        const payload = { ...values }
        try {
            const response = await auth.sign_in(payload);
            if (response.status === 200) {
                localStorage.setItem("token", response.data.access_token)
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
        console.log(payload);
    }
    return (
        <>
            <div className="h-screen flex-col flex items-center justify-center gap-8 p-5">
                <h1 className="text-[35px] font-bold sm:text-[40px] md:text-[50px]">
                    Login
                </h1>
                <div className="max-w-[600px]">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={signInValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>


                                <Field
                                    name="email"
                                    type="email"
                                    as={TextField}
                                    label="Email"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    helperText={
                                        <ErrorMessage name="email" component='span' className="text-[red] text-[15px]" />
                                    }
                                />
                                <Field
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    as={TextField}
                                    label="Parol"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    helperText={
                                        <ErrorMessage name="password" component='span' className="text-[red] text-[15px]" />
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={isSubmitting}
                                    className="mt-5"
                                >
                                    Kirish
                                </Button>

                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default index;