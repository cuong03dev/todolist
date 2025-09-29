import * as yup from 'yup'

export const todoSchema = (t: (key: string) => string) =>
  yup
    .object({
      title: yup.string().required(t('errors.required')).trim(),
      content: yup.string().required(t('errors.content_required')).trim(),
      deadline: yup.string().default(null).nullable(),
      is_finished: yup.boolean().default(false),
    })
    .required()

export type TodoFormValues = {
  title: string
  content: string
  deadline: string | null
  is_finished: boolean
  id?: string
}

export const searchSchema = (t: (key: string) => string) =>
  yup
    .object({
      title: yup.string().default(''),
    })
    .required()

export type SearchFormValues = {
  title: string
}
