import * as yup from 'yup'

export const todoSchema = (t: (key: string) => string) =>
  yup
    .object({
      title: yup.string().required(t('errors.required')).trim(),
      content: yup.string().required(t('errors.content_required')).trim(),
      deadline: yup.string().notRequired().nullable(),
      is_finished: yup.boolean().notRequired(),
    })
    .required()

export type TodoFormValues = yup.InferType<ReturnType<typeof todoSchema>>

export const searchSchema = (t: (key: string) => string) =>
  yup
    .object({
      title: yup.string().required().trim(),
    })
    .required()

export type SearchFormValues = yup.InferType<ReturnType<typeof searchSchema>>
