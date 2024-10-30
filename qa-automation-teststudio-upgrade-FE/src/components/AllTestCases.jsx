import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, TextField, IconButton, Typography, Box, TableSortLabel
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const AllTestCases = ({ selectedProjectId }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  // Fetch data based on selectedProjectId
  useEffect(() => {
    if (selectedProjectId) {
      axios.get('/api/testcases/all', { params: { projectId: selectedProjectId } })
        .then(response => {
          setData(response.data);
          setFilteredData(response.data);
        })
        .catch(error => console.error('Error fetching test cases:', error));
    }
  }, [selectedProjectId]);

  // Filter data based on search term
  useEffect(() => {
    const filtered = data.filter(item =>
      Object.values(item).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  // Sorting function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 4, backgroundColor: '#f8f9fa' }}>
      <Typography variant="h5" align="center" gutterBottom>
        ALL TEST CASES
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '30%' }}
        />
      </Box>

      <TableContainer component={Paper} style={{ border: '1px solid #ddd' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#1D0066', color: '#fff' }}>
              {[
                { id: 'TCID', label: 'TCID' },
                { id: 'Module', label: 'Module' },
                { id: 'Description', label: 'Description' },
                { id: 'insertedBy', label: 'Inserted By' },
                { id: 'updatedBy', label: 'Updated By' },
                { id: 'insertedDatetime', label: 'Inserted Date' },
                { id: 'lastUpdatedDatetime', label: 'Last Updated' },
                { id: 'testcaseType', label: 'Type' },
                { id: 'testcasePriority', label: 'Priority' },
              ].map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    backgroundColor: '#1D0066',
                  }}
                >
                  <TableSortLabel
                    active={sortConfig.key === column.id}
                    direction={sortConfig.key === column.id ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell
                align="center"
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  backgroundColor: '#1D0066',
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.tcid}>
                <TableCell align="center">{row.tcid}</TableCell>
                <TableCell align="center">{row.module}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.insertedBy}</TableCell>
                <TableCell align="center">{row.updatedBy}</TableCell>
                <TableCell align="center">{row.insertedDatetime}</TableCell>
                <TableCell align="center">{row.lastUpdatedDatetime}</TableCell>
                <TableCell align="center">{row.testcaseType}</TableCell>
                <TableCell align="center">{row.testcasePriority}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => alert(`Edit TCID: ${row.tcid}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => alert(`Delete TCID: ${row.tcid}`)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 20, 50]}
      />
    </Paper>
  );
};

export default AllTestCases;
