import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
        <div className='nav-wrap'>
          <header>
            <div className='nav'>
              <div className='skillSWAP'>
                <li>
                  <NavLink className='TitleHeader' exact to="/">
                    <i className="fa-solid"></i>
                    Skill Swap
                  </NavLink>
                </li>
              </div>
              {isLoaded && sessionUser && (
                <ul>
                  <div className='top'>
                    <div className='profile'>
                      <li>
                        <ProfileButton user={sessionUser} />
                      </li>
                    </div>
                  </div>
                </ul>
              )}
              {isLoaded && !sessionUser && (
                <ul className='navButton'>
                  <li classname="ProfileBut">
                    <ProfileButton user={sessionUser} />
                  </li>
                </ul>
              )}
            </div>
          </header>
        </div>
      );
}

export default Navigation;
