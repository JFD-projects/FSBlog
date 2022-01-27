import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  customFileUpload: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(4),
    border: '1px solid #ccc',
    padding: '10px 12px'
  },
  imgBlock: {
    maxWidth: '300px',
    maxHeight: '150px',
    overflow: 'hidden',
    marginBottom: theme.spacing(1)
  },
  img: {
    maxWidth: '100%'
  },
  file: {
    opacity: '0',
    width: '0.1px',
    height: '0.1px',
    position: 'absolute'
  },
  fileInput: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fileInputLabel: {
    position: 'relative',
    width: '190px',
    height: '50px',
    borderRadius: '10px',
    background: '#ccc',
    border: '1px solid rgb(63, 62, 62)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    fontSize: '15px',
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'transform .2s ease-out',
    marginRight: '10px',
    '&:hover': {
      transition: 'all .2s ease-out',
      boxShadow: '0 4px 7px rgba(0, 0, 0, 0.4)'
    }
  }
}))

export const InputFile = ({ article, fileUploadInputChange, uploadName, dataUri }) => {
  const classes = useStyles()
  return (
    <div className={classes.customFileUpload}>
      {article?.img && !dataUri ? (
        <div className={classes.imgBlock}>
          <img src={article.img} alt="" className={classes.img}/>
        </div>
      ) : (
        <div className={classes.imgBlock}>
          <img src={dataUri} alt="" className={classes.img}/>
        </div>
      )
      }
      <div className={classes.fileInput}>
        <input
          type="file"
          id="file"
          className={classes.file}
          onChange={(e) => fileUploadInputChange(e)}
        />
        <label htmlFor="file" className={classes.fileInputLabel}>Select file</label>
        <p>{uploadName}</p>
      </div>
    </div>
  )
}