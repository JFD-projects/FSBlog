import React from 'react'
import { SubTitle } from './common/typografy/SubTitle'
import emailPNG from '../assets/imgs/email.png'
import telegramPNG from '../assets/imgs/telegram.png'
// Material UI:
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const useStyles = makeStyles((theme) => ({
  currentArticleBody: {
    [theme.breakpoints.down('sm')]: {
      padding: '15px',
      whiteSpace: 'pre-wrap'
    },
    boxShadow: '2px 3px 25px rgb(49, 49, 77)',
    color: '#fff',
    textIndent: '1.5em',
    marginBottom: '20px'
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 1s',
    '& a img': {
      maxWidth: '48px',
      maxHeight: '48px'
    },
    '& a img:hover': {
      transform: 'translateX(5px)',
      transition: 'transform 1s'
    }
  }
}))

export const RootInfoComponent = () => {
  const classes = useStyles()
  return (
    <>
      <SubTitle>Админский доступ:</SubTitle>
      <div className={classes.currentArticleBody}>
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>adminblog@test.ru</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.info}>Для получения Root-доступа:
                <a href='mailto:zalilov@list.ru' target="blank">
                  <img src={emailPNG} alt="" />
                </a>
                или
                <a href='https://t.me/Nix102' target="blank">
                  <img src={telegramPNG} alt="" />
                </a>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  )
}