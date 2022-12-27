type RegistrationBody = {
  email: string;
  password: string;
  secondPassword: string;
}

type LoginBody = {
  username: string;
  password: string;
}

type ChnagePasswordBoody = {
  password: string;
  secondPassword: string;
  chnageLink: string;
}