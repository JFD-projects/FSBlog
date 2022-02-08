import React from 'react'
import { useHistory } from 'react-router'
import { SubTitle } from '../components/common/typografy/SubTitle'
import { useDispatch } from 'react-redux'
import { goArticlesListPage } from '../store/articles'
import { Comments } from '../components/Comments'
import { Markup } from 'interweave'
// Material UI:
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button, Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '970px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  currentArticleBody: {
    [theme.breakpoints.down('sm')]: {
      padding: '15px',
      whiteSpace: 'pre-wrap'
    },
    padding: '25px',
    backgroundColor: '#d2d2d5;',
    borderRadius: '3px',
    color: '#000',
    textIndent: '1.5em'
  },
  imgBlock: {
    [theme.breakpoints.down('sm')]: {
      float: 'none',
      margin: '0px',
      marginBottom: '10px'
    },
    maxWidth: '300px',
    maxHeight: '150px',
    overflow: 'hidden',
    float: 'left',
    marginTop: '4px',
    marginRight: theme.spacing(2),
    marginLeft: '-20px'
  },
  img: {
    maxWidth: '100%'
  },
  btnBack: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)
  }
}))

export const ArticlePage = ({ blog }) => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const backToArticles = () => {
    dispatch(goArticlesListPage())
    history.push('/articles')
  }
  return (
    <div className={classes.root}>
      <SubTitle>{blog.title}</SubTitle>
      <div className={classes.currentArticleBody}>
        <div className={classes.imgBlock}>
          <img src={blog.img} alt="" className={classes.img} />
        </div>
        <Typography variant="body1" gutterBottom>
          <Markup content={blog.article} />
        </Typography>
      </div>
      <Comments blogID={blog._id}/>
      <Box sx={{ textAlign: 'center' }}>
        <Button variant="outlined" color="inherit" className={classes.btnBack} onClick={backToArticles}>
          Назад
        </Button>
      </Box>
    </div>
  )
}