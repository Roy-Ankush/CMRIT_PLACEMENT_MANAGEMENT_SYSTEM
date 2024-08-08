import {ToastContainer} from 'react-toastify'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Student from './pages/student/Student'
import Tyl from './pages/student/Tyl'
import PlacementForm from './pages/student/PlacementForm'
import RecentActivity from './pages/student/RecentActivity'
import Verify from './pages/fpc/Verify'
import Fpc from './pages/fpc/Fpc'
import ForgotPass from './pages/forgot_password/ForgotPass'
import ResetPassword from './pages/reset_pass/ResetPassword'
import Admin from './pages/admin/Admin'
import OfficerHome from './pages/officer/OfficerHome'
import Drives from './pages/officer/Drives'
import Officer from './pages/officer/Officer'
import Trainer from './pages/Trainer/Trainer';
// import Batches from './pages/Trainer/Batches'; // If needed, uncomment and use
import Studentsdata from './pages/Trainer/Studentslist'
import Chat from './pages/Trainer/Chats'
import Adminhome from './pages/admin/Adminhome'
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
        </Route>

        <Route path='/officer' element={<Officer/>}>
          <Route path='/officer/home' element={<OfficerHome/>}></Route>
          <Route path='/officer/drives' element={<Drives/>}></Route>
        </Route>

        <Route path='/placementtrainer' element={<Trainer />}>
           <Route path='/placementtrainer/chat' element={<Chat />} />
           <Route path='/placementtrainer/update_mark' element={<Studentsdata />} />
        </Route>
        
        <Route path='/admin' element={<Admin/>}>
          <Route path='/admin/home' element={<Adminhome/>}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App

