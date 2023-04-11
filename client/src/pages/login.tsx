import { useEffect, useRef, useState } from "react";
import { useLogin, useAuthenticated } from "@pankod/refine-core";
import {
  Container,
  Box,
  LoadingButton,
  Stack,
  Typography,
  CircularProgress,
} from "@pankod/refine-mui";

import { catgen, logo_catgen, yariga, logo, login_logo } from "../assets";

import { CredentialResponse } from "../interfaces/google";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();
  const [loggingIn, setLoggingIn] = useState(false);
  // const { isLoading, data } = useAuthenticated();
  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    // if (isLoading) {
    //   console.log("loading...");
    // }
    const loginProgress = (
      <Typography mt={1}>Logging in. Please be patient...</Typography>
    );

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              setLoggingIn(true);
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []); // you can also add your client id as dependency here

    return <div ref={divRef} />;
  };

  return (
    <Box
      component="div"
      sx={{
        backgroundColor: "#FCFCFC",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <img src={login_logo} alt="login Logo" className="login_logo" />
          </div>
          <Box mt={4}>
            <GoogleButton />
          </Box>
          {loggingIn ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
              mt={2}
            >
              <CircularProgress color="success" />
              <Typography mt={1}>Logging in. Please be patient...</Typography>
            </Box>
          ) : // <CircularProgress />
          // <Typography mt={1}>Logging in. Please be patient...</Typography>
          null}
        </Box>
      </Container>
    </Box>
  );
};
