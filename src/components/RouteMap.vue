<template>
    <l-map :zoom="zoom" :center="center" style="height: 100%; width: 100%;">
        <l-tile-layer :url="tileUrl" />
        <l-polyline v-if="routeCoordinates.length" :lat-lngs="routeCoordinates" color="blue" />
        <l-marker v-if="startPoint" :lat-lng="startPoint" :icon="startIcon">
            <l-popup>{{ loadingSpots[0]?.address || 'Start Point' }}</l-popup>
        </l-marker>
        <l-marker v-for="(spot, index) in amongSideSpots" :key="index" :lat-lng="spot" :icon="intermediateIcon">
            <l-popup>{{ getAddressFromCoordinates(spot) }}</l-popup>
        </l-marker>
        <l-marker v-if="endPoint" :lat-lng="endPoint" :icon="endIcon">
            <l-popup>{{ unloadingSpots[unloadingSpots.length - 1]?.address || 'End Point' }}</l-popup>
        </l-marker>
    </l-map>
</template>

<script>
import { LMap, LTileLayer, LPolyline, LMarker, LPopup } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import startIconImg from '@/assets/pin1.svg';
import endIconImg from '@/assets/pin2.svg';
import intermediateIconImg from '@/assets/pin.svg';

export default {
    components: {
        LMap,
        LTileLayer,
        LPolyline,
        LMarker,
        LPopup,
    },
    props: {
        routeCoordinates: {
            type: Array,
            required: true,
        },
        loadingSpots: {
            type: Array,
            required: true,
        },
        unloadingSpots: {
            type: Array,
            required: true,
        },
        center: {
            type: Array,
            default: () => [52.5200066, 13.404954], // Default to Berlin coordinates
        },
    },
    data() {
        return {
            zoom: 5,
            tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            startIcon: this.createIcon(startIconImg),
            endIcon: this.createIcon(endIconImg),
            intermediateIcon: this.createIcon(intermediateIconImg),
        };
    },
    methods: {
        createIcon(iconUrl) {
            return new L.Icon({
                iconUrl: iconUrl,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowUrl: null,
                iconRetinaUrl: iconUrl,
            });
        },
        getAddressFromCoordinates(coordinates) {
            const spot = this.loadingSpots.concat(this.unloadingSpots).find(spot => {
                const spotCoords = spot.coordinates;
                return spotCoords[0] === coordinates[0] && spotCoords[1] === coordinates[1];
            });
            return spot ? spot.address : 'Unknown Location';
        },
    },
    computed: {
        startPoint() {
            const start = this.loadingSpots[0]?.coordinates;
            return start && start[0] && start[1] ? start : null;
        },
        endPoint() {
            const end = this.unloadingSpots[this.unloadingSpots.length - 1]?.coordinates;
            return end && end[0] && end[1] ? end : null;
        },
        amongSideSpots() {
            const amongSideLoadSpots = this.loadingSpots.slice(1)
                .map(spot => spot.coordinates)
                .filter(coord => coord && coord[0] && coord[1]);

            const amongSideUnloadSpots = this.unloadingSpots.slice(0, -1)
                .map(spot => spot.coordinates)
                .filter(coord => coord && coord[0] && coord[1]);

            return [...amongSideLoadSpots, ...amongSideUnloadSpots];
        },
    },
};
</script>

<style scoped>

</style>