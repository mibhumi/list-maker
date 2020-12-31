import './App.css';
import List from './components/List';
import AddList from './components/AddList';
// import firebase from './Firebase';

// firebase.firestore().collection('list').add({
//   title: 'Attend scrum',
//   time_second: '11'
// })

function App() {
  return (
    <div className="App">
        <h1>List maker</h1>
        <List/>
        <AddList/>
    </div>
  );
}

export default App;
