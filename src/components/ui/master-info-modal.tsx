import { IconInfoCircle } from "@tabler/icons-react";
import {
	CloseIcon,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalProvider,
	ModalTrigger,
} from "./animated-modal";
import { useQuery } from "@tanstack/react-query";
import instance from "../../server";

const MasterInfoModal = ({ id }: { id: string }) => {
	const {
		data: stadiumFeatures,
		isLoading,
		error,
	} = useQuery({
		queryKey: [`${id}`],
		queryFn: async () => {
			const response = await instance.get(`stadium/list/for/admin/${id}`);
			return response.data;
		},
	});

	console.log(isLoading ? "loading" : stadiumFeatures);

	return (
		<ModalProvider>
			<div className="flex items-center justify-center">
				<Modal>
					<ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
						<span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
							Info
						</span>
						<div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
							<IconInfoCircle color="blue" />
						</div>
					</ModalTrigger>

					<ModalBody>
						<ModalContent>
							{isLoading ? (
								<p className="text-center text-neutral-600 dark:text-neutral-100">
									Loading...
								</p>
							) : stadiumFeatures.data ? (
								<div>
									<h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
										{stadiumFeatures.data[0].price}
									</h4>
								</div>
							) : stadiumFeatures.error ? (
								<p className="text-center text-red-500">
									{(stadiumFeatures.error as Error).message}
								</p>
							) : error ? (
								<p className="text-center text-red-500">
									{(error as Error).message || "Network error"}
								</p>
							) : (
								<p className="text-center text-red-500">No data available</p>
							)}
						</ModalContent>
						<ModalFooter className="gap-4">
							<CloseIcon text="Back" />
						</ModalFooter>
					</ModalBody>
				</Modal>
			</div>
		</ModalProvider>
	);
};

export default MasterInfoModal;
