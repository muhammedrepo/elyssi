import Layout from '@/components/layout/Layout'
import { getError } from '@/utils/error'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Link from 'next/link'
import axios from 'axios'

export default function RegisterScreen() {
  const { data: session } = useSession()

  const router = useRouter()
  const { redirect } = router.query

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/')
    }
  }, [router, session, redirect])

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitHandler = async ({ firstName, lastName, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        firstName,
        lastName,
        email,
        password,
      })
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      if (result.error) {
        toast.error(result.error)
      }
    } catch (err) {
      toast.error(getError(err))
    }
  }
  return (
    <Layout title="Register">
      <div className="mx-auto py-16 sm:w-2/3 md:w-3/5 md:py-20 lg:w-1/2 lg:py-24 xl:w-2/5">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="rounded border border-grey-dark py-8 px-10 shadow">
          <label className="block pb-3 font-hk text-secondary" htmlFor="email">
            First Name
          </label>
          <input
            type="text"
            {...register('firstName', {
              required: 'Please enter first name',
              minLength: {
                value: 3,
                message: 'First name is more than 2 chars',
              },
            })}
            placeholder="Enter your first name"
            name="firstName"
            className="form-input mb-2"
            id="firstName"
          />
          {errors.firstName && (
            <div className="text-primary">{errors.firstName.message}</div>
          )}

          <label className="block pb-3 font-hk text-secondary" htmlFor="email">
            Last Name
          </label>
          <input
            type="text"
            {...register('lastName', {
              required: 'Please enter last name',
              minLength: {
                value: 3,
                message: 'Last name is more than 2 chars',
              },
            })}
            placeholder="Enter your last name"
            name="lastName"
            className="form-input mb-2"
            id="lastName"
          />
          {errors.firstName && (
            <div className="text-primary">{errors.lastName.message}</div>
          )}

          <label className="block pb-3 font-hk text-secondary" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter a valid email',
              },
            })}
            placeholder="Enter your email"
            name="email"
            className="form-input mb-2"
            id="email"
          />
          {errors.email && (
            <div className="text-primary">{errors.email.message}</div>
          )}

          <label
            className="block mt-4 pb-3 font-hk text-secondary"
            htmlFor="password">
            Password
          </label>
          <input
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: { value: 6, message: 'password is more than 5 chars' },
            })}
            placeholder="Enter your password"
            name="password"
            className="form-input mb-2"
            id="password"
          />
          {errors.password && (
            <div className="text-primary">{errors.password.message}</div>
          )}

          <label
            className="block mt-4 pb-3 font-hk text-secondary"
            htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Please enter confirm password',
              validate: (value) => value === getValues('password'),
              minLength: { value: 6, message: 'password is more than 5 chars' },
            })}
            placeholder="Enter your password"
            name="confirmPassword"
            className="form-input mb-2"
            id="confirmPassword"
          />
          {errors.confirmPassword && (
            <div className="text-primary">{errors.confirmPassword.message}</div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-primary">Password does not match</div>
            )}
          <button
            type="submit"
            className="primary-button mb-4 w-full"
            aria-label="Login button">
            Create Account
          </button>

          <Link
            href={`/login?redirect=${redirect || '/'}`}
            className="block pl-3 text-center font-hk text-secondary underline transition-colors hover:text-primary md:text-lg">
            Login instead
          </Link>
        </form>
      </div>
    </Layout>
  );
}
