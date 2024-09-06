import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  EditJob,
  Stats,
  AllJobs,
  Profile,
  Admin,

} from './pages';

import {action as registerAction } from './pages/Register';
import {action as loginAction} from './pages/Login';
import {action as addJobAction} from './pages/AddJob';
import { action as editJobAction } from './pages/EditJob';
import { action as deleteJobAction } from './pages/DeleteJob';
import { action as profileAction } from './pages/Profile';

import { loader as dashboardLoader } from './pages/DashboardLayout';
import { loader as allJobLoader } from './pages/AllJobs';
import { loader as editJobLoader } from './pages/EditJob';
import { loader as adminLoaderJobAction } from './pages/Admin';




const checkDefaultTheme=()=>{
  const isDarkTheme=localStorage.getItem('darkTheme')==='true'
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme
}

const isDarkThemeEnabled=checkDefaultTheme()


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children:[
      {
        index:true,
        element:<Landing />
      },
      {
        path: 'register',
        element: <Register />,
        action:registerAction
      },
      {
        path: 'login',
        element: <Login />,
        action:loginAction
      },
      {
        path: 'dashboard',
        element: <DashboardLayout  isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader:dashboardLoader,
        children:[
          {
            index:true,
            element:<AddJob/>,
            action:addJobAction
          },
          {
            path:'stats',
            element:<Stats/>
          },
          {
            path:'all-jobs',
            element:<AllJobs/>,
            loader:allJobLoader
          },
          {
            path:'profile',
            element:<Profile/>,
            action:profileAction
          },
          {
            path:'admin',
            element:<Admin/>,
            loader:adminLoaderJobAction,
          },
          {
            path:'edit-job/:id',
            element:<EditJob/>,
            loader: editJobLoader,
            action: editJobAction,
          },
          { 
            path: 'delete-job/:id',
            action: deleteJobAction 
          },
        ]
      }
    ]
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App