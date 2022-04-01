import React, { useState } from 'react'
import './AddTask.css'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import base_url from '../base_url'

const AddTask = ({ tasks, setTasks }) => {
    const [taskContent, setTaskContent] = useState('')
    const [error, setError] = useState(false);

    const handleSubmit = () => {
        if (taskContent === '') setError(true);
        else {
            let date = new Date().getDate()
            let month = new Date().getMonth()
            let year = new Date().getFullYear()
            setTaskContent('')
            console.log(date)
            const obj = {
                taskContent: taskContent,
                priority: false,
                date: `${date} / ${month} / ${year}`,
            }

            axios.post(`${base_url}/addTask`, obj)
                .then((res) => {
                    axios
                        .get(`${base_url}/listTask`)
                        .then((res) => {
                            setTasks(res.data.info)
                        })
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <div className='addTask'>
            <div className='formGroup'>
                <TextField
                    required
                    multiline
                    id="outlined-required"
                    label="Task"
                    value={taskContent}
                    error={error}
                    onChange={(event) => setTaskContent(event.target.value)}
                    helperText={error ? "Empty field" : ""}
                />
            </div>
            <div className='formGroup'>
                <Button variant='contained' sx={{ fontColor: 'white', height: 40, width: 150, borderRadius: 5, fontSize: 16 }} onClick={() => handleSubmit()}>Add</Button>
            </div>
        </div>
    )
}

export default AddTask
