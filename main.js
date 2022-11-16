// Bring in required modules from ol package.
import GeoJSON from 'ol/format/GeoJSON';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {Map, View} from 'ol';
import {fromLonLat} from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Link from 'ol/interaction/Link';
import DragAndDrop from 'ol/interaction/DragAndDrop';
import Modify from 'ol/interaction/Modify';
import Draw from 'ol/interaction/Draw';

// Create our map.
const map = new Map({
    target: 'map-container', // Points to our div container.
    layers: [
        // Load map from OpenStreetMaps.
        // new TileLayer({
        //     source: new OSM(),
        // }),
        // Load map from GeoJSON file.
        new VectorLayer({
            source: new VectorSource({
                format: new GeoJSON(),
                url: './data/countries.json',
            }),
        }),
    ],
    view: new View({
        center: fromLonLat([0,0]),
        zoom: 2
    }),
});



// Remember current positon after reloading page.
map.addInteraction(new Link());



// Create empty vector source for drag n drop.
const source = new VectorSource();

// Create new layer for empty source and add to map.
const layer = new VectorLayer({
    source: source,
});
map.addLayer(layer);

// Create new drag n drop interaction.
map.addInteraction(
    new DragAndDrop({
        source: source,
        formatConstructors: [GeoJSON],
    })
);


// Create new modify interaction
map.addInteraction(
    new Modify({
        source: source,
    })
);


// Create new drawing feature
map.addInteraction(
    new Draw({
        type: 'Polygon',
        source: source,
    })
);