const drawerWidth = 300;

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
  button: {
    margin: "0 .5rem",
  },
  link: {
    textDecoration: "none"
  }
})