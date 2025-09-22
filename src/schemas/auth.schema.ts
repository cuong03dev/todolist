import * as yup from 'yup'

export const registerSchema = (t: (key: string) => string) =>
  yup
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
      confirm_password: yup
        .string()
        .oneOf([yup.ref('password')], t('errors.password_mismatch'))
        .required(t('errors.password_required'))
        .min(8, t('errors.password_min'))
        .matches(/[A-Za-z]/, t('errors.password_matches')),
    })
    .required()

export const loginSchema = (t: (key: string) => string) =>
  yup
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

export type RegisterFormValues = yup.InferType<
  ReturnType<typeof registerSchema>
>
export type LoginFormValues = yup.InferType<ReturnType<typeof loginSchema>>
