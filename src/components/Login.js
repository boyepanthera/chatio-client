import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import * as Yup from 'yup'
import JWT from 'jsonwebtoken'
import { Formik } from 'formik'
import { LoginUser } from '../services/Auth.service'
import { Context } from '../Store'
import { loginUser } from '../Store/actionTypes'

const Login = () => {
  const [redirect, setRedirect] = useState(false)
  const { dispatch } = useContext(Context)
  const handleSubmit = async (values) => {
    console.log(values)
    try {
      let { data } = await LoginUser(values)
      const loggedInUser = await JWT.decode(data.token)
      const payload = { token: data.token, loggedInUser }
      localStorage.setItem('chatio-payload', JSON.stringify(payload))
      await dispatch({
        type: loginUser,
        payload,
      })
      setRedirect(true)
    } catch (err) {
      console.log(err)
    }
  }
  const validationSchema = Yup.object().shape({
    login: Yup.string().min(6, 'at least 6 characters').required('Required'),
    password: Yup.string().min(8, 'at least 8 characters').required('Required'),
  })

  return (
    <div className='bg-gray-100 h-screen w-screen flex'>
      {redirect && <Redirect to='/conversation' />}
      <div className='w-1/2'></div>
      <div className='w-1/2 flex  flex-wrap justify-center content-center bg-gray-900'>
        <div className='w-1/2'>
          <Formik
            initialValues={{
              login: '',
              password: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              setFieldValue,
              errors,
              touched,
            }) => (
              <>
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      value={values.login}
                      id='userName'
                      onChange={handleChange}
                      type='text'
                      placeholder='username or email'
                      className='w-full my-1 p-2 rounded-sm placeholder-gray-700'
                      name='login'
                    />
                  </div>
                  {errors.login && touched.login && (
                    <small className='text-red-500'>{errors.login}</small>
                  )}
                  <div>
                    <input
                      value={values.password}
                      id='password'
                      onChange={handleChange}
                      type='password'
                      placeholder='password'
                      className='w-full my-1 p-2 rounded-sm placeholder-gray-700'
                      name='password'
                    />
                  </div>
                  {errors.password && touched.password && (
                    <small className='text-red-500'>{errors.password}</small>
                  )}
                  <button
                    className='bg-white text-dark w-full my-2 px-2 py-1 rounded-sm font-bold text-lg hover:bg-gray-500 hover:text-white'
                    type='submit'
                  >
                    Login
                  </button>
                </form>
                <div className='text-white'>
                  <small>
                    <Link className='hover:text-gray-400' to='/register'>
                      Have no acount? Register Here
                    </Link>
                  </small>
                </div>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Login
