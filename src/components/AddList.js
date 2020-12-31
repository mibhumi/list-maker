import React, { useState } from 'react';
import Firebase from '../Firebase';

const AddList = () => {

    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');

    function onSubmit(e) {
        e.preventDefault()

        Firebase
        .firestore()
        .collection('list')
        .add({
            title,
            time_second: parseInt(time)
        })
        .then(()=>{
            setTitle('')
            setTime('')
        })
    }

    return(
        <div style={{justifyContent: "center", display: 'flex'}}>
            <form onSubmit={onSubmit} style={{backgroundColor: '#e6e7e8', width: '50%', borderStyle: "groove"}}>
                <h4>Add list</h4>
                <div style={{ padding: " 1% 20%"}}>
                    <div style={{display: "flex",flexDirection: 'row', justifyContent: 'space-between', padding: '2%'}}>
                        <label>Enter title</label>
                        <input type="text" value={title} onChange={e => setTitle(e.currentTarget.value)} />
                    </div>
                    <div style={{display: "flex",flexDirection: 'row', justifyContent: 'space-between', padding: '2%'}}>
                        <label>Enter time in seconds</label>
                        <input type="number" value={time} onChange={e => setTime(e.currentTarget.value)}/>
                </div>
                </div>
                <button style={{margin: '2%', padding: '1%', color: '#ffffff', backgroundColor: '#009879'}}>Add List</button>
            </form>
        </div>
    )
}

export default AddList;