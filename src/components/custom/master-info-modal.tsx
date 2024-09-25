import { IconInfoCircle } from "@tabler/icons-react";
import {
	CloseIcon,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalProvider,
	ModalTrigger,
} from "@/components/ui/animated-modal";
import { useQuery } from "@tanstack/react-query";
import instance from "@/server/config";
import { StadiumFeaturesType } from "@/constants/types";
import StadiumCard from "./stadium-card";
import { BackgroundGradient } from "../ui/background-gradient";

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

	return (
		<ModalProvider>
			<div className="flex items-center justify-center">
				<Modal>
					<ModalTrigger className="bg-blue-600 dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
						<span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
							Info
						</span>
						<div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
							<IconInfoCircle color="white" />
						</div>
					</ModalTrigger>

					<ModalBody className="max-w-fit">
						<ModalContent>
							{isLoading ? (
								<p className="text-center text-neutral-600 dark:text-neutral-100">
									Loading...
								</p>
							) : stadiumFeatures.data ? (
								<div className="flex justify-between max-w-[900px] gap-4">
									{stadiumFeatures.data.map((item: StadiumFeaturesType) => (
										<BackgroundGradient
											key={item.id}
											className={`rounded-sm min-h-[300px] max-h-[400px] h-[400px] max-w-md  bg-gray-200`}>
											<StadiumCard stadium={item} />
										</BackgroundGradient>
									))}
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
