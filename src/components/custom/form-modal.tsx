import { BsPersonCircle } from "react-icons/bs";
import {
	AcceptIcon,
	CloseIcon,
	Modal,
	ModalBody,
	ModalContent,
	ModalTrigger,
} from "../ui/animated-modal";
import { LabelInputContainer } from "../ui/label";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { MeType } from "../../constants/types";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import instance from "../../server/config";
import Cookies from "js-cookie";

const FormModal = ({ data }: { data: null | MeType | undefined }) => {
	interface Inputs {
		firstName: string;
		lastName: string;
		password: string | null;
		phoneNumber: string;
	}

	const [isDisabled, setIsDisabled] = useState(true);

	const { register, handleSubmit, reset } = useForm<Inputs>({
		defaultValues: {
			firstName: data?.firstName || "",
			lastName: data?.lastName || "",
			password: data?.password || "",
			phoneNumber: data?.phoneNumber || "",
		},
	});

	useEffect(() => {
		if (data) {
			reset({
				firstName: data.firstName,
				lastName: data.lastName,
				password: data.password,
				phoneNumber: data.phoneNumber,
			});
		}
	}, [data, reset]);

	const mutation = useMutation({
		mutationFn: async (formData: Inputs) => {
			const response = await instance.put(`user/update`, { data: formData });
			return response.data;
		},
		onSuccess: (response) => {
			if (response) {
				Cookies.remove("auth_token");
				Cookies.set("auth_token", response.data);
				console.log("Auth token updated:", response.data);
			}
		},
		onError: (error) => {
			console.error("Error updating user data:", error);
		},
	});

	const onSubmit: SubmitHandler<Inputs> = (formData) => {
		console.log(formData);
		mutation.mutate(formData);
		setIsDisabled(true);
	};

	return (
		<div className="flex w-full items-center gap-2">
			<Modal>
				<ModalTrigger className="w-full gap-2 p-4 hover:bg-gray-400 hover:text-white cursor-pointer rounded-none">
					<div
						onClick={() => {
							setIsDisabled(true);
						}}
						className="w-full flex items-center gap-2">
						<BsPersonCircle />
						Account
					</div>
				</ModalTrigger>
				<ModalBody className="max-w-fit">
					<ModalContent>
						<div className="flex text-black justify-between">
							<div>Account</div>
							<button onClick={() => setIsDisabled(false)}>Edit</button>
						</div>
						<form
							className="my-8"
							onSubmit={handleSubmit(onSubmit)}>
							<div className="flex flex-wrap justify-between gap-4">
								<LabelInputContainer className="mb-4 w-[45%]">
									<Input
										id="firstName"
										placeholder="First Name"
										type="text"
										disabled={isDisabled}
										{...register("firstName", {
											required: "First Name is required",
										})}
									/>
								</LabelInputContainer>
								<LabelInputContainer className="mb-4 w-[45%]">
									<Input
										id="lastName"
										placeholder="Last Name"
										type="text"
										disabled={isDisabled}
										{...register("lastName", {
											required: "Last Name is required",
										})}
									/>
								</LabelInputContainer>
								<LabelInputContainer className="mb-4 w-[45%]">
									<Input
										id="password"
										placeholder="••••••••"
										type="password"
										disabled={isDisabled}
										{...register("password", {
											required: "Password is required",
										})}
									/>
								</LabelInputContainer>
								<LabelInputContainer className="mb-4 w-[45%]">
									<Input
										id="phone"
										placeholder="Phone Number"
										type="tel"
										disabled={isDisabled}
										{...register("phoneNumber", {
											required: "Phone Number is required",
										})}
									/>
								</LabelInputContainer>
							</div>
							<div className="flex gap-4 justify-end">
								<CloseIcon text="Cancel" />
								<AcceptIcon
									type="submit"
									text="Save"
									className={
										isDisabled ? "cursor-not-allowed" : "cursor-pointer"
									}
									disabled={isDisabled}
								/>
							</div>
						</form>
					</ModalContent>
				</ModalBody>
			</Modal>
		</div>
	);
};

export default FormModal;
