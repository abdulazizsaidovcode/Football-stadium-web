import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	LayerGroup,
	Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import instance from "@/server/config";
import StadiumCard from "@/components/custom/stadium-card";

const DefaultIcon = L.icon({
	iconRetinaUrl:
		"https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
	iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
	shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface StadType {
	lang: number;
	lat: number;
	stadiumId: string;
	stadiumName: string;
}

interface LocationType {
	latitude: number;
	longitude: number;
}

const ChangeView = ({ center }: { center: [number, number] }) => {
	const map = useMap();
	useEffect(() => {
		if (center) {
			map.setView(center);
		}
	}, [center, map]);
	return null;
};

const MapComponent = ({
	data,
	km,
	location,
}: {
	km: number;
	data: StadType[] | [];
	location: LocationType;
}) => {
	const center: [number, number] =
		location?.latitude && location?.longitude
			? [location.latitude, location.longitude]
			: [51.505, -0.09];
	const fillBlueOptions = { fillColor: "blue" };

	const [id, setId] = useState("98bd6ca9-ec5e-465d-8a92-4894f421beb7");

	const { data: stadiumOne, isLoading: stadiumOneLoading } = useQuery({
		queryKey: ["stadim/one", id],
		queryFn: async () => {
			const response = await instance.get(`stadium/one/${id}`);
			return response.data.data;
		},
	});

	return (
		<>
			<MapContainer
				className="z-50 absolute"
				center={center}
				zoom={13} // Adjusted zoom level
				style={{ height: "100%", width: "100%" }}>
				<ChangeView center={center} />
				<LayerGroup>
					<Circle
						center={center}
						pathOptions={fillBlueOptions}
						radius={km * 1000}
					/>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					{data?.map((marker) => (
						<div key={marker.stadiumId}>
							<Marker
								eventHandlers={{
									click: () => {
										setId(marker.stadiumId);
									},
								}}
								position={[marker.lat, marker.lang]}>
								<Popup>
									{stadiumOneLoading ? (
										"Loading"
									) : (
										<StadiumCard
											className="h-[200px] md:w-full w-[250px] p-0 overflow-y-scroll no-visible-scrollbar"
											stadium={stadiumOne}
										/>
									)}
								</Popup>
							</Marker>
						</div>
					))}
				</LayerGroup>
				<Marker position={center}>
					<Popup>
						<div className="text-red-600 text-2xl font-bold">You</div>
					</Popup>
				</Marker>
			</MapContainer>
		</>
	);
};

export default MapComponent;
