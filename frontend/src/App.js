import './App.css';
import {HeaderBar} from './Component/HeaderBar';
import {FooterBar} from './Component/FooterBar'
import {RouteSection} from './Component/RouteSection'
// import {Routes} from 'react-router-dom';

function App() {
  return (
    <div className="main-app">

        <HeaderBar/>
        {/* <Routes> */}
          <RouteSection/>
        {/* </Routes> */}
        <FooterBar/>

    </div>
  );
}

export default App;
