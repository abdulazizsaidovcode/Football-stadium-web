interface MasterType {
	firstName: string;
	id: string;
	lastName: string;
	password: string | null;
	phoneNumber: string;
	role: string;
	userStatus: string;
}

interface KeysType {
	key: string;
	title: string;
}

const Table = ({ data, keys }: { data: MasterType[]; keys: KeysType[] }) => {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full bg-white border rounded-lg">
				<thead className="bg-gray-100 border-b">
					<tr>
						{keys.map((key) => (
							<th
								key={key.key}
								className="text-left py-3 px-6 font-medium text-gray-900">
								{key.title}
							</th>
						))}
						<th className="text-left py-3 px-6 font-medium text-gray-900">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => (
						<tr
							key={item.id}
							className="border-b">
							{keys.map((key) => (
								<td
									key={key.key}
									className="py-4 px-6 text-gray-700">
									{item[key.key as keyof MasterType] ?? "N/A"}
								</td>
							))}
							<td className="py-4 px-6">
								<span className="text-blue-600 cursor-pointer mr-4">Edit</span>
								<span className="text-red-600 cursor-pointer">Delete</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
