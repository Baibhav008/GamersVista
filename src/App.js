
import { Route } from 'react-router-dom/cjs/react-router-dom.min';

import HomePage from './components/HomePage';

import DashPage from './components/DashPage';
import MainPage from './components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollableDiv from './components/Misc/ScrollableDiv';
import NavBar from './components/NavBar';
import EditProfile from './components/EditProfile';
import Feeds from './components/Feeds';
import AddPost from './components/AddPost';
import SearchUser from './components/SearchUser';
import MyPosts from './components/MyPosts';


function App() {

 
  return (
    
      <div className="App share-tech mono-regular">
      
      <Route path= "/" component={DashPage} exact />
      <Route path="/main" component={MainPage}/>
      <Route path="/editProf" component={EditProfile}/>
      <Route path="/feeds" component={Feeds}/>
      <Route path="/createPost" component={AddPost} />
      <Route path="/search" component={SearchUser}/>
      <Route path="/myPost" component={MyPosts}/>
      
    </div>

   //8da6b98162ce4e409de0016d2765f791
    
  );
}
export default App;

// First create the login and signup pages. 
// The current user info is stored in the local storage.
// To get the current userInfo , we have created the Conext ChatProvider, It fetches the info from local storage.
//HISTORY is used to navigate from one page to another on completion of an action.
//26:34 