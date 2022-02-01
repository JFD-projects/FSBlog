import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import { ComponentInput } from '../common/form/TextField'
import { CheckBoxField } from '../common/form/CheckBoxField'
import { FormTemplate } from '../common/form/FormTemplate'
import { handleChange, handleKeyDown } from '../../static/funcsForForm'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthError, logIn } from '../../store/users'
import { useHistory } from 'react-router'
// import Loader from '../common/Loader/Loader'

export const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const loginError = useSelector(getAuthError())
  const [data, setData] = useState({
    email: '', password: ''
  })

  const [errors, setErrors] = useState({})
  const [enterErrors, setEnterErrors] = useState(null)
  // const [isLoading, setLoading] = useState(false)

  const validateScheme = yup.object().shape({
    password: yup.string().required('Пароль обязателен для заполнения'),
    email: yup.string().required('Email обязательно для заполнения').email('Email введён некорректно')
  })

  const validate = () => {
    validateScheme.validate(data).then(() => setErrors({})).catch(err => setErrors({ [err.path]: err.message }))
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  useEffect(() => {
    setEnterErrors(null)
    validate()
  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const redirect = history.location.state ? history.location.state.from.pathname : '/'
    dispatch(logIn({ payload: data, redirect }))
  }

  return (
    <>
      <FormTemplate handleSubmit={handleSubmit} isValid={isValid} enterErrors={enterErrors}>
        <ComponentInput
          label="Электронная почта"
          name="email"
          value={data.email}
          onChange={(target) => handleChange(setData, target)}
          error={errors.email}
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
        <CheckBoxField
          value={data.stayOn}
          onChange={(target) => handleChange(setData, target, setEnterErrors)}
          name='stayOn'
          onKeyDown={(e) => handleKeyDown(e)}
        >
          Оставаться в системе
        </CheckBoxField>
        {loginError && <p className="text-danger">{loginError}</p>}
      </FormTemplate>

    </>)
}