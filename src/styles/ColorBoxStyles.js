import chroma from 'chroma-js'

export default {
    ColorBox: {
      width: "20%",
      height: props => (props.showLink ? "25%" : "50%"),
      margin: "0 auto",
      display: "inline-block",
      position: "relative",
      cursor: "pointer",
      marginBottom: "-3.5px",
      "&:hover $copyButton": {
        opacity: 1,
        transition: '.5s ease'
      }
    },
    copyText: {
      color: props =>
        chroma(props.background).luminance() >= 0.7 ? "black" : "white"
    },
    colorName: {
      color: props =>
        chroma(props.background).luminance() <= 0.08 ? "white" : "black"
    },
    seeMore: {
      color: props =>
        chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white",
      background: "rgba(255, 255, 255, 0.3)",
      position: "absolute",
      border: "none",
      right: "0px",
      bottom: "0px",
      width: "60px",
      height: "30px",
      textAlign: "center",
      lineHeight: "30px",
      textTransform: "uppercase"
    },
    copyButton: {
      color: props =>
        chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white",
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      background: "rgba(255, 255, 255, 0.3)",
      fontSize: "1rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      border: "none",
      textDecoration: "none",
      opacity: 0,
      cursor: "pointer",
    },
    boxContent:  {
        position: "absolute",
        padding: "10px",                    
        maxWidth: "100%",
        left: "0px",
        bottom: "0px",
        color: "black",
        fontFamily: "Roboto",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
    },
    copyOverlay: {
        opacity: "0",
        zIndex: "0",
        width: "100%",
        height: "100%",
        transform: "scale(.1)",
        transition: "transform .5s ease",
    },
    showOverlay: {
        opacity: "1",
        transform: "scale(50)",
        zIndex: "10",
        position: "absolute",
    },
    copyMessage: {
        position: "fixed",
        top: "0",
        bottom: "0",
        right: "0",
        left: "0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "4rem",
        transform: "scale(.1)",
        opacity: "0",
        color: "white",
        "& h1": {
            fontWeight: "400",
            // textShadow: "1px 1px black",
            background: "rgba(255, 255, 255, .1)",
            width: "100%",
            textAlign: "center",
            marginBottom: "10px",
            padding: "1rem",
        }
    },
    copyBackground: {
        fontSize: "2rem",
        fontWeight: "100",
    },
    showMessage: {
        opacity: "1",
        transform: "scale(1)",
        zIndex: "15",
        transition: "all .4s ease-in-out",
        transitionDelay: ".3s",
    }
  };