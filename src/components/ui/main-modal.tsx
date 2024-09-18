import { IconTrash, IconUserCancel, IconUserCheck } from "@tabler/icons-react";
import {
	AcceptIcon,
	CloseIcon,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalProvider,
	ModalTrigger,
} from "./animated-modal";

interface MainModalProps {
	text: string;
	basicFunction: () => void;
	question: string;
}

export function MainModal({ text, basicFunction, question }: MainModalProps) {
	return (
		<ModalProvider>
			<div className="flex items-center justify-center">
				<Modal>
					<ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
						<span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
							{text}
						</span>
						<div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
							{text === "Delete" ? (
								<IconTrash color="red" />
							) : text === "Reject" ? (
								<IconUserCancel color="red" />
							) : (
								<IconUserCheck color="green"/>
							)}
						</div>
					</ModalTrigger>
					<ModalBody>
						<ModalContent>
							<h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
								{question}
							</h4>
						</ModalContent>
						<ModalFooter className="gap-4">
							<CloseIcon text="No" />
							<AcceptIcon
								text={text}
								accept_function={basicFunction}
							/>
						</ModalFooter>
					</ModalBody>
				</Modal>
			</div>
		</ModalProvider>
	);
}
