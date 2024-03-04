import { PagesFunction, KVNamespace, Response } from "@cloudflare/workers-types";

interface Env {
	test: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	const cached = await context.env.test.get("last_id");
	if (cached) {
		return new Response("Hello, world! KV is working!");
	}

	await context.env.test.put("keyput", context.params.id || "no id ");
	return new Response("Hello, world!" + String(context.params));
};
