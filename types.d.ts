type TGameSetupRecord = {
	id: string;
	answers: string[];
	title: string;
	icon?: string;
	maxGuesses?: number;
	validWords: TValidWords | "answers" | "english-dictionary";
	entityName: string;
	helpItems?: string[];
	suggestions?: null | "to-answers";
};

type TGameSetup = TGameSetupRecord & {
	characterLimit: number;
	validCharacters: string[];
	validWords: TValidWords;
	keyboardLayout: { default: string[] };
};

type TValidWords = string[] | null;
type TGameOptions = TGameSetup & { answer: string };
