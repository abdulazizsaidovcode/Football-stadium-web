"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
	words,
	className,
	filter = true,
	duration = 1,
}: {
	words: string;
	className?: string;
	filter?: boolean;
	duration?: number;
}) => {
	const [scope, animate] = useAnimate();
	const wordsArray = words.split(" ");
	useEffect(() => {
		animate(
			"span",
			{
				opacity: 1,
				filter: filter ? "blur(0px)" : "none",
			},
			{
				duration: duration ? duration : 1,
				delay: stagger(0.2),
			},
		);
	}, [scope.current]);

	const renderWords = () => {
		return (
			<motion.div ref={scope}>
				{wordsArray.map((word, idx) => {
					return (
						<motion.span
							key={word + idx}
							className="dark:text-white text-black opacity-0"
							style={{
								filter: filter ? "blur(10px)" : "none",
							}}>
							{word}{" "}
						</motion.span>
					);
				})}
			</motion.div>
		);
	};

	return (
		<div className={cn("font-normal", className)}>
			<div className="mt-4">
				<div className=" dark:text-white text-black text-[1.5vw] max-800:text-[3vw] leading-snug tracking-wide">
					{renderWords()}
				</div>
			</div>
		</div>
	);
};
