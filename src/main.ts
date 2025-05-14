import Airtable from 'airtable';
import Feature from 'ol/Feature';
import { Geometry, Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Circle, Fill, Stroke } from 'ol/style';
import Style from 'ol/style/Style';
import View from 'ol/View';
import './style.css';

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: import.meta.env.VITE_AIRTABLE_PAT,
});

const base = Airtable.base('appC6yPBtEwltJNG6');

const data: any[] = [];

base('Clinics & Doctors').select({
  maxRecords: 100,
  view: "Public View"
}).eachPage(function page(records, fetchNextPage) {
  records.forEach(function (record) {
    data.push(record.fields);
  });
  fetchNextPage();
}, function done(err) {
  if (err) {
    console.error(err);
    return;
  }
  renderMap(data);
});

function renderMap(data: any[]) {
  const vectorSource = new VectorSource({});
  const features: Feature<Geometry>[] = [];

  data.forEach((d) => {
    if (d.Coordinates) {
      features.push(
        new Feature({
          geometry: new Point(
            fromLonLat([
              Number(d.Coordinates.split(", ")[1]),
              Number(d.Coordinates.split(", ")[0]),
            ]),
          ),
          name: d.Name,
          tags: d.Tags,
          about: d.About,
          cost: d.Cost,
          appointment: d["How to get the appointment"],
          languages: d.Languages,
          phone: d["Phone Number"],
          bitly: d.Website,
          website: d["Website FULL"],
          address: d.Address,
          kiez: d.Neighborhood,
        }),
      );
    }
  });
  vectorSource.addFeatures(features);

  const clinicsLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({
      image: new Circle({
        radius: 10,
        fill: new Fill({ color: "#0059ff" }),
        stroke: new Stroke({
          color: "#fff",
          width: 2,
        }),
      }),
    }),
  });

  let map = new Map({
    layers: [
      new TileLayer({
        source: new OSM({}),
      }),
      clinicsLayer,
    ],
    target: "map",
    view: new View({
      center: fromLonLat([13.405, 52.52]), // Berlin
      zoom: 12
    }),
  });

  let selected: any = null; // TODO any > FeatureLike | null ? 

  map.on("singleclick", function (e) {
    if (selected !== null) {
      // selected.setStyle(undefined);
      selected = null;
    }

    map.forEachFeatureAtPixel(e.pixel, function (f) {
      selected = f;
      // selectStyle.getFill().setColor(f.get('COLOR') || '#eeeeee');
      // f.setStyle(selectStyle);
      return true;
    });

    if (selected) {
      document.getElementById("selected-feature")!.style = "visibility:visible;";
      document.getElementById("name")!.innerHTML = selected.get("name");
      // document.getElementById("description")!.innerHTML = selected.get("about");
      // document.getElementById("cost")!.innerHTML = selected.get("cost");
      // document.getElementById("appointment")!.innerHTML = selected.get("appointment");
      // document.getElementById("languages")!.innerHTML = selected.get("languages");
      // document.getElementById("phone")!.innerHTML = selected.get("phone");
      // document.getElementById("bitly")!.setAttribute("href", selected.get("bitly"));
      // document.getElementById("website")!.innerHTML = selected.get("website");
      // document.getElementById("address")!.innerHTML = selected.get("address");
      // document.getElementById("kiez")!.innerHTML = selected.get("kiez");
    } else {
      document.getElementById("selected-feature")!.style = "visibility:hidden;";
    }
  });

  setTimeout(() => map.updateSize(), 1);
}