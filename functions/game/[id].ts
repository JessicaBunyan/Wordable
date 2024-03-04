import { PagesFunction, KVNamespace } from "@cloudflare/workers-types";

interface Env {
	KV: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	const kv = context.env.kv;
	const cached = tryGet(kv, "last_param");
	if (cached) {
		return new Response("Hello, world! KV is working!");
	}

	try {
		await context.env.KV.put("last_param", String(context.params.id as string) || "no id ");
	} catch (e) {
		return new Response("didn't work", { status: 500 });
	}
	return new Response("Hello, world! cache miss");
};

export const tryGet = async (kv: KVNamespace, key: string, _default = "") => {
	try {
		return kv.get(key);
	} catch (e) {
		console.log(e);
		return _default;
	}
};
