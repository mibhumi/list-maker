import React,{useState, useEffect} from 'react';
import Firebase from '../Firebase';

const SORT_OPTIONS = {
    'TIME_ASC': {column: 'time_second' , direction: 'asc'},
    'TIME_DESC': {column: 'time_second' , direction: 'desc'},
    'TITLE_ASC': {column: 'time_second' , direction: 'asc'},
    'TITLE_DESC': {column: 'time_second' , direction: 'desc'}
}

function useList(sortBy = 'TIME_ASC') {

    const  [lists, setTimes] = useState([]);

    useEffect(()=> {
        const unsubscribe = Firebase
        .firestore()
        .collection('list')
        .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
        .onSnapshot((snapshot)=>{
            const newTimes = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            setTimes(newTimes)
        })

        return () => unsubscribe()
    }, [sortBy])

    return lists;
}

const List = () => {

    const [sortBy, setSortBy] = useState('TIME_ASC');
    const list = useList(sortBy);
    
    return(
        <div>
            <h2>Score List</h2>
            <div>
                <label>Sort By:</label>
                <select value={sortBy} onChange={ e => setSortBy(e.currentTarget.value) }>
                    <option disabled>----------</option>
                    <option value="TITLE_ASC">Title(a-z)</option>
                    <option value="TITLE_DESC">Title(z-a)</option>
                    <option value="TIME_ASC">Score Fastest</option>
                    <option value="TIME_DESC">Score Lowest</option>
                </select>
            </div>
            {/* <ol style={{ boxShadow:  "0px 0px 20px rgba(0, 0, 0, 0.15)", display: 'flex', justifyContent: "center", flexDirection: "column", margin: '2% 5% 2% 5%'}}>
                {
                    list.map((time)=>
                        // <li key={time.id} style={{ backgroundColor: "#009879", display: "flex", flexDirection: "row", justifyContent: "space-between", padding: '0.5% 5% 0.5% 5%' }}>
                        <li key={time.id} style={{ display: "flex", flexDirection: "row", backgroundColor: "#009879",  padding: '0.5% 5% 0.5% 5%' }}>
                            <div>
                                {time.title}
                            </div>
                            <code>
                                {time.time_second}
                            </code>
                        </li>
                    )
                }
            </ol> */}
            <table style={{ boxShadow:  "0px 0px 20px rgba(0, 0, 0, 0.15)", display: 'flex', justifyContent: "center", flexDirection: "column", margin: '2% 5% 2% 5%'}}>
                <thead style={{backgroundColor: "#009879", color: '#ffffff'}}>
                    <tr style={{display: "flex", flexDirection: "row", justifyContent: "space-between", padding: '0.5% 5% 0.5% 5%'}}>
                        <th>Name</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                {
                    list.map((time)=>
                    <tr key={time.id} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: '0.5% 5% 0.5% 5%' }}>
                        <td> {time.title} </td>
                        <td> {time.time_second} </td>
                    </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}

export default List;