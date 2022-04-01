import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './BaseCard.css'
import { CardHeader } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import theme from '../theme';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Tasks from './Tasks';
import AddTask from './AddTask';
import { useState } from 'react';
import axios from 'axios';
import base_url from '../base_url';

export default function BaseCard() {
  const [value, setValue] = React.useState(0);
  const [tasks, setTasks] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    axios
      .get(`${base_url}/listTask`)
      .then((res) => {
        setTasks(res.data.info)
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className='baseCard'>
        <Card sx={{ width: 500, minHeight: 250, backgroundColor: theme.palette.secondary.main, borderRadius: 5 }}>
          <CardContent>
            <CardHeader title="Task Manager" />
          </CardContent>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Tasks" />
            <Tab label="Add Task" />
          </Tabs>
          {value === 0 ? <Tasks tasks={tasks} setTasks={setTasks} /> : <AddTask tasks={tasks} setTasks={setTasks} />}
        </Card>
      </div>
    </ThemeProvider>
  );
}
