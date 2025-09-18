'use client'
import FormField from '@/components/ui-parts/FormField'
import Button from '@/components/ui/Button'
import { useTranslations } from 'next-intl'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { routes } from '@/config/routes'

export default function LoginPage() {
  const t = useTranslations('Login')
  const schema = yup
    .object({
      email: yup
        .string()
        .email(t('errors.email_invalid'))
        .required(t('errors.email_required')),

      password: yup
        .string()
        .required(t('errors.password_required'))
        .min(8, t('errors.password_min'))
        .matches(/[A-Za-z]/, t('errors.password_matches')),
    })
    .required()
  type FormValues = yup.InferType<typeof schema>
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data: FormValues) => console.log(data)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t('title')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          {t('Or')} <br></br>
          <Link
            href={routes.register}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {t('create_account')}
          </Link>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FormField
              label={t('email_label')}
              id="email"
              {...register('email')}
              errorLog={errors.email?.message}
              autoComplete="email"
              placeholder={t('email_placeholder')}
              labelClass="block text-sm font-medium text-gray-700"
              inputClass="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              required
            />

            <FormField
              label={t('password_label')}
              id="password"
              {...register('password')}
              type="password"
              errorLog={errors.password?.message}
              autoComplete="current-password"
              placeholder={t('password_placeholder')}
              labelClass="block text-sm font-medium text-gray-700"
              inputClass="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              required
            />
            <Button
              type="submit"
              className="cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('button')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
