import React from 'react'
import './Tasks.css'
import { ThemeProvider } from '@mui/system';
import theme from '../theme';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Switch } from '@mui/material';
import axios from 'axios';
import base_url from './../base_url'

const Tasks = ({ tasks, setTasks }) => {

    const handleDelete = (id) => {
        axios
            .delete(`${base_url}/delete/${id}`)
            .then(() => {
                axios.get(`${base_url}/listTask`)
                    .then((res) => {
                        setTasks(res.data.info)
                    })
            })

    }

    const handleChange = (id) => {
        axios
            .put(`${base_url}/update/${id}`)
            .then(() => {
                axios.get(`${base_url}/listTask`)
                    .then((res) => {
                        setTasks(res.data.info)
                    })
            })

    }

    return (
        <ThemeProvider theme={theme}>
            <div className='tasks'>
                {tasks.length === 0
                    ? <div className='emptyList'>No tasks to show! Add a task!</div>
                    : <div>
                        {tasks.map((task) => {
                            return (
                                <div className='taskCard'>
                                    <Card sx={{ width: 400, borderRadius: 5, backgroundColor: task.priority?theme.palette.tertiary.main: theme.palette.secondary.light }}>
                                        <CardContent>
                                            <div className='taskInfo'>
                                                <div>
                                                    {task.taskContent}
                                                </div>
                                                <div>
                                                    <Switch
                                                        checked={task.priority}
                                                        onChange={() => handleChange(task.id)}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </div>
                                                <div>
                                                    <IconButton onClick={() => handleDelete(task.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </ThemeProvider>
    )
}

export default Tasks
