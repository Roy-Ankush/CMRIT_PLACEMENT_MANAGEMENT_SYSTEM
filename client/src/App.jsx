import {ToastContainer} from 'react-toastify'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Student from './pages/student/Student'
import Tyl from './pages/student/Tyl'
import PlacementForm from './pages/student/PlacementForm'
import RecentActivity from './pages/student/RecentActivity'
import Chats from './pages/fpc/Chats'
import Verify from './pages/fpc/Verify'
import ChatPage from './pages/fpc/ChatPage'
import Fpc from './pages/fpc/Fpc'
import Validate from './pages/fpc/Validate'
import Forms from './pages/fpc/Forms'
import StudentList from './pages/fpc/StudentList'
import KycData from './pages/fpc/KycData'
import ForgotPass from './pages/forgot_password/ForgotPass'
import ResetPassword from './pages/reset_pass/ResetPassword'
// import OfficerHome from './pages/officer/OfficerHome'
// import Drives from './pages/officer/Drives'
// import Officer from './pages/officer/Officer'


function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Register/> }></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forgotPassword' element={<ForgotPass />}></Route>
        <Route path='/resetPassword/:id/:token' element={<ResetPassword />}></Route>


        <Route path='/student' element={<Student />}>
          <Route path='/student/tyl' element={<Tyl />} />
          <Route path='/student/placementform'element={<PlacementForm />} />
          <Route path='/student/recentactivity' element={<RecentActivity />} />
        </Route>

        <Route path='/fpc' element={<Fpc/>}>
          <Route path='/fpc/verify' element={<Verify/>}></Route> 

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

