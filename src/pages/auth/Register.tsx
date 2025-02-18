import { memo, useState } from "react";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { FormHelperText } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../../services/helperService";
import { setUser } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "@mui/material";
import { ERROR_MESSAGE, ERROR_TYPE } from "../../constants/clientConstants";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    userEmail: "",
    password: "",
  });

  const [error, setError] = useState({
    firstNameError: "",
    lastNameError: "",
    userEmailError: "",
    passwordError: "",
  });

  // validate the email pattern
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // setting the register when user types
  const handleInputChange = (type: string, value: string) => {
    setRegisterForm((prev: any) => {
      prev[type] = value;
      return { ...prev };
    });
  };

  // api call for register user
  const handleRegister = async () => {
    try {
      setError((prevErr) => {
        const error = prevErr;
        error.firstNameError =
          registerForm.firstName?.length === 0
            ? ERROR_MESSAGE.FIRST_NAME_MANDATORY
            : "";
        error.lastNameError =
          registerForm.lastName?.length === 0
            ? ERROR_MESSAGE.LAST_NAME_MANDATORY
            : "";
        error.userEmailError =
          registerForm.userEmail?.length === 0
            ? ERROR_MESSAGE.EMAIL_MANDATORY
            : !validateEmail(registerForm.userEmail)
            ? ERROR_MESSAGE.VALID_EMAIL
            : "";
        error.passwordError =
          registerForm.password?.length === 0
            ? ERROR_MESSAGE.PASSWORD_MANDATORY
            : "";
        return { ...error };
      });
      if (
        !registerForm.firstName ||
        !registerForm.lastName ||
        !registerForm.userEmail ||
        !registerForm.password ||
        !validateEmail(registerForm.userEmail)
      ) {
        return;
      }
      const userPayload = {
        firstName: registerForm.firstName,
        lastName: registerForm.lastName,
        userEmail: registerForm.userEmail,
        password: registerForm.password,
      };
      const data = await registerApi(userPayload);
      if (data.token) {
        localStorage.setItem("token", data.token);
        dispatch(setUser({ userName: data.userName, userId: data?.id }));
        navigate("/home");
      } else if (
        data.error &&
        data.message === ERROR_TYPE.USER_ALREADY_EXISTS
      ) {
        setError((prevErr) => {
          const error = prevErr;
          error.userEmailError = ERROR_MESSAGE.EMAIL_ALREADY_EXISTS;
          return { ...error };
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Sheet
        sx={{
          width: 500,
          mx: "auto",
          my: 4,
          py: 3,
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm">Create a new account.</Typography>
        </div>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input
            name="firstName"
            type="text"
            placeholder="Enter First name"
            onChange={(e) => handleInputChange("firstName", e.target.value)}
          />
          {error.firstNameError?.length ? (
            <FormHelperText sx={{ color: "red" }}>
              {error.firstNameError}
            </FormHelperText>
          ) : null}
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input
            name="lastName"
            type="text"
            placeholder="Enter Last name"
            onChange={(e) => handleInputChange("lastName", e.target.value)}
          />
          {error.lastNameError?.length ? (
            <FormHelperText sx={{ color: "red" }}>
              {error.lastNameError}
            </FormHelperText>
          ) : null}
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="userEmail"
            type="email"
            placeholder="abc@email.com"
            onChange={(e) => handleInputChange("userEmail", e.target.value)}
          />
          {error.userEmailError?.length ? (
            <FormHelperText sx={{ color: "red" }}>
              {error.userEmailError}
            </FormHelperText>
          ) : null}
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="password"
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
          {error.passwordError?.length ? (
            <FormHelperText sx={{ color: "red" }}>
              {error.passwordError}
            </FormHelperText>
          ) : null}
        </FormControl>
        <Button sx={{ mt: 1 }} onClick={handleRegister}>
          Register
        </Button>
        <Typography
          endDecorator={<Link href="/login">Sign In</Link>}
          sx={{ fontSize: "sm", alignSelf: "center" }}
        >
          Already have an account?
        </Typography>
      </Sheet>
    </>
  );
};

export default memo(Register);
