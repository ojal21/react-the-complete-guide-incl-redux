import React from 'react';
import styleClasses from './SideDrawer.css';
import Logo from "../Logo/Logo";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import Aux from "../../hoc/PlaceHolder/PlaceHolder";
import Backdrop from "../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
  let attachedClasses = [styleClasses.SideDrawer, styleClasses.Close];
  
  if (props.opened) {
    attachedClasses = [styleClasses.SideDrawer, styleClasses.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.opened} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={styleClasses.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
