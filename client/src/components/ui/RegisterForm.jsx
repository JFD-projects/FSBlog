import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import { ComponentInput } from '../common/form/TextField'
import { FormTemplate } from '../common/form/FormTemplate'
import { handleChange, handleKeyDown } from '../../static/funcsForForm'
import { useAuth } from '../../hooks/useAuth'
import Loader from '../common/Loader/Loader'

export const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmpassword: ''
  })
  const { signUp } = useAuth()
  const [errors, setErrors] = useState({})
  const [enterErrors, setEnterErrors] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const validateScheme = yup.object().shape({
    password: yup.string()
      .required('Пароль обязателен для заполнения')
      .matches(/(?=.*[A-Z])/, 'Пароль должен содержать хотябы 1 заглавную букву')
      .matches(/(?=.*[0-9])/, 'Пароль должен содержать хотябы 1 число')
      .matches(/(?=.{8,})/, 'Пароль должен состоять минимум из 8 символов'),
    email: yup.string().required('Email обязательно для заполнения').email('Email введён некорректно')
  })
  const validateConfirmPass = yup.object().shape({
    confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают')
  })

  const validate = () => {
    validateScheme.validate(data).then(() => setErrors({})).catch(err => setErrors({ [err.path]: err.message }))
    validateConfirmPass.validate(data).then(() => setErrors({})).catch(err => setErrors({ [err.path]: err.message }))
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  useEffect(() => {
    setEnterErrors(null)
    validate()
  }, [data])

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    try {
      setLoading(false)
      await signUp(data)
    } catch (error) {
      setLoading(false)
      setErrors({})
      setEnterErrors(error.message)
    }
  }

  return (
    <>
      {!isLoading ? (
        <FormTemplate handleSubmit={handleSubmit} isValid={isValid} enterErrors={enterErrors}>
          <ComponentInput
            label="Электронная почта"
            name="email"
            value={data.email}
            onChange={(target) => handleChange(setData, target)}
            error={errors.email}
            className="input-auth-form"
            autoFocus
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <ComponentInput
            label="Пароль"
            type="password"
            name="password"
            value={data.password}
            onChange={(target) => handleChange(setData, target, setEnterErrors)}
            error={errors.password}
            className="input-auth-form"
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <ComponentInput
            label="Повторить пароль"
            type="password"
            name="confirmpassword"
            value={data.confirmpassword}
            onChange={(target) => handleChange(setData, target, setEnterErrors)}
            error={errors.confirmpassword}
            className="input-auth-form"
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </FormTemplate>
      ) : (
        <div className="loader-container"><Loader /></div>
      )}
    </>
  )
}