import React, { useMemo, useState } from 'react';
import HeaderBar from './HeaderBar';

const Header = React.memo(() => {

	return <header>
		<div className="_container">
			<HeaderBar/>
			</div>
	</header>
})

export default Header