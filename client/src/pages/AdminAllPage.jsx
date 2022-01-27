import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TableHeader } from '../components/common/table/TableHeader'
import { TblBody } from '../components/common/table/TableBody'
import { SearchArticleComponent } from '../components/SearchArticleComponent'
import { delArticle, editArticle, setOpenModal } from '../store/articles'
import { columns } from '../static/sortData'
import { ModalEdit } from '../components/ModalEdit'
// Material UI:
import Snackbar from '@mui/material/Snackbar'
import CreateIcon from '@mui/icons-material/Create'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TableContainer, Paper, Table, Box } from '@mui/material'
import { useArticles } from '../hooks/useArticles'
import Pagination from '@mui/material/Pagination'

const useStyles = makeStyles((theme) => ({
  rootAdmin: {
    width: 'inherit',
    marginBottom: theme.spacing(4)
  },
  blockActions: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px auto 10px',
    width: '100%'
  },
  table: {
    width: '100%'
  }
}))

export const AdminAllPage = () => {
  const { articles, articlesPaginate, sortBy, handleSort, count, handleChange, page } = useArticles()
  const classes = useStyles()
  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'left'
  })

  const dispatch = useDispatch()

  const handleSnackbar = () => {
    setSnackbar({ ...snackbar, open: !open })
  }
  const { vertical, horizontal, open } = snackbar

  return (
    <div className={classes.rootAdmin}>
      <div className={classes.blockActions} component="div">
        <Button variant="contained" endIcon={<CreateIcon />} onClick={() => dispatch(setOpenModal())}>
          Создать статью
        </Button>
        <SearchArticleComponent
          articles={articles}
        />
      </div>
      <ModalEdit handleSnackbar={handleSnackbar}/>
      <TableContainer component={Paper} sx={{ marginBottom: '15px' }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHeader
            onSort={handleSort}
            selectedSort={sortBy}
            columns={columns}
          />
          <TblBody
            columns={columns}
            data={articlesPaginate}
            onDelete={(id) => dispatch(delArticle(id, handleSnackbar))}
            onEdit={(id) => dispatch(editArticle(id))}
          />
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center' }} >
        <Pagination count={count} page={page} onChange={handleChange} />
      </Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleSnackbar}
        key={vertical + horizontal}
        autoHideDuration={2500}
        message={'Готово!'}
      />
    </div>)
}