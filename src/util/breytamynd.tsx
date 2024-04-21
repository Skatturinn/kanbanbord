import { notandi } from "@/types/types";
import { filterEmptyStrings } from "./filterempty";

export function b64hex(data: notandi) {
	let a = data as notandi
	function getBase64(file: Blob): Promise<string | ArrayBuffer | null> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
			reader.readAsDataURL(file);
		});
	}
	const fileInput = document.getElementById('imageInput') as HTMLInputElement;
	if (fileInput && fileInput.files && fileInput.files[0]) {
		const file = fileInput.files[0];
		getBase64(file)
			.then((base64String) => {
				if (typeof base64String === 'string') {
					a.avatar64 = base64String;
				} else {
					console.error('Base64 string is not a valid string');
				}
			})
			.catch(error => console.error('Error converting file to base64:', error));
	} else {
		console.error('No file selected.');
	}
	return a
}
