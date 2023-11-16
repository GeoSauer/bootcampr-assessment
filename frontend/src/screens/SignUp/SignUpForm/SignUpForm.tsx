import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
} from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

type Values = {
  firstName: string
  lastName: string
  email: string
  password: string
  reenterPassword: string
}

const inputStyles = {
  fontSize: '16px',
  fontWeight: '200',
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email')
    .required('Email is required'),
  message: Yup.string().required('Message is required'),
})

export default function SignUpForm() {
  const [agree, setAgree] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)

  return (
    <VStack>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          reenterPassword: '',
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 500)
        }}
        validationSchema={validationSchema}
      >
        <Form>
          <Field name='firstName'>
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={!!(form.errors.firstName && form.touched.firstName)}
                sx={inputStyles}
              >
                <FormLabel htmlFor='firstName'>First name</FormLabel>
                <Input {...field} id='firstName' />
                <ErrorMessage name='firstName' />
              </FormControl>
            )}
          </Field>

          <Field name='lastName'>
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={!!(form.errors.lastName && form.touched.lastName)}
                sx={inputStyles}
              >
                <FormLabel htmlFor='lastName'>Last name</FormLabel>
                <Input {...field} id='lastName' />
                <ErrorMessage name='lastName' />
              </FormControl>
            )}
          </Field>

          <Field name='email'>
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={!!(form.errors.email && form.touched.email)}
                sx={inputStyles}
              >
                <FormLabel htmlFor='email'>
                  Email address (ex. jeanine@bootcampr.io)
                </FormLabel>
                <Input {...field} id='email' />
                <ErrorMessage name='email' />
              </FormControl>
            )}
          </Field>

          <Field name='password'>
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={!!(form.errors.password && form.touched.password)}
                sx={inputStyles}
              >
                <FormLabel htmlFor='email'>Password</FormLabel>
                <InputGroup>
                  <Input {...field} type={show ? 'text' : 'password'} />
                  <InputRightElement>
                    <Button background='none' onClick={() => setShow(!show)}>
                      {show ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <ErrorMessage name='password' />
              </FormControl>
            )}
          </Field>

          <Field name='reenterPassword'>
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={
                  !!(
                    form.errors.reenterPassword && form.touched.reenterPassword
                  )
                }
                sx={inputStyles}
              >
                <FormLabel htmlFor='email'>Re-enter password</FormLabel>
                <InputGroup>
                  <Input {...field} type={show ? 'text' : 'password'} />
                  <InputRightElement>
                    <Button background='none' onClick={() => setShow(!show)}>
                      {show ? <VisibilityOff /> : <Visibility />}{' '}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <ErrorMessage name='reenterPassword' />
              </FormControl>
            )}
          </Field>

          <HStack alignItems='flex-start'>
            <Checkbox
              isChecked={agree}
              pt={1}
              onChange={e => setAgree(e.target.checked)}
            />
            <Text ml={4} fontSize='14px'>
              I agree to receive email notification(s). We will only send emails
              with important information, like project start dates. We will not
              sell your information!
            </Text>
          </HStack>

          <Button
            type='submit'
            isDisabled={!agree}
            sx={{
              backgroundColor: agree ? '#EC993B' : '#ECEBEB',
              color: 'black',
            }}
          >
            Sign up
          </Button>
        </Form>
      </Formik>
    </VStack>
  )
}
