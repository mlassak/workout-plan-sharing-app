import { useEffect } from 'react';

const usePageTitle = (title: string) => {
	useEffect(() => {
		document.title = `${title} | Fedor's iron archive`;
	}, [title]);
};

export default usePageTitle;
