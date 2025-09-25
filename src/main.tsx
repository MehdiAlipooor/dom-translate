import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as enDictionary from "./../public/languages/en.json";
import * as faDictionary from "./../public/languages/fa.json";
import { EndpointV2 } from "./endpoint.v2";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<EndpointV2
			allLanguages={{
				fa: faDictionary.default,
				en: enDictionary.default,
			}}
			defaultLanguage="fa"
		/>
	</StrictMode>,
);
