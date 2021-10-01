import React, { useState, useEffect } from 'react'
import axios from 'axios'


function Main() {

    const [newtask, setnewTask] = useState('');
    const [post, setPost] = useState([]);
    const [toggle, setToggle] = useState(false)
    const [newEdit, setNewEdit] = useState('');

    const sendTask = async (e) => {
        e.preventDefault();
        setnewTask('');
        if (newtask === '') {}
        else {
            axios.post('http://localhost:3001/task', {
                task: newtask,
            }).then((res) => {
                console.log('successed');
            }).catch((err) => {
                console.log(err)
            });
        }
    };

    useEffect(() => {
        axios.get('http://localhost:3001/taskinfo')
            .then(json => setPost(json.data))
    }, [sendTask])

    const renderTasks = () => {

        return post.map(user => {

            const editTask = async (e) => {
                e.preventDefault();
                setNewEdit('');
                axios.post('http://localhost:3001/edit', {
                    taskid: user.id,
                    tasktext: user.task,
                    newtask: newEdit,
                }).then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err)
                });
            }

            const editToggle = () => {
                setToggle(value => !value);                
            }

            const removeTask = async (e) => {
                e.preventDefault();
                axios.post('http://localhost:3001/delete', {
                    taskid: user.id
                }).then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err)
                });
            }

            return (
                <div className='tasks'>
                    <div className='taskName'>
                        <span>{user.id}.</span>
                        <p>{user.task}</p>
                    </div>
                    <div className='taskButtons'>
                        <button onClick={removeTask}>Del</button>
                        <button onClick={editToggle}>{toggle ? 'Close' : 'Edit'}</button>
                    </div>
                    <div className={toggle ? 'removeDiv' : 'removeDivHidden'}>
                        <form onSubmit={editTask} action="post">
                            <input type="text"
                                placeholder='new task'
                                value={newEdit}
                                onChange={(e) => setNewEdit(e.target.value)} />
                            <button className='editBtn' type='submit' >Change</button>
                        </form>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className='main'>
            <div className="taskManager">
                <h1>Task Manager</h1>
                <form onSubmit={sendTask} className='form' action="post">
                    <input type="text"
                        name='task'
                        maxLength='25'
                        value={newtask}
                        placeholder="e.g clean a car"
                        onChange={(e) => {
                            setnewTask(e.target.value)
                        }} />
                    <button type="submit">Add Task</button>
                </form>
            </div>
            <div className="taskManager taskList">
                <h1>Task List</h1>
                {renderTasks()}
            </div>
        </div >

    )
}

export default Main
