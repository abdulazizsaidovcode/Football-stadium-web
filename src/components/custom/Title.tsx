import { ClassNameType } from "../../data/types";

const Title = ({
	text,
	className,
}: {
	text: string;
	className?: ClassNameType;
}) => {
	return (
		<h1
			className={`font-bold text-[4vw] max-800:text-[6vw] transition  hover:-translate-y-4 ${className}`}>
			{text}
		</h1>
	);
};

export default Title;
