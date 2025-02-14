import React from 'react'
import { NavigationComponent } from "../../components/HomePageComponents"

const HomePage = () => {
  return (
    <>
        <NavigationComponent />
        <div
   style = {{
    height: "100vh",
    width: "220vh",
    position: "absolute", /* Position the element absolutely within its parent */
  // top: "10px",
    
    backgroundImage:
    //'url("https://www.wellstar.org/-/media/project/wellstar/org/articles/heartcareadvancedservices_blogimages_1440x972.png?rev=c4d18ba27226460dbad7a42c7a5b9673")',
    'url("https://www.wellstar.org/-/media/project/wellstar/org/articles/cardiovasculardisease_abctableofexperts_blogimages_1440x972.png?rev=d90157c426d64b2cbe50e95e314c406a")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
 }}
   >
  <h1 className='display-1 my-4'style={{paddingLeft: "50px"}} >Welcome to Heart Analyzer</h1>
</div>
        
    </>
  )
}

export default HomePage