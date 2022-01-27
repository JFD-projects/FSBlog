import React from 'react'
import { TableBody, TableRow, TableCell, IconButton, Tooltip } from '@mui/material/'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const useStyles = makeStyles((theme) => ({
  tdStyle: {
    cursor: 'pointer',
    transform: 'scaleX(1)',
    '&:hover': {
      transition: 'all .4s ease-in-out',
      transform: 'scaleX(1.05)'
    }
  }
}))
export const TblBody = ({ data, columns, onDelete, onEdit }) => {
  const classes = useStyles()
  return (
    <TableBody>
      {data.map(item => <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        {Object.keys(columns).map((column, i) => (
          column === 'edit' ? (
            <TableCell
              className={classes.tdStyle}
              onClick={() => onEdit(item.id)}
              key={i}
            >
              <Tooltip title="Edit">
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          ) : column === 'delete' ? (
            <TableCell
              onClick={() => onDelete(item.id)}
              key={i}
            >
              <Tooltip title="Delete">
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          ) : (
            <TableCell key={i}>
              {item[column]}
            </TableCell>
          )
        ))}
      </TableRow>)}
    </TableBody>
  )
}