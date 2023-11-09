import React from 'react'
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  TableHead,
  Chip,
  Box,
  AvatarGroup,
} from '@mui/material';
import { Stack } from '@mui/system';
import BlankCard from '../ui/shared/BlankCard';

const basics: any[] = [
  {
    imgsrc: '',
    title: 'название 1',
  },
  {
    imgsrc: '',
    title: 'название 2',
  },
  {
    imgsrc: '',
    title: 'название 3',
  },
];

const ProductTableEditConcurentsTable = () => {
  return (
    <BlankCard>
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Фото</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Название</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">...</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basics?.map((basic) => (
              <TableRow key={basic.id}>
                <TableCell>
                  <Avatar src={basic.imgsrc} alt={basic.imgsrc} sx={{ width: "40px !important", height: "40px !important" }} />
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6" fontWeight={400}>
                    {basic.pname}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">ссылка</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BlankCard>
  )
}

export default ProductTableEditConcurentsTable