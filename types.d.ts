type HTTPError = {
	code: number;
	message: string;
};

type TGameSetupRecord = TCommonGameSetup & {
	validWords: string[] | null | "answers" | "english-dictionary";
};

type TCommonGameSetup = {
	suggestions?: null | "to-answers";
	helpItems?: string[];
	entityName: string;
	id: string;
	answers: string[];
	title: string;
	icon?: string;
	maxGuesses?: number;
};

type TGameSetup = TCommonGameSetup & {
	characterLimit: number;
	validCharacters: string[];
	invalidWordMessage: string;
	wordSet?: Set<string>;
	fuse?: import("fuse.js").default<string>;
	keyboardLayout: { default: string[] };
};

type TValidWords = string[] | null;
type TGameOptions = TGameSetup & { answer: string };

type TLetterState = "invisible" | "nonExistent" | "correct" | "misplaced" | "incorrect" | "default";
