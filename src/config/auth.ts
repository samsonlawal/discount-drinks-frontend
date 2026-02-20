const auth = ({ inProduction }: { inProduction: boolean }) => {
  return {
    PERSIST_AUTH_KEY: "DISCOUNT_DRINKS_PERSISTOR",
    INITIAL_APP_STATE: {
      accessToken: "",
      // refreshToken: "",
      // expiresIn: undefined,
      user: undefined,
    },
  };
};

export default auth;
