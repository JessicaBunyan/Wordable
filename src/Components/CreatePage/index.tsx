import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const API_URL = "";

type FormValues = {
	name: string;
	validWords?: string[] | "ENGLISH_DICTIONARY" | "ANY";
};

const CreatePage = () => {
	const { register, handleSubmit } = useForm<FormValues>();
	const navigate = useNavigate();

	const onSubmit = handleSubmit(async (data, event) => {
		console.log("submit");
		console.log(data);
		console.log(event);
		event?.preventDefault();

		const res = await fetch(API_URL + "/game/create", {
			method: "POST",
			body: JSON.stringify({ ...data, color: "red" }),
		});
		if (res.status == 201) {
			const data = await res.json();
			console.log("new url is " + data.id);
			console.log(API_URL + "/game/" + data.id);
			navigate(API_URL + "/game/" + data.id);
		} else {
			console.error("uhoh");
			console.log(res);
		}
		return false;
	});
	console.log("foo");

	return (
		<form onSubmit={onSubmit}>
			<label>
				<input {...register("name")} type="text" required={true}></input>
			</label>

			<label>
				<input {...register("validWords")} type="text" required={false}></input>
			</label>

			<button type="submit">CREATE!</button>
		</form>
	);
};

export default CreatePage;
