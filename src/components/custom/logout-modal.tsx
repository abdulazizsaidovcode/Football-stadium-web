import {
	AcceptIcon,
	CloseIcon,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalProvider,
	ModalTrigger,
} from "../ui/animated-modal";
import { FiLogOut } from "react-icons/fi";

const LogOutModal = ({ basicFunction }: { basicFunction: () => void }) => {
	return (
		<>
			<ModalProvider>
				<div className="flex w-full items-center gap-2">
					<Modal>
						<ModalTrigger className="w-full gap-2 p-4 hover:bg-gray-400 hover:text-white cursor-pointer rounded-none">
							<div className="w-full flex items-center gap-2">
								<FiLogOut /> Log Out
							</div>
						</ModalTrigger>
						<ModalBody className="max-w-fit">
							<ModalContent>
								<h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
									Are you sure log out ?
								</h4>
							</ModalContent>
							<ModalFooter className="flex items-center gap-2">
								<CloseIcon text="No" />
								<AcceptIcon
									text={"Log Out"}
									accept_function={basicFunction}
								/>
							</ModalFooter>
						</ModalBody>
					</Modal>
				</div>
			</ModalProvider>
		</>
	);
};

export default LogOutModal;
