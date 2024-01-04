import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Css from './navbar.module.css'
import './navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, searchFriend } from '../store/AuthSlice'


const Navbar = () => {
  const [toggler, settoggler] = useState(false);
  const [clicked, setclicked] = useState(false);
  const firends = useSelector((state) => state.auth.searchFriend)
  const user = useSelector((state) => state.auth.user)
  const auth = useSelector((state) => state.auth);
  console.log(user)
  let inputRef = useRef()
  let location = useLocation();
  // console.log()

  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  const handleSearchClick = async (e) => {
    e.preventDefault();
    setclicked(true)
    // console.log(inputRef.current.value)
    let response = await fetch('https://friends-book-social-media.vercel.app/api/users/searchUsers', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name: inputRef.current.value })
    });
    let details = await response.json();
    // console.log(details)
    dispatch(searchFriend(details))

  }
  const handleSerchClose = () => {
    setclicked(false);
    dispatch(searchFriend([]))
  }

  return (
    <div className={Css.navbar}>
      {/* <div className={location.pathname==='/'?"hello":"billo"}>  */}
      {/* {<button onClick={handleClick}>click</button> } */}

      <Link style={{ textDecoration: "none", color: "black" }} to='/'><h1>FriendsBook</h1></Link>
      <ul className={!auth.login?Css.accountProfile:Css.navList}>
        <li>
          <div action="" className={Css.searchForm}>
            <input className={Css.searchInput} type="text" ref={inputRef} placeholder='search friends' />
            <div className={Css.datalist}>
              {firends.length > 0 && <i onClick={handleSerchClose} className={`bi bi-x ${Css.searchFriendCloseIcon}`}></i>}
              {firends && firends.map((ele) => {
                return <Link state={ele} to={'/friends'} className={Css.data}>
                  <p>{ele.name}</p>
                  <img className={Css.dataPic} src={ele.profilePicture ? ele.profilePicture : "https://www.basantfinance.com/images/default-userimg.png"} alt="" />
                </Link>
              })}
            </div>
            <i className={`bi bi-search ${Css.searchIcon}`} onClick={handleSearchClick}></i>
          </div>
        </li>
        <li className={Css.navListLi}><Link to={'/'} className={Css.navListLink}>Home</Link></li>
        {/* <li className={Css.navListLi}><Link to={'/login'} className={Css.navListLink}>Login</Link></li>
        
        <li className={Css.navListLi}><Link to={'/signup'} className={Css.navListLink}>Signup</Link></li> */}
        <li className={Css.navListLi}><Link to={'/followers'} className={Css.navListLink}>Followers</Link></li>
        <li className={Css.navListLi}><Link to={'/following'} className={Css.navListLink}>Followings</Link></li>
        {/* <li className={Css.navListLi}><Link to={'/friends'} className={Css.navListLink}>Friends</Link></li> */}
        <li >
          <Link style={{display:"flex",alignItems:"center", height:"100%"}}><img className='accountImg' src={user.profilePicture} alt="" />
            <i onClick={()=>{settoggler(!toggler)}} className="bi bi-three-dots-vertical threeDots">
              {toggler && <ul className='threeDotsInside'>
               
               <li><Link to={'/profile'} >Profile</Link></li>
               <li><Link>Account</Link></li>
               <li onClick={handleLogout} ><Link >Logout</Link></li>
               
               

             </ul>}
            </i>

          </Link>
        </li>
      </ul>
    </div>

  )
}

export default Navbar
