import { useEffect, useRef, useState } from "react";
import { keys } from "../constants/keys";

export const useLanguageStorage = (defaultLanguage: string) => {
	const [language, setLanguage] = useState(defaultLanguage);
	const isMounted = useRef(false);

	useEffect(() => {
		if (isMounted) {
			return;
		}
		const storageLang = localStorage.getItem(keys.STORAGE);
		if (storageLang) {
			setLanguage(storageLang);
		}

		if (!storageLang) {
			setLanguage(defaultLanguage);
			localStorage.setItem(keys.STORAGE, defaultLanguage);
		}
	}, []);

	const changeLanguage = (language: string) => {
		setLanguage(language);
		localStorage.setItem(keys.STORAGE, language);
	};

	return { language, changeLanguage };
};
