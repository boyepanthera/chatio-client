import React, { useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import * as Yup from 'yup'
import JWT from 'jsonwebtoken'
import { Formik } from 'formik'
import { RegisterUser } from '../services/Auth.service'
import { Context } from '../Store'
import { loginUser } from '../Store/actionTypes'

const Register = () => {
  const [redirect, setRedirect] = useState(false)
  const { dispatch } = useContext(Context)
  const handleSubmit = async (values) => {
    // console.log(values)
    try {
      let { data } = await RegisterUser(values)
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
    userName: Yup.string().min(5, 'at least 5 characters').required('Required'),
    password: Yup.string().min(8, 'at least 8 characters').required('Required'),
    confirmPassword: Yup.string().test(
      'password',
      'Passwords must match',
      function (value) {
        return this.parent.password === value
      }
    ),
  })

  return (
    <div className='bg-gray-100 h-screen w-screen flex'>
      {redirect && <Redirect to='/conversation' />}
      <div className='w-1/2'></div>
      <div className='w-1/2 flex  flex-wrap justify-center content-center bg-gray-900'>
        <div className='w-1/2'>
          <Formik
            initialValues={{
              userName: '',
              password: '',
              confirmPassword: '',
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
                      id='login'
                      onChange={handleChange}
                      type='text'
                      placeholder='username'
                      className='w-full my-1 p-2 rounded-sm placeholder-gray-700'
                      name='userName'
                    />
                  </div>
                  {errors.userName && touched.userName && (
                    <small className='text-red-500'>{errors.userName}</small>
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
                  <div>
                    <input
                      value={values.confirmPassword}
                      id='confirmPassword'
                      onChange={handleChange}
                      type='password'
                      placeholder='confirm password'
                      className='w-full my-1 p-2  rounded-sm placeholder-gray-700'
                      name='confirmPassword'
                    />
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <small className='text-red-500'>
                      {errors.confirmPassword}
                    </small>
                  )}
                  <button
                    className='bg-white focus:outline-none text-dark w-full my-2 px-2 py-1 rounded-sm font-bold  hover:bg-gray-500 hover:text-white'
                    type='submit'
                  >
                    Register
                  </button>
                </form>
                <div className='text-white'>
                  <small>
                    <Link className='hover:text-gray-400' to='/'>
                      Already have an account? Login Instead
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

export default Register
