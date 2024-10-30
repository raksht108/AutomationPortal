import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios';
import logo from '../assets/TN_prod_white.png';

const NavigationBar = ({ onProjectSelect, selectedProjectId }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // Separate anchor states for each dropdown menu
  const [anchorElCreate, setAnchorElCreate] = useState(null);
  const [anchorElTestCase, setAnchorElTestCase] = useState(null);
  const [anchorElExecutions, setAnchorElExecutions] = useState(null);
  const [anchorElManage, setAnchorElManage] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [anchorElProject, setAnchorElProject] = useState(null);

  // Fetch projects and set the default selected project
    useEffect(() => {
      axios.get('/api/projects/active')
        .then(response => {
          const projectList = response.data ?? [];
          setProjects(projectList);
          if (projectList.length > 0) {
            const defaultProjectName = projectList[0];
            setProjectIdByName(defaultProjectName); // Set default project name and ID
          }
        })
        .catch(error => console.error("Error fetching projects", error));
    }, []);

    // Function to fetch and set the project ID based on the project name
    const setProjectIdByName = (projectName) => {
      axios.get(`/api/projects/id`, {
        params: { projectName }
      })
        .then(response => {
          const projectId = response.data[0]; // Assuming API returns an array of IDs
          setSelectedProject({ name: projectName, id: projectId });
          onProjectSelect(projectId); // Pass the project ID to the parent component
        })
        .catch(error => console.error("Error fetching project ID by name", error));
    };

// Handle project change when user selects a new project from the dropdown
  const handleProjectChange = (projectName) => {
    setProjectIdByName(projectName); // Fetch and set the project ID for the selected project
    setAnchorElProject(null); // Close the project dropdown menu
  };

  // Functions to open each specific dropdown menu
  const handleCreateMenuOpen = (event) => setAnchorElCreate(event.currentTarget);
  const handleTestCaseMenuOpen = (event) => setAnchorElTestCase(event.currentTarget);
  const handleExecutionsMenuOpen = (event) => setAnchorElExecutions(event.currentTarget);
  const handleManageMenuOpen = (event) => setAnchorElManage(event.currentTarget);
  const handleProfileMenuOpen = (event) => setAnchorElProfile(event.currentTarget);
  const handleProjectMenuOpen = (event) => setAnchorElProject(event.currentTarget);

  // General function to handle menu closing
  const handleMenuClose = (setAnchor) => setAnchor(null);

  const getButtonStyle = (menuName) => {
    return { backgroundColor: menuName === selectedProject ? '#cccccc' : 'inherit', color: '#000' };
  };

  return (
    <>
      <AppBar position="sticky" style={{ backgroundColor: '#1D0066', zIndex: 1300 }}>
        <Toolbar>
          <img
            src={logo}
            alt="Company Logo"
            style={{ width: '175px', marginRight: '20px', cursor: 'pointer' }}
            onClick={() => {
              navigate('/');
            }}
          />
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Test Automation Portal
          </Typography>

          {/* Dashboard Button */}
          <Button color="inherit" onClick={() => navigate('/')}>Dashboard</Button>

          {/* Create Button with Dropdown */}
          <Button
            color="inherit"
            onClick={(event) => handleCreateMenuOpen(event, setAnchorElCreate)}
          >
            Create
          </Button>
          <Menu
            anchorEl={anchorElCreate}
            open={Boolean(anchorElCreate)}
            onClose={() => handleMenuClose(setAnchorElCreate)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <MenuItem onClick={() => handleMenuClose(setAnchorElCreate)}>
              <Link to="/create/test-case" style={{ color: 'black', textDecoration: 'none' }}>Create Test Case</Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(setAnchorElCreate)}>
              <Link to="/create/suites" style={{ color: 'black', textDecoration: 'none' }}>Create Suites</Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(setAnchorElCreate)}>
              <Link to="/create/collections" style={{ color: 'black', textDecoration: 'none' }}>Create Collections</Link>
            </MenuItem>
          </Menu>

          {/* TestCase Directory Button with Dropdown */}
          <Button
            color="inherit"
            onClick={(event) => handleTestCaseMenuOpen(event, setAnchorElTestCase)}
          >
            TestCase Directory
          </Button>
          <Menu
            anchorEl={anchorElTestCase}
            open={Boolean(anchorElTestCase)}
            onClose={() => handleMenuClose(setAnchorElTestCase)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <MenuItem onClick={() => handleMenuClose(setAnchorElTestCase)}>
              <Link to="/test-case/all" style={{ color: 'black', textDecoration: 'none' }}>All Test Cases</Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(setAnchorElTestCase)}>
              <Link to="/test-case/suites" style={{ color: 'black', textDecoration: 'none' }}>Suites</Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(setAnchorElTestCase)}>
                          <Link to="/test-case/collections" style={{ color: 'black', textDecoration: 'none' }}>Collections</Link>
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuClose(setAnchorElTestCase)}>
                            <Link to="/test-case/objectRepository" style={{ color: 'black', textDecoration: 'none' }}>Object Repository</Link>
                                    </MenuItem>
          </Menu>

          {/* Executions Button with Dropdown */}
          <Button
            color="inherit"
            onClick={(event) => handleExecutionsMenuOpen(event, setAnchorElExecutions)}
          >
            Executions
          </Button>
          <Menu
            anchorEl={anchorElExecutions}
            open={Boolean(anchorElExecutions)}
            onClose={() => handleMenuClose(setAnchorElExecutions)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <MenuItem onClick={() => handleMenuClose(setAnchorElExecutions)}>
              <Link to="/executions/in-progress" style={{ color: 'black', textDecoration: 'none' }}>In-progress Runs</Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(setAnchorElExecutions)}>
              <Link to="/executions/completed" style={{ color: 'black', textDecoration: 'none' }}>Completed Runs</Link>
            </MenuItem>
          </Menu>
          {/* Manage button with dropdown menu */}
          <Button
                      color="inherit" // Default button color.
                      onClick={(event) => handleManageMenuOpen(event, setAnchorElManage, 'Manage')} // Open "Manage" menu when clicked.
                    >
                      Manage
                    </Button>
                    {/* Manage dropdown menu */}
                    <Menu
                      anchorEl={anchorElManage} // Anchor element for the menu.
                      open={Boolean(anchorElManage)} // Check if the menu is open.
                      onClose={() => handleMenuClose(setAnchorElManage)} // Close the menu when triggered.
                      MenuListProps={{ style: { zIndex: 1201 } }} // Ensure it shows above other elements.
                      getContentAnchorEl={null} // Set anchor positioning for the content.
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Origin point for the menu.
                      transformOrigin={{ vertical: 'top', horizontal: 'left' }} // Transform origin for the menu.
                    >
                      {/* Menu items for Manage dropdown, linking to different manage pages */}
                      <MenuItem onClick={() => handleMenuClose(setAnchorElManage)}>
                        <Link to="/manage/manage-users" style={{ color: 'black', textDecoration: 'none' }}>Manage Users</Link>
                      </MenuItem>
                      <MenuItem onClick={() => handleMenuClose(setAnchorElManage)}>
                        <Link to="/manage/manage-environments" style={{ color: 'black', textDecoration: 'none' }}>Manage Environments</Link>
                      </MenuItem>
                      <MenuItem onClick={() => handleMenuClose(setAnchorElManage)}>
                        <Link to="/manage/manage-logs" style={{ color: 'black', textDecoration: 'none' }}>Manage Service Logs</Link>
                      </MenuItem>
                    </Menu>
{/* Project Selection Button */}
      <Button
        color="inherit"
        onClick={handleProjectMenuOpen}
      >
        {selectedProject ? selectedProject.name : "Select Project"}
      </Button>
      <Menu
        anchorEl={anchorElProject}
        open={Boolean(anchorElProject)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {projects.map((project) => (
          <MenuItem
            key={project}
            selected={project === selectedProject?.name}
            onClick={() => handleProjectChange(project)}
          >
            {project}
          </MenuItem>
                      ))}
                    </Menu>

          {/* Profile Icon with Dropdown */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={(event) => handleProfileMenuOpen(event, setAnchorElProfile)}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElProfile}
            open={Boolean(anchorElProfile)}
            onClose={() => handleMenuClose(setAnchorElProfile)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => handleMenuClose(setAnchorElProfile)}>
              <Link to="/profile" style={{ color: 'black', textDecoration: 'none' }}>
              <span role="img" aria-label="profile">👤</span> User Profile</Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(setAnchorElProfile)}>
              <Link to="/settings" style={{ color: 'black', textDecoration: 'none' }}>
              <span role="img" aria-label="settings">⚙️</span> Settings</Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(setAnchorElProfile)}>
              <Link to="/logout" style={{ color: 'black', textDecoration: 'none' }}>
              <span role="img" aria-label="logout">🔓</span> Logout</Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavigationBar;
