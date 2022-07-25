import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Button,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useMutation } from "urql";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";

const REGISTER_MUTATION = `
mutation Register($username: String!, $password: String!) {
  createUser(options: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
`;

const Register = () => {
  const [, register] = useMutation(REGISTER_MUTATION);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          return register(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              label="Username"
              placeholder="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                label="Senha"
                placeholder="Senha"
                type="password"
              />
            </Box>
            <Button
              type="submit"
              colorScheme="telegram"
              mt={4}
              isLoading={isSubmitting}
            >
              Entrar
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
