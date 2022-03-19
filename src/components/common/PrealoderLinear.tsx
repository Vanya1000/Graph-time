import { Box, LinearProgress } from "@mui/material";
import React from "react";

const PreloaderLinear = () => {
	return <Box sx={{ height: '100%', width: '50%', margin: '0 auto' }}>
		<LinearProgress sx={{ top: '50%' }} />
	</Box>
}


export default PreloaderLinear