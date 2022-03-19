import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Preloader = () => {
	return <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '100%', alignItems: 'center'  }}>
		<CircularProgress />
	</Box>
}


export default Preloader