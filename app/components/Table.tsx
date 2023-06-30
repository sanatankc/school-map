import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable(props) {

  const tableHead = [
    ...new Set(
      Object.values(props.data)
      .map((row) => Object.keys(row))
      .flat()
    )
  ].filter((head) => head !== 'style')

  const rows = Object.values(props.data).map((row, i) => {
    return [
      Object.keys(props.data)[i],
      ...tableHead.map((head) => row[head])
    ]
  })

  return (
    <TableContainer component={Paper} className='text-xs min-h-max flex-shrink-0'>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>School</TableCell>
            {tableHead.map((h) => (
              <TableCell>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, j) => (
            <TableRow
              key={row[0]}
              title={row[0]}
              style={Object.values(props.data)[j].style}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {row.map((cell, i) => (i === 0 
                ? (
                  <TableCell key={i} component="th" scope="row" className='truncate' style={{ 
                    maxWidth: 150,
                  }}>
                   #{j + 1} {cell}
                  </TableCell>
                ) 
                : (
                  <TableCell key={i} align="right">{cell}</TableCell>
                )
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}