import { BsPersonCircle } from "react-icons/bs";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import {
	AcceptIcon,
	CloseIcon,
	Modal,
	ModalBody,
	ModalContent,
	ModalTrigger,
} from "../ui/animated-modal";
import { Input } from "../ui/input";
import { LabelInputContainer } from "../ui/label";
import { useEffect, useState, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../../server/config";
import Cookies from "js-cookie";
import { MeType } from "../../constants/types";

const FormModal = ({ data }: { data: null | MeType | undefined }) => {
	const [visible, setVisible] = useState(true);

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
			password: data?.password || null,
			phoneNumber: data?.phoneNumber || "",
		},
	});

	const resetInputs = useCallback(() => {
		if (data) {
			reset({
				firstName: data.firstName,
				lastName: data.lastName,
				password: data.password,
				phoneNumber: data.phoneNumber,
			});
		}
	}, [data, reset]);

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

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async (formData: Inputs) => {
			const response = await instance.put(`user/update`, formData);
			return response.data;
		},
		onSuccess: (response) => {
			if (response?.auth_token) {
				Cookies.remove("auth_token");
				Cookies.set("auth_token", response.auth_token);
				console.log("Auth token updated:", response.auth_token);
			}
			queryClient.invalidateQueries({ queryKey: ["user/me"] });
		},
		onError: (error) => {
			console.error("Error updating user data:", error);
		},
	});

	const onSubmit: SubmitHandler<Inputs> = (formData) => {
		const updatedUser = {
			firstName: formData.firstName.trim(),
			lastName: formData.lastName.trim(),
			password: formData.password === "" ? null : formData.password,
			phoneNumber: formData.phoneNumber,
		};

		setIsDisabled(true);
		setVisible(true);
		mutation.mutate(updatedUser);
	};

	return (
		<div className="flex w-full items-center gap-2">
			<Modal>
				<ModalTrigger className="w-full gap-2 p-4 hover:bg-gray-400 hover:text-white cursor-pointer rounded-none">
					<div
						onClick={() => {
							setIsDisabled(true);
							resetInputs();
							setVisible(true);  
						}}
						className="w-full flex items-center gap-2">
						<BsPersonCircle />
						Account
					</div>
				</ModalTrigger>
				<ModalBody className="max-w-fit">
					<ModalContent className="cursor-default">
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
								<LabelInputContainer className="mb-4 w-[45%] relative">
									<Input
										id="password"
										placeholder="Want to change ?   Write new password"
										type={visible ? "password" : "text"}
										disabled={isDisabled}
										{...register("password")}
									/>
									{!isDisabled && (
										<div
											className="absolute right-4 -top-1 cursor-pointer max-w-fit p-2"
											onClick={() => {
												setVisible(!visible);
											}}>
											{visible ? (
												<FaRegEyeSlash color="black" />
											) : (
												<FaRegEye color="black" />
											)}
										</div>
									)}
								</LabelInputContainer>
								<LabelInputContainer className="mb-4 w-[45%]">
									<Input
										id="phone"
										pattern="^\+998\d{9}$"
										placeholder="Phone Number"
										type="tel"
										disabled={isDisabled}
										{...register("phoneNumber", {
											required: "Phone number is required",
											pattern: {
												value: /^\+998\d{9}$/,
												message: "Phone number format is invalid",
											},
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
