import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Student from './pages/student/Student'
import Tyl from './pages/student/Tyl'
import PlacementForm from './pages/student/PlacementForm'
import RecentActivity from './pages/student/RecentActivity'
import Chats from './pages/fpc/Chats'
import ChatPage from './pages/fpc/ChatPage'
import Fpc from './pages/fpc/Fpc'
import Validate from './pages/fpc/Validate'
import Forms from './pages/fpc/Forms'
import StudentList from './pages/fpc/StudentList'
import KycData from './pages/fpc/KycData'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/> }></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login />}></Route>

        <Route path='/student' element={<Student />}>
          <Route path='/student/tyl' element={<Tyl />} />
          <Route path='/student/placementform'element={<PlacementForm />} />
          <Route path='/student/recentactivity' element={<RecentActivity />} />
        </Route>

        <Route path='/fpc' element={<Fpc/>}>
          <Route path='/fpc/chat' element={<Chats/>}></Route> 
          <Route path='/fpc/chat/:chatId' element={<ChatPage/>} />
          <Route path='/fpc/validate' element={<Validate/>}></Route> 
          <Route path='/fpc/validate/forms' element={<Forms/>}></Route> 
          <Route path='/fpc/validate/forms/studentlist' element={<StudentList/>}></Route> 
          <Route path='/fpc/validate/forms/studentlist/kycdata' element={<KycData/>}></Route> 
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App

