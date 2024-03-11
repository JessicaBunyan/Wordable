const keyboardLayouts: Record<string, string[]> = {
	"": ["q w e r t y u i o p", "a s d f g h j k l", "{bksp} z x c v b n m {enter}"],
	" ": ["q w e r t y u i o p", "a s d f g h j k l", "z x c v b n m", "{bksp} {space} {enter}"],
};
export default function getKeyboardLayout(specialCharacters: string[]) {
	const key = specialCharacters.sort().join("");

	console.log(`key : '${key}'`);
	console.log(keyboardLayouts[key]);

	return { default: keyboardLayouts[key] };
}
