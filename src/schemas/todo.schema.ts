import * as yup from 'yup'

export const todoSchema = (t: (key: string) => string) =>
  yup
    .object({
      task: yup
        .string()
        .required(t('errors.required'))
        .trim()
        .min(1, t('errors.required')),
    })
    .required()

export type TodoFormValues = yup.InferType<ReturnType<typeof todoSchema>>
