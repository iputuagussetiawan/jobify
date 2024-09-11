import { Link, Form, redirect,useActionData  } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: '' };
  if (data.password.length < 3) {
    errors.msg = 'password too short';
    return errors;
  }
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboard');
  } catch (error) {
    //toast.error(error?.response?.data?.msg);
    error.msg=error?.response?.data?.msg
    return error;
  }
};

const Login = () => {
  const errors = useActionData();

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        {errors?.msg&& <p style={{ color:'red' }}>{errors.msg}</p>}
        <FormRow type='email' name='email' defaultValue='agus@gmail.com' />
        <FormRow type='password' name='password' defaultValue='secret123' />
        <SubmitBtn formBtn/>
        <button type='button' className='btn btn-block' >
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
