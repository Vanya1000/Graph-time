import React from "react"
import GitHubIcon from '@mui/icons-material/GitHub';
import { Card, Link } from "@mui/material";
const Footer = React.memo(() => {

	return <footer>
		<div className="_container">
			<Card>
				<div className="footer__link">
					<Link underline="hover" href="https://github.com/Vanya1000"><GitHubIcon fontSize={'medium'} /></Link>
					<Link  href="https://github.com/Vanya1000">Ivan Zaharenko</Link>
				</div>
			</Card>
			</div>
	</footer>
})

export default Footer
