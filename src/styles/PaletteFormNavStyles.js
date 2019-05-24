import {DRAWER_WIDTH} from '../constants'
import sizes from './sizes'

const drawerWidth = DRAWER_WIDTH;

export default theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    height:"64px"
  },
  hide: {
    display: 'none',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },  
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  navBtn: {
    marginRight: "1rem",
  },
    [sizes.down("xs")]: {
      marginRight: "0.5rem"
    },
  button: {
    margin: "0 .5rem",
    [sizes.down("xs")]: {
      margin: "0 .2rem",
      padding: ".3rem"
    }
  },
  link: {
    textDecoration: "none"
  }
})