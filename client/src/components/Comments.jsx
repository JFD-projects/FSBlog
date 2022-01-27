import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { getComments, delComment } from '../store/comments'
import { prepareComments } from '../static/prepareComments'
import { AddCommentForm } from '../components/ui/AddCommentForm'
import { useAuth } from '../hooks/useAuth'
import { NavLink } from 'react-router-dom'
// Materisl UI:
import Divider from '@mui/material/Divider'
import { IconButton, Tooltip } from '@mui/material/'
import DeleteIcon from '@mui/icons-material/Delete'

const useStyles = makeStyles((theme) => ({
  blockComments: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
    padding: '10px',
    '& li': {
      listStyleType: 'none',
      marginTop: theme.spacing(2),
      textAlign: 'left',
      padding: '5px'
    }
  },
  liBlock: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dateComments: {
    fontSize: '12px',
    color: 'grey'
  },
  emailComments: {
    fontSize: '16px'
  },
  textComments: {
    marginTop: theme.spacing(1),
    fontStyle: 'italic'
  },
  loginInvite: {
    marginTop: theme.spacing(3)
  }
}))

export const Comments = ({ blogID }) => {
  const comments = useSelector(getComments())
  const currentComments = prepareComments(comments, blogID)
  const { currentUser } = useAuth()
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <div className={classes.blockComments}>
      {currentComments?.length > 0 ? <>
        <p>Комментарии:</p>
        <ul>
          {currentComments.map(c => ((
            <div key={c.id}>
              <div className={classes.liBlock}>
                <li>
                  <p>
                    <span className={classes.dateComments}>{c.date} </span>
                    <span className={classes.emailComments}>{c.email}, пишет: </span>
                  </p>
                  <p className={classes.textComments}>{c.commentText}</p>
                </li>
                {currentUser === 'adminblog@test.ru' &&
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteIcon onClick={() => dispatch(delComment(c.id))}/>
                  </IconButton>
                </Tooltip>
                }
              </div>
              <Divider />
            </div>
          )))}
        </ul>
      </> : <p>На данный момент комментариев нет</p>
      }
      {currentUser ? <AddCommentForm/> : <div className={classes.loginInvite}>
        Чтобы оставить комментарий необходим <NavLink to='/auth/login'>Логин</NavLink>
      </div>
      }
    </div>
  )
}