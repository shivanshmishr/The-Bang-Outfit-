import React from 'react';
import { Backdrop, CircularProgress } from "@mui/material";

const BackdropLoader = ({open}) => {
  return (
    <Backdrop open={open} sx={{zIndex:9999, color:"#e2e2e2"}}>
      <CircularProgress color='inherit'/>
    </Backdrop>
  )
}

export default BackdropLoader