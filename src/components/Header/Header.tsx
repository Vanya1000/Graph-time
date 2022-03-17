import React, { useMemo, useState } from 'react';

const Header = React.memo(() => {
const [count, setCount] = useState(1)

	return <header>
		{count}
		<button onClick={() => { setCount(count + 1)}}>click</button>
	</header>
})

export default Header