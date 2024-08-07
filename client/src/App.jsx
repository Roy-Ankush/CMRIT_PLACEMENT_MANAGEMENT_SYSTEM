import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Student from './pages/student/Student';
import Tyl from './pages/student/Tyl';
import PlacementForm from './pages/student/PlacementForm';
import RecentActivity from './pages/student/RecentActivity';
import Chats from './pages/fpc/Chats';
import Verify from './pages/fpc/Verify';
import ChatPage from './pages/fpc/ChatPage';
import Fpc from './pages/fpc/Fpc';
import Validate from './pages/fpc/Validate';
import Forms from './pages/fpc/Forms';
import StudentList from './pages/fpc/StudentList';
import KycData from './pages/fpc/KycData';
import ForgotPass from './pages/forgot_password/ForgotPass';
import ResetPassword from './pages/reset_pass/ResetPassword';
import Trainer from './pages/Trainer/trainer';
// import Batches from './pages/Trainer/Batches'; // If needed, uncomment and use
import Studentsdata from './pages/Trainer/Studentslist'
import Mainlayout from './pages/Trainer/Mainlayout'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Register />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotPassword' element={<ForgotPass />} />
        <Route path='/resetPassword/:id/:token' element={<ResetPassword />} />

        {/* Student Routes */}
        <Route path='/student' element={<Student />}>
          <Route path='tyl' element={<Tyl />} />
          <Route path='placementform' element={<PlacementForm />} />
          <Route path='recentactivity' element={<RecentActivity />} />
        </Route>

        {/* FPC Routes */}
        <Route path='/fpc' element={<Fpc />}>
          <Route path='verify' element={<Verify />} />
          <Route path='chat' element={<Chats />} />
          <Route path='chat/:chatId' element={<ChatPage />} />
          <Route path='validate' element={<Validate />} />
          <Route path='validate/forms' element={<Forms />} />
          <Route path='validate/forms/studentlist' element={<StudentList />} />
          <Route path='validate/forms/studentlist/kycdata' element={<KycData />} />
        </Route>

       
        <Route path='/placementtrainer' element={<Trainer />}>
           <Route path='' element={<Mainlayout />} />
           <Route path='batches/:batch' element={<Studentsdata />} />
        </Route>
        
       
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
