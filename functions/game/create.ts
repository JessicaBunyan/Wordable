import { randomUUID } from "node:crypto";

interface Env {
	KV: KVNamespace;
}

type TGame = {
	name: string;
	color: string;
};

export const onRequest: PagesFunction<Env> = async (context) => {
	const kv = context.env.KV;
	const data: TGame = await context.request.json();
	const id: string = randomUUID();

	try {
		await kv.put(id, JSON.stringify(data));
	} catch (e) {
		return new Response("didn't work", { status: 500 });
	}
	return new Response(id, { status: 201 });
};
