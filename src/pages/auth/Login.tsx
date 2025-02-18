import { memo, useState } from "react";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { FormHelperText } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../services/helperService";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { ERROR_MESSAGE } from "../../constants/clientConstants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userForm, setUserForm] = useState({
    userEmail: "",
    password: "",
  });
  const [error, setError] = useState({
    userEmailError: "",
    userPasswordError: "",
    invalidPasswordError: "",
  });

  const handleUserForm = (type: string, value: string) => {
    setUserForm((prev: any) => {
      prev[type] = value;
      return { ...prev };
    });
  };

  const handleLogin = async () => {
    try {
      setError((prevErr) => {
        const error = prevErr;
        error.userEmailError =
          userForm.userEmail?.length === 0 ? ERROR_MESSAGE.EMAIL_MANDATORY : "";
        error.userPasswordError =
          userForm.password?.length === 0
            ? ERROR_MESSAGE.PASSWORD_MANDATORY
            : "";
        return { ...error };
      });
      if (!userForm.userEmail || !userForm.password) {
        return;
      }

      const data = await loginApi({
        userEmail: userForm.userEmail,
        password: userForm.password,
      });
      if (data.token) {
        localStorage.setItem("token", data.token);
        dispatch(setUser({ userName: data.userName, userId: data?.id }));
        navigate("/home");
      }
    } catch (error) {
      setError((prevErr) => {
        const error = prevErr;
        error.invalidPasswordError = ERROR_MESSAGE.INVALID_EMAIL_PASSWORD;
        return { ...error };
      });
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
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="userEmail"
            type="email"
            placeholder="abc@email.com"
            value={userForm.userEmail}
            onChange={(e) => handleUserForm("userEmail", e.target.value)}
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
            value={userForm.password}
            onChange={(e) => handleUserForm("password", e.target.value)}
          />
          {error.userPasswordError?.length ? (
            <FormHelperText sx={{ color: "red" }}>
              {error.userPasswordError}
            </FormHelperText>
          ) : null}
        </FormControl>
        {error.invalidPasswordError?.length ? (
            <FormHelperText sx={{ color: "red" }}>
              {error.invalidPasswordError}
            </FormHelperText>
          ) : null}
        <Button sx={{ mt: 1 }} onClick={handleLogin}>
          Log in
        </Button>
        <Typography
          endDecorator={<Link href="/register">Sign up</Link>}
          sx={{ fontSize: "sm", alignSelf: "center" }}
        >
          Don&apos;t have an account?
        </Typography>
      </Sheet>
    </>
  );
};

export default memo(Login);
