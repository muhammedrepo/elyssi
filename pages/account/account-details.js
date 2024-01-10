import { signIn, useSession } from 'next-auth/react'
import AccountScreen from '.'
import Image from "next/image"
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { getError } from '@/utils/error'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function AccountDetailsScreen() {
  const { data: session } = useSession()

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue('firstName', session?.user?.firstName || '')
    setValue('lastName', session?.user?.lastName || '')
    setValue('email', session?.user?.email || '')
    setValue('password', session?.user?.password || '')
    setValue('confirmPassword', session?.user?.confirmPassword || '')
  }, [session?.user, setValue])

  const submitHandler = async ({ firstName, lastName, email, password }) => {
    try {
      await axios.put('/api/auth/update', {
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
      toast.success('Profile updated successfully')
      if (result.error) {
        toast.error(result.error)
      }
    } catch (err) {
      toast.error(getError(err))
    }
  }

  return (
    <AccountScreen>
      <div className="bg-grey-light py-10 px-6 sm:px-10">
        <h1 className="font-hkbold mb-12 text-2xl text-secondary sm:text-left">
          Account Details
        </h1>
        <div className="mb-12">
          <Image
            src="/images/blog-author.jpg"
            alt="user image"
            className="h-40 w-40 overflow-hidden rounded-full object-cover"
            width={160}
            height={160}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </div>

        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block font-hk text-secondary">
                First Name
              </label>
              <input
                type="text"
                className="form-input"
                id="firstName"
                autoFocus
                {...register('firstName', {
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'First name must be at least 2 characters',
                  },
                  maxLength: {
                    value: 20,
                    message: 'First name must be at most 20 characters',
                  },
                })}
              />
              {errors.firstName && (
                <div className="text-red-500">{errors.firstName.message}</div>
              )}
            </div>
            <div className="">
              <label
                htmlFor="lastName"
                className="mb-2 block font-hk text-secondary">
                Last Name
              </label>
              <input
                type="text"
                className="form-input"
                id="lastName"
                autoFocus
                {...register('lastName', {
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Last name must be at least 2 characters',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Last name must be at most 20 characters',
                  },
                })}
              />
              {errors.lastName && (
                <div className="text-red-500">{errors.lastName.message}</div>
              )}
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-5 md:mt-8 md:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-hk text-secondary">
                Email Address
              </label>
              <input
                type="email"
                className="form-input"
                id="email"
                autoFocus
                {...register('email', {
                  required: 'Please enter email',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: 'Please enter valid email',
                  },
                })}
              />
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-hk text-secondary">
                New Password
              </label>
              <input
                type="password"
                className="form-input"
                id="password"
                autoFocus
                {...register('password', {
                  required: 'Please enter password',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )}
            </div>
            <div className="mt-5 w-full sm:w-1/2 md:pr-5">
              <label
                htmlFor="confirmPassword"
                className="mb-2 block font-hk text-secondary">
                Confirm New Password
              </label>
              <input
                type="password"
                className="form-input"
                id="confirmPassword"
                autoFocus
                {...register('confirmPassword', {
                  required: 'Please enter confirm password',
                  validate: (value) =>
                    value === getValues('password') ||
                    'The passwords do not match',
                  minLength: {
                    value: 6,
                    message: 'confirm password must be at least 6 characters',
                  },
                })}
              />
              {errors.confirmPassword && (
                <div className="text-red-500">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <button className="primary-button" aria-label="Save button">
              Save
            </button>
          </div>
        </form>
      </div>
    </AccountScreen>
  );
}
