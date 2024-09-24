import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Custom icon configuration
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
		map.setView(center);
	}, [center, map]);
	return null;
};

const MapComponent = ({
	data,
	location,
}: {
	data: StadType[] | [];
	location: LocationType;
}) => {
	const center: [number, number] = [location?.latitude, location?.longitude];

	return (
		<MapContainer
			center={center}
			zoom={10}
			style={{ height: "100%", width: "100%" }}
			key={`${center[0]}-${center[1]}`}>
			<ChangeView center={center} />
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			{data?.map((marker, index) => (
				<Marker
					key={index}
					position={[marker.lat, marker.lang]}>
					<Popup className="w-[200px]">{marker.stadiumName}</Popup>
				</Marker>
			))}
			<Marker position={center}>
				<Popup>You</Popup>
			</Marker>
		</MapContainer>
	);
};

export default MapComponent;
