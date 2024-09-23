"use client";
import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

interface ModalContextType {
	open: boolean;
	setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [open, setOpen] = useState(false);

	return (
		<ModalContext.Provider value={{ open, setOpen }}>
			{children}
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal must be used within a ModalProvider");
	}
	return context;
};

export function Modal({ children }: { children: ReactNode }) {
	return <ModalProvider>{children}</ModalProvider>;
}

export const ModalTrigger = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	const { setOpen } = useModal();
	return (
		<button
			className={cn(
				"px-4 py-2 rounded-md text-black dark:text-white text-center relative overflow-hidden",
				className,
			)}
			onClick={() => {
				setOpen(true);
			}}>
			{children}
		</button>
	);
};

export const ModalBody = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	const { open } = useModal();

	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [open]);

	const modalRef = useRef(null);
	const { setOpen } = useModal();
	useOutsideClick(modalRef, () => setOpen(false));

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
						backdropFilter: "blur(10px)",
					}}
					exit={{
						opacity: 0,
						backdropFilter: "blur(0px)",
					}}
					className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full  flex items-center justify-center z-50">
					<Overlay />

					<motion.div
						ref={modalRef}
						className={cn(
							"min-h-[30%] max-h-[90%] md:min-w-fit bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden",
							className,
						)}
						initial={{
							opacity: 0,
							scale: 0.5,
							rotateX: 40,
							y: 40,
						}}
						animate={{
							opacity: 1,
							scale: 1,
							rotateX: 0,
							y: 0,
						}}
						exit={{
							opacity: 0,
							scale: 0.8,
							rotateX: 10,
						}}
						transition={{
							type: "spring",
							stiffness: 260,
							damping: 15,
						}}>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export const ModalContent = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn("flex flex-col flex-1 p-8 md:p-10", className)}>
			{children}
		</div>
	);
};

export const ModalFooter = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				"flex justify-end p-4 bg-gray-100 dark:bg-neutral-900",
				className,
			)}>
			{children}
		</div>
	);
};

const Overlay = ({ className }: { className?: string }) => {
	return (
		<motion.div
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
				backdropFilter: "blur(10px)",
			}}
			exit={{
				opacity: 0,
				backdropFilter: "blur(0px)",
			}}
			className={`fixed inset-0 h-full w-full bg-black bg-opacity-50 z-50 ${className}`}></motion.div>
	);
};

export const CloseIcon = ({ text, type }: { type?: string; text: string }) => {
	const { setOpen } = useModal();
	return (
		<button
			onClick={() => {
				setOpen(false);
			}}
			className={`px-2 py-1 text-white rounded-md text-sm w-28 ${
				type === "Confirm"
					? "bg-red-600 border border-red-600"
					: "bg-green-600 border border-green-600"
			}`}>
			{text}
		</button>
	);
};
export const AcceptIcon = ({
	text,
	type,
	accept_function,
	disabled,
	className,
}: {
	text: string;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	accept_function?: () => void;
	className?: string;
}) => {
	const { setOpen } = useModal();
	return (
		<button
			onClick={() => {
				setOpen(false);
				if (accept_function) {
					accept_function();
				}
			}}
			disabled={disabled}
			type={type}
			className={`text-white text-sm px-2 py-1 rounded-md ${
				text === "Confirm"
					? " bg-green-600 border border-green-600"
					: "bg-red-600 border border-red-600"
			} w-28  ${className}`}>
			{text}
		</button>
	);
};

export const useOutsideClick = (
	ref: React.RefObject<HTMLDivElement>,
	callback: Function,
) => {
	useEffect(() => {
		const listener = (event: any) => {
			if (!ref.current || ref.current.contains(event.target)) {
				return;
			}
			callback(event);
		};

		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);

		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, callback]);
};
