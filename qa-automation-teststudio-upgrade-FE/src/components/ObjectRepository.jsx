import React, { useState, useEffect } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, TextField, Button, Tabs, Tab, Select, MenuItem, InputLabel, FormControl, IconButton, Box, Typography
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const ObjectRepository = ({ selectedProjectId }) => {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]); // State to store filtered entries
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tabValue, setTabValue] = useState(1); // Default to Edit Page tab
  const [selectedPage, setSelectedPage] = useState("Show All");
  const [pageNames, setPageNames] = useState([]);
  const [newPageName, setNewPageName] = useState("");
  const [newElement, setNewElement] = useState({
    pageName: "Show All",
    elementName: "",
    locatorType: "xpath",
    locatorValue: ""
  });

  useEffect(() => {
    console.log("Selected Project ID:", selectedProjectId);
  }, [selectedProjectId]);

  useEffect(() => {
    if (selectedProjectId) {
      setLoading(true);

      // Fetch entries for the Edit Page table
      axios.get('/api/orpages', { params: { projectId: selectedProjectId } })
        .then(response => {
          setEntries(response.data);
          setFilteredEntries(response.data); // Initialize filtered entries with all entries
          console.log("Entries fetched successfully:", response.data);
        })
        .catch(error => console.error("Error fetching entries:", error))
        .finally(() => setLoading(false));

      // Fetch page names for the dropdown
      axios.get('/api/orpages/pages', { params: { projectId: selectedProjectId } })
        .then(response => {
          setPageNames(response.data);
          console.log("Page names fetched successfully:", response.data);
        })
        .catch(error => console.error("Error fetching page names:", error));
    } else {
      console.warn("No projectId provided for API calls.");
    }
  }, [selectedProjectId]);

  useEffect(() => {
    // Filter entries based on selectedPage and search filter
    const filtered = entries.filter(entry => {
      const matchesPage = selectedPage === "Show All" || entry.screenName === selectedPage;
      const matchesSearch = filter === "" || entry.elementName.toLowerCase().includes(filter.toLowerCase());
      return matchesPage && matchesSearch;
    });
    setFilteredEntries(filtered);
  }, [selectedPage, filter, entries]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddPage = () => {
    if (newPageName.trim() && selectedProjectId) {
      axios.post('/api/pages', { projectId: selectedProjectId, pageName: newPageName })
        .then(response => {
          console.log("New page added successfully:", response.data);
          setPageNames([...pageNames, { id: response.data.id, name: newPageName }]);
          setNewPageName("");
        })
        .catch(error => console.error("Error adding new page:", error));
    } else {
      console.warn("Project ID or page name is missing.");
    }
  };

  const handleAddElement = () => {
    if (newElement.elementName.trim() && selectedProjectId) {
      const elementData = {
        projectId: selectedProjectId,
        pageName: newElement.pageName,
        elementName: newElement.elementName,
        locatorType: newElement.locatorType,
        locatorValue: newElement.locatorValue,
      };

      axios.post('/api/elements', elementData)
        .then(response => {
          console.log("New element added successfully:", response.data);
          setEntries([...entries, response.data]);
          setNewElement({ pageName: "Show All", elementName: "", locatorType: "xpath", locatorValue: "" });
        })
        .catch(error => console.error("Error adding new element:", error));
    } else {
      console.warn("Element details or Project ID is missing.");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 4, backgroundColor: '#f8f9fa' }}>
      <Typography variant="h5" align="center" gutterBottom>
        OBJECT REPOSITORY
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Add Page" />
        <Tab label="Edit Page" />
      </Tabs>

      {tabValue === 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Add New Page to Current Project:
          </Typography>
          <TextField
            label="Page Name"
            variant="outlined"
            fullWidth
            value={newPageName}
            onChange={(e) => setNewPageName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPage}
            style={{ backgroundColor: '#1D0066', color: '#fff' }}
          >
            Add Page
          </Button>

          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Add New Element:
          </Typography>

          <Box display="flex" gap={2} flexWrap="wrap">
            <FormControl fullWidth variant="outlined">
              <InputLabel>Page Name</InputLabel>
              <Select
                value={newElement.pageName}
                onChange={(e) => setNewElement({ ...newElement, pageName: e.target.value })}
                label="Page Name"
              >
                {pageNames.map((pageName, index) => (
                  <MenuItem key={index} value={pageName}>
                    {pageName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Element Name"
              variant="outlined"
              fullWidth
              value={newElement.elementName}
              onChange={(e) => setNewElement({ ...newElement, elementName: e.target.value })}
            />

            <FormControl fullWidth variant="outlined">
              <InputLabel>Locator Type</InputLabel>
              <Select
                value={newElement.locatorType}
                onChange={(e) => setNewElement({ ...newElement, locatorType: e.target.value })}
                label="Locator Type"
              >
                <MenuItem value="xpath">xpath</MenuItem>
                <MenuItem value="css">css</MenuItem>
                <MenuItem value="id">id</MenuItem>
                <MenuItem value="name">name</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Locator Value"
              variant="outlined"
              fullWidth
              value={newElement.locatorValue}
              onChange={(e) => setNewElement({ ...newElement, locatorValue: e.target.value })}
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddElement}
            style={{ backgroundColor: '#1D0066', color: '#fff', marginTop: '1rem' }}
          >
            Add Element
          </Button>
        </Box>
      )}

      {tabValue === 1 && (
        <Box sx={{ mt: 4 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mt={2} mb={3}>
            <FormControl variant="outlined" style={{ width: '25%' }}>
              <InputLabel>Select Object Page</InputLabel>
              <Select
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
                label="Select Object Page"
              >
                <MenuItem value="Show All">Show All</MenuItem>
                {pageNames.map((pageName, index) => (
                  <MenuItem key={index} value={pageName}>
                    {pageName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Search"
              variant="outlined"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ width: '30%' }}
            />
          </Box>

          <TableContainer component={Paper} style={{ border: '1px solid #ddd' }}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: '#1D0066', color: '#fff' }}>
                  <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Page Name</TableCell>
                  <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Element Name</TableCell>
                  <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Locator Type</TableCell>
                  <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Locator Value</TableCell>
                  <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEntries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.screenName}</TableCell>
                    <TableCell>{entry.elementName}</TableCell>
                    <TableCell>{entry.locatorType}</TableCell>
                    <TableCell>{entry.locatorValue}</TableCell>
                    <TableCell>
                      <IconButton color="primary" size="small"><Edit /></IconButton>
                      <IconButton color="secondary" size="small"><Delete /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={filteredEntries.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
    </Paper>
  );
};

export default ObjectRepository;
