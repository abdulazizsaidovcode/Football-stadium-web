"use client";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { BottomGradient, LabelInputContainer } from "../../components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import instance from "../../server/config";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

export function SignIn() {
	const navigate = useNavigate();

	interface Inputs {
		phone: string;
		password: string;
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const mutation = useMutation({
		mutationFn: async (data: Inputs) => {
			return await instance.post("/auth/login", data);
		},
		onSuccess: (response) => {
			Cookies.set("auth_token", response.data.data.token);
			navigate("/admin/dashboard");
		},
		onError: (error) => {
			console.error("Sign-in error:", error);
		},
	});

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		mutation.mutate(data);
	};

	return (
		<div className="relative left-1/2 top-1/2 transform -translate-x-1/2 translate-y-1/4">
			<div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
				<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
					Sign In
				</h2>
				<p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
					Login to website if you can because we don&apos;t have a login flow
					yet
				</p>

				<form
					className="my-8"
					onSubmit={handleSubmit(onSubmit)}>
					<LabelInputContainer className="mb-4">
						<Label htmlFor="phone">Username</Label>
						<Input
							id="phone"
							placeholder="erkinov0247"
							type="text"
							{...register("phone", { required: "Username is required" })}
						/>
						{errors.phone && (
							<p className="text-red-500 text-sm">{errors.phone.message}</p>
						)}
					</LabelInputContainer>
					<LabelInputContainer className="mb-4">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							placeholder="••••••••"
							type="password"
							{...register("password", { required: "Password is required" })}
						/>
						{errors.password && (
							<p className="text-red-500 text-sm">{errors.password.message}</p>
						)}
					</LabelInputContainer>
					{mutation.status === "error" && (
						<p className="text-red-500 text-sm my-2">You cannot enter this</p>
					)}
					<button
						className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
						type="submit">
						{mutation.status === "pending" ? "Loading..." : "Sign In"}
						<BottomGradient />
					</button>
				</form>
			</div>
		</div>
	);
}
