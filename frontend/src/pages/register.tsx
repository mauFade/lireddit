import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

const Register = () => {
  const [, register] = useRegisterMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.createUser.errors) {
            setErrors(toErrorMap(response.data.createUser.errors));
          }
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
