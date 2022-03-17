import React from "react"
import GitHubIcon from '@mui/icons-material/GitHub';
import { Card } from "@mui/material";
const Footer = React.memo(() => {

	return <footer>
		<div className="_container">
			<Card>
				<div className="footer__link">
					<a href="https://github.com/Vanya1000"><GitHubIcon fontSize={'medium'} /></a>
					<a href="https://github.com/Vanya1000">Ivan Zaharenko</a>
				</div>
			</Card>
			</div>
	</footer>
})

export default Footer
