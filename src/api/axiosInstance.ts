import axios from "axios";
// import { parse, stringify } from "qs";
import { tokens } from "@/utils/jwtTokenStorage";
import { ErrorResult, SuccessResult } from "./types";
import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
  headers: {
    "Content-Type": "application/json",
  },

  // paramsSerializer: {
  //   encode: parse,
  //   serialize: stringify,
  // },
});

// @axios interceptors

// @response interceptor

axiosInstance.interceptors.response.use((response) => {
  const newAccessToken = response.headers["x-access"];
  if (newAccessToken && tokens.accessToken() !== newAccessToken) {
    tokens.setAccessToken(newAccessToken);
  }

  if (response.data.status === 403) {
    tokens.removeAccessToken();
    window.location.reload();
  }

  return response;
});

// @request function for api call.

export const request = async <T>(
  config: AxiosAuthRefreshRequestConfig
): Promise<SuccessResult<T> | ErrorResult> => {
  try {
    if (!config.headers) {
      config.headers = {};
    }
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    if (tokens.accessToken()) {
      config.headers.Authorization = `Bearer ${tokens.accessToken()}`;
    }
    const response = await axiosInstance.request({ ...config });

    return {
      remote: "success",
      data: response.data,
      // header: response.headers,
    };
  } catch (error: any) {
    if (error) {
      console.log(error, "erororo");
      if (error.response) {
        if (error.response && error.response.data) {
          let errorMessage = error.response.data;

          if (error.response.status === 500) {
            errorMessage = "Internal Server Error!";
          } else if (error.response.status === 404) {
            errorMessage = "404 Not Found!";
          }

          return {
            remote: "failure",
            error: {
              status: error.response.status,
              errors: errorMessage,
            },
          };
        }
      } else {
        const errorMessage = error.message;

        return {
          remote: "failure",
          error: {
            errors: errorMessage,
          },
        };
      }
    }
    throw error;
  }
};

const api = { axiosInstance, request };
export default api;
