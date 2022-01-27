import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import { ComponentInput } from '../common/form/TextField'
// import { TextAreaField } from '../common/form/TextAreaField'
import { handleChange, handleKeyDown } from '../../static/funcsForForm'
import { InputFile } from '../common/form/InputFile'
import { Button } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import { makeStyles } from '@material-ui/core/styles'
import { createArticle, updateArticle } from '../../store/articles'
import { useDispatch } from 'react-redux'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > :not(style)': { m: 'auto', width: '100%' },
    display: 'flex',
    flexDirection: 'column'
  },
  divActions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px'
  },
  errArticle: {
    color: '#eb4242',
    textAlign: 'center'
  },
  errText: {
    color: '#eb4242'
  }
}))

export const AddArticleForm = ({ article, onCloseModal, handleSnackbar }) => {
  const [data, setData] = useState({
    title: article ? article[0].title : '',
    img: article ? article[0].img : '',
    // article: article ? article[0].article : '',
    id: article ? article[0].id : Date.now()
  })
  const [convertedText, setConvertedText] = useState(article ? article[0].article : '') // ReactQuill text editor
  const classes = useStyles()
  const [dataUri, setDataUri] = useState(article?.img || '')
  const [errors, setErrors] = useState({})
  const [uploadName, setUploadName] = useState('') // For display file name
  const dispatch = useDispatch()
  const checkEdit = article

  useEffect(() => {
    setErrors(prevState => ({ ...prevState, article: null }))
    validate()
  }, [convertedText])

  const handleUserKeyPress = event => {
    const { keyCode } = event
    if (keyCode === 27) onCloseModal()
  }

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress)

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress)
    }
  })

  const validateScheme = yup.object().shape({
    // article: yup.string().required('Содержание статьи - обязательно'),
    title: yup.string().required('Необходимо указать название статьи')
  })

  const validate = () => {
    validateScheme.validate(data).then(() => setErrors({})).catch(err => setErrors({ [err.path]: err.message }))
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  useEffect(() => {
    validate()
  }, [data])

  // block for prepare imgs for DB: ////////////////////////////////
  function fileUploadInputChange (e) {
    setUploadName(e.target.value.split('\\')[2]) // display file name
    const reader = new FileReader()
    reader.onload = (e) => {
      setDataUri(e.target.result)
    }
    reader.readAsDataURL(e.target.files[0])
  }
  // ////////////////////////////////////////////////////////////////

  const handleSubmit = (e) => {
    e.preventDefault()
    if (dataUri) data.img = dataUri // not match with pattern-> const [data, setData] = useState({...}) + handleChange()
    data.date = new Date().toLocaleString() // see up
    data.article = convertedText
    if (convertedText.length <= 11) return setErrors({ article: 'Наполните содержимое статьи!' })
    if (checkEdit === null) {
      dispatch(createArticle(data, handleSnackbar))
    } else {
      dispatch(updateArticle(data, handleSnackbar))
    }
  }

  return (
    <form
      component='form'
      className={ classes.root }
      noValidate
      autoComplete='off'
      onSubmit={(e) => handleSubmit(e)}
    >
      <ComponentInput
        label='Название статьи:'
        name='title'
        value={data.title}
        onChange={(target) => handleChange(setData, target)}
        error={errors.title}
        autoFocus
        placeholder='Новая...'
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <ReactQuill
        theme='snow'
        value={convertedText}
        onChange={setConvertedText}
        style={{ minHeight: '250px', maxHeight: '400px', overflow: 'auto', marginBottom: '10px' }}
      />
      {errors.article && <p className={classes.errArticle}>{errors.article}</p>}
      <InputFile
        article={article}
        fileUploadInputChange={fileUploadInputChange}
        uploadName={uploadName}
        dataUri={dataUri}
      />
      <div className={classes.divActions}>
        <Button
          type='submit'
          disabled={!isValid}
          variant='contained'
          endIcon={<SaveIcon />}
        >
          Сохранить
        </Button>
        <Button variant='outlined' type='button' onClick={onCloseModal}>Отмена</Button>
      </div>
    </form>
  )
}