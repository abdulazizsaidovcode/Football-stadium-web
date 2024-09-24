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
	km,
	location,
}: {
	km: number;
	data: StadType[] | [];
	location: LocationType;
}) => {
	const center: [number, number] = [location?.latitude, location?.longitude];
	const fillBlueOptions = { fillColor: "blue" };

	const handleGetCoordinates = () => {
		alert(`Latitude: ${center[0]}, Longitude: ${center[1]}`);
	};

	return (
		<>
			<MapContainer
				center={center}
				zoom={40}
				style={{ height: "100%", width: "100%" }}>
				<ChangeView center={center} />
				<LayerGroup>
					<Circle
						center={center}
						pathOptions={fillBlueOptions}
						radius={km * 60}
					/>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					{data?.map((marker, index) => (
						<Marker
							key={index}
							position={[marker.lat, marker.lang]}>
							<Popup>{marker.stadiumName}</Popup>
						</Marker>
					))}
				</LayerGroup>
				<Marker position={[location.latitude, location.longitude]}>
					<Popup>You</Popup>
				</Marker>
			</MapContainer>
			<button
				onClick={handleGetCoordinates}
				style={{
					position: "absolute",
					top: "10px",
					left: "10px",
					zIndex: 1000,
				}}>
				Get Coordinates
			</button>
		</>
	);
};

export default MapComponent;
