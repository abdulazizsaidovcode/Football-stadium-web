import { IconInfoCircle } from "@tabler/icons-react";
import { FaCheck } from "react-icons/fa";
import { MdDoNotDisturb } from "react-icons/md";

import {
	CloseIcon,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalProvider,
	ModalTrigger,
} from "../ui/animated-modal";
import { useQuery } from "@tanstack/react-query";
import instance from "../../server/config";
import { BackgroundGradient } from "../ui/background-gradient";
import { StadiumFeaturesType } from "../../constants/types";

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

					<ModalBody className="max-w-fit">
						<ModalContent>
							{isLoading ? (
								<p className="text-center text-neutral-600 dark:text-neutral-100">
									Loading...
								</p>
							) : stadiumFeatures.data ? (
								<div className="flex justify-between max-w-[900px]">
									{stadiumFeatures.data.map((item: StadiumFeaturesType) => (
										<BackgroundGradient className="rounded-[22px] min-h-[300px] max-h-[400px] h-[400px] max-w-md sm:p-10 bg-black">
											<h3 className="text-white">Stadium Name</h3>
											<p className="text-sm text-gray-300  my-4">
												{item.description !== "string" && item.description !== null
													? item.description
													: "No any description"}
											</p>
											<ul className="flex justify-between flex-wrap gap-4">
												<li>
													<b>Narx</b>: {item.price} so'm
												</li>
												<li>
													<b>Boshlang'ich tolov</b>: {item.initialPay} so'm
												</li>
												<li>
													<b>Uzunligi</b>: {item.length} m
												</li>
												<li>
													<b>Kengligi</b>: {item.widhth} m
												</li>
												<li>
													<b>Ochilish vaqti</b>: {item.startHour}
												</li>
												<li>
													<b>Yopilish vaqti</b>: {item.endHour}
												</li>
												<li className="flex items-center gap-2 ">
													<b>Dush :</b>
													{item.shower ? (
														<FaCheck
															fontSize={25}
															color="green"
															fontWeight={"bold"}
														/>
													) : (
														<MdDoNotDisturb
															fontSize={25}
															color="red"
															fontWeight={"bold"}
														/>
													)}
												</li>
												<li className="flex items-center gap-2 ">
													<b>Shopping: </b>
													{item.shopping ? (
														<FaCheck
															fontSize={25}
															color="green"
															fontWeight={"bold"}
														/>
													) : (
														<MdDoNotDisturb
															fontSize={25}
															color="red"
															fontWeight={"bold"}
														/>
													)}
												</li>
												<li className="flex items-center gap-2 ">
													<b>WC:</b>
													{item.toilet ? (
														<FaCheck
															fontSize={25}
															color="green"
															fontWeight={"bold"}
														/>
													) : (
														<MdDoNotDisturb
															fontSize={25}
															color="red"
															fontWeight={"bold"}
														/>
													)}
												</li>
											</ul>
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
