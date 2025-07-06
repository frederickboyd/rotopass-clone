export const isValidJWT = (token: string | null): boolean => {
  return typeof token === "string" && token.split(".").length === 3;
};
