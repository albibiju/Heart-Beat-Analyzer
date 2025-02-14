import React from 'react'
import { NavigationComponent } from "../../components/HomePageComponents"
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DashboardPage1 from '../DashboardPage1/DashboardPage1'

const DashboardPage = () => {

  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoggedIn){
      navigate("/")
    }
  },[])

  return (
    <>
    <NavigationComponent />
    
    {/* <div
   style = {{
    height: "100vh",
    width: "220vh",
    position: "absolute", 
    
    backgroundImage:
    'url("https://www.wellstar.org/-/media/project/wellstar/org/articles/cardiovasculardisease_abctableofexperts_blogimages_1440x972.png?rev=d90157c426d64b2cbe50e95e314c406a")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
 }}
   >
  <h1 className='display-1 my-4'style={{paddingLeft: "50px"}} >Welcome to the Dashboard</h1>
</div> */}

<DashboardPage1 />
    </>
  )
}

export default DashboardPage