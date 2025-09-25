import { errors } from "../constants/errors";

export async function jsonLoader(files: string[]) {
	if (!files.length) {
		throw new Error(errors.NO_FILE_PASSED);
	}

	const filesMap: Record<string, any> = {};

	for (const file of files) {
		const fileKey = manageFile(file);

		filesMap[fileKey!] = await fetchJson(file);
	}
	return filesMap;
}

async function fetchJson(filePath: string) {
	try {
		const response = await fetch(filePath);
		if (!response.ok) {
			throw new Error(`Failed to fetch ${filePath}`);
		}

		return response.json();
	} catch (err) {
		throw new Error(`Failed to fetch ${filePath}`);
	}
}

function manageFile(file: string) {
	const isJson = isFileJson(file);
	if (!isJson) {
		throw new Error(errors.JSON_FORMAT_INPUT);
	}

	const fileName = getFileName(file);

	return fileName;
}

function getFileName(file: string) {
	return file.split("/").pop()?.replace(".json", "");
}

function isFileJson(file: string) {
	return file.endsWith(".json");
}
