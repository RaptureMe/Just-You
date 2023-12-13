import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'material-icons/iconfont/material-icons.css';
import App from './App.jsx'
import SearchVideos from './pages/SearchVideos'
import RenderVideo from "./pages/RenderVideo.jsx"
import SavedVideos from './pages/SavedVideos'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <SearchVideos />
      }, 
      {
        path: "/renderVideo/:videoId",
        element: <RenderVideo />
      },
      {
        path: '/saved',
        element: <SavedVideos />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
