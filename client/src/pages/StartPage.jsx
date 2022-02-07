import React from 'react'
// import { SubTitle } from '../components/common/typografy/SubTitle'
import { getStartInfo } from '../store/startInfo'
import { useSelector } from 'react-redux'
// Material UI:
import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center'
  },
  blog: {
    margin: 'auto',
    maxWidth: '650px',
    backgroundColor: '#f2f5fd',
    padding: '25px',
    marginBottom: theme.spacing(4),
    border: '1px solid #fff',
    borderRadius: '2px',
    boxShadow: '7px 9px 11px rgb(8, 8, 8)'
  },
  imgBlock: {
    maxWidth: '550px',
    margin: '0 auto',
    maxHeight: '300px',
    overflow: 'hidden',
    p: 2
  },
  img: {
    maxWidth: '100%'
  },
  text: {
    maxWidth: '550px',
    margin: 'auto'
  }
}))

export const StartPage = () => {
  const startInfo = useSelector(getStartInfo())
  const classes = useStyles()
  return (
    <div>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="h5" gutterBottom component="div">
          О Frontend&apos;е...
        </Typography>
      </Box>
      {/* <SubTitle>О Frontend&apos;е...</SubTitle> */}
      {startInfo?.map(blog => (
        <div key={blog.img} className={classes.blog}>
          <div className={classes.imgBlock}>
            <img className={classes.img} src={blog.img} alt=""/>
          </div>
          <Typography variant="h6" gutterBottom component="div" className={classes.title}>
            {blog.text.split(' ')[0]}
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div" className={classes.text}>
            {blog.text}
          </Typography>
        </div>
      ))}
    </div>
  )
}