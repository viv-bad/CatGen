import React from "react";

import { Refine, AuthProvider, useAuthenticated } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
  LoadingButton,
} from "@pankod/refine-mui";

import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  PeopleAltOutlined,
  ScienceOutlined,
  ShowChart,
  ShowChartOutlined,
  StarOutlineRounded,
  VillaOutlined,
} from "@mui/icons-material";

import dataProvider from "@pankod/refine-simple-rest";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";
import {
  Login,
  Home,
  Researchers,
  MyProfile,
  ExperimentDetails,
  PlotDetails,
  AllExperiments,
  CreateExperiment,
  CreatePlot,
  ResearcherProfile,
  EditExperiment,
} from "pages";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";
import AllPlots from "pages/all-plots";
import EditPlot from "pages/edit-plot";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      // Save user to MongoDB here...

      if (profileObj) {
        const response = await fetch(
          "https://catgen.onrender.com/api/v1/users", //https://catgen.onrender.com/api/v1/users //http://localhost:8080/api/v1/users
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: profileObj.name,
              email: profileObj.email,
              avatar: profileObj.picture,
            }),
          }
        );

        const data = await response.json();

        if (response.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id,
            })
          );
        } else {
          return Promise.reject();
        }
      }

      localStorage.setItem("token", `${credential}`);
      // console.log("done");
      return Promise.resolve();
    },
    logout: () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem("token");
      // console.log("checking...");
      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider("https://catgen.onrender.com/api/v1")} //http://localhost:8080/api/v1 //https://catgen.onrender.com/api/v1
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "experiments",
              list: AllExperiments,
              // list: AllProperties,
              show: ExperimentDetails,
              create: CreateExperiment,
              edit: EditExperiment,
              icon: <ScienceOutlined />,
            },
            {
              name: "plots",
              list: AllPlots,
              // list: MuiInferencer,
              show: PlotDetails,
              create: CreatePlot,
              edit: EditPlot,
              icon: <ShowChartOutlined />,
            },
            {
              name: "researchers", //change to researchers
              // list: MuiInferencer,

              list: Researchers,
              show: ResearcherProfile,
              icon: <PeopleAltOutlined />,
            },
            // {
            //   name: "reviews",
            //   list: Home,
            //   icon: <StarOutlineRounded />,
            // },
            // {
            //   name: "messages",
            //   list: Home,
            //   icon: <ChatBubbleOutline />,
            // },
            {
              name: "my-profile",
              options: { label: "My Profile" },
              list: MyProfile,
              // list: MuiInferencer,
              icon: <AccountCircleOutlined />,
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          routerProvider={routerProvider}
          authProvider={authProvider}
          LoginPage={Login}
          DashboardPage={Home}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
