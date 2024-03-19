interface Env {
	KV: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	const kv = context.env.KV;

	const value = await tryGet(kv, context.params.id as string);
	if (value) {
		return new Response(value, { headers: { "Content-Type": "application/json" } });
	}

	return new Response(JSON.stringify({ error: "no such key with this ID" }), { status: 404 });
};

export const tryGet = async (kv: KVNamespace, key: string, _default = "") => {
	try {
		return kv.get(key);
	} catch (e) {
		console.log(e);
		return _default;
	}
};
