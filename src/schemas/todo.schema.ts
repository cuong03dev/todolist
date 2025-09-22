import * as yup from 'yup'

export const todoSchema = (t: (key: string) => string) =>
  yup
    .object({
      title: yup.string().required(t('errors.required')).trim(),
      content: yup.string().notRequired().nullable(),
      deadline: yup.string().notRequired().nullable(),
      is_finished: yup.boolean().notRequired(),
    })
    .required()

export type TodoFormValues = yup.InferType<ReturnType<typeof todoSchema>>
