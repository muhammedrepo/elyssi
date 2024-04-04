import Layout from '@/components/layout/Layout'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getError } from '@/utils/error'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function LoginScreen() {
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
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitHandler = async ({ email, password }) => {
    try {
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
    <Layout title="Login">
      <div className="mx-auto py-16 sm:w-2/3 md:w-3/5 md:py-20 lg:w-1/2 lg:py-24 xl:w-2/5">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="rounded border border-grey-dark py-8 px-10 shadow">
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
          <Link
            href="/reset-password"
            className="block pb-4 mt-4 font-hk text-primary transition-colors hover:text-primary-light md:text-lg">
            Forgot your password?
          </Link>

          <button
            type="submit"
            className="primary-button mb-4 w-full"
            aria-label="Login button">
            Login
          </button>

          <Link
            href={`/register?redirect=${redirect || '/'}`}
            className="block pl-3 text-center font-hk text-secondary underline transition-colors hover:text-primary md:text-lg">
            Create your account
          </Link>
        </form>
      </div>
    </Layout>
  );
}
