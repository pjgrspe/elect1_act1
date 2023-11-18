import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import EditTable from './components/EditTable.js';
import UserTable from './components/UserTable.js';
import { BrowserRouter, Route, Router, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <body className='App'>
        {/* <header className="App-header">
          <NavbarComponent />
        </header> */}
        <div>
          <Routes>
            <Route path="/" element={<UserTable />} />
            <Route path="/edit" element={<EditTable />} />
          </Routes>
        </div>
      </body>
    </BrowserRouter>

  );
}

export default App;
