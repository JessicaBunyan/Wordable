import { PagesFunction, KVNamespace } from "@cloudflare/workers-types";

interface Env {
	KV: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	const cached = await context.env.KV.get("last_id");
	if (cached) {
		return new Response("Hello, world! KV is working!");
	}

	await context.env.KV.put("keyput", (context.params.id as string) || "no id ");
	return new Response("Hello, world!" + String(context.params));
};
