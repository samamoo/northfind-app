import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const useStyles = makeStyles((theme) => ({
  toTop: {
    zIndex: 10,
    position: 'fixed',
    bottom: '5vh',
    backgroundColor: '#0078c7',
    color: '#FFF',
    "&:hover, &.Mui-focusVisible": {
      transition: '0.3s',
      color: '#FFF', //397BA6
      backgroundColor: '#0d338f'
    },
    right: '5%',
  }
}));

export default function BackToTop({showBelow}) {
  const classes = useStyles()

  const [show, setShow] = useState(showBelow ? false : true)

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true)
    } else {
      if (show) setShow(false)
    }
  }

  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth`})
  }

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll)
      return () => window.removeEventListener(`scroll`, handleScroll)
    }
  })

  return ( 
    <div>
      { show &&
      <IconButton onClick={handleClick} className={classes.toTop}>
        <ExpandLessIcon/>
      </IconButton> }
    </div>
  )
}