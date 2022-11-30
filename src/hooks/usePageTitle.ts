import { useEffect } from 'react';

const usePageTitle = (title: string) => {
	useEffect(() => {
		document.title = `${title} | Fedor's gym hub`;
	}, [title]);
};

export default usePageTitle;
