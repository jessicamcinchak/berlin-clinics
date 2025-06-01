import Feature from 'ol/Feature';
import { Geometry, Point } from 'ol/geom';
import Select from 'ol/interaction/Select';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import 'ol/ol.css';
import { fromLonLat, transformExtent } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Circle, Fill, Stroke } from 'ol/style';
import Style from 'ol/style/Style';
import View from 'ol/View';
import { useEffect, useRef, useState, type Ref } from "react";

import { PRIMARY, SECONDARY } from '../styles';
import Record from './Record';

const ClinicsMap = ({ data }: any) => {
  const mapRef = useRef(undefined);

  const [selectedFeature, setSelectedFeature] = useState<Feature<Geometry> | undefined>();

  useEffect(() => {
    const vectorSource = new VectorSource({});
    const features: Feature<Geometry>[] = [];

    data.forEach((d: any) => {
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
            // tags: d.Tags,
            about: d.About,
            cost: d.Cost,
            appointment: d["How to get the appointment"],
            languages: d.Languages,
            phone: d["Phone Number"],
            bitly: d.Website,
            website: d["Website FULL"],
            address: d.Address,
            reports: d["Website Reports Link"],
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
          fill: new Fill({ color: SECONDARY }),
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
      target: mapRef.current,
      view: new View({
        center: fromLonLat([13.405, 52.52]), // Berlin
        extent: transformExtent([13.09, 52.33, 13.74, 52.68], 'EPSG:4326', 'EPSG:3857'), // Restrict panning to bbox
        zoom: 12,
        minZoom: 11,
      }),
    });

    const select = new Select();
    map.addInteraction(select);

    const selectFeatureStyle = function () {
      return [
        new Style({
          image: new Circle({
            radius: 12,
            fill: new Fill({ color: SECONDARY }),
            stroke: new Stroke({
              color: PRIMARY, // add a highlight on select
              width: 5,
            }),
          }),
        })
      ];
    };

    select.on('select', function (evt) {
      const selected = evt.selected;
      const deselected = evt.deselected;

      selected.forEach(function (feature) {
        feature.setStyle(selectFeatureStyle);
        setSelectedFeature(feature);
      });

      deselected.forEach(function (feature) {
        feature.setStyle(undefined);
      });
    });

    const handleResize = () => setTimeout(() => map.updateSize(), 100);

    window.addEventListener('resize', handleResize);

    return () => {
      map.setTarget(undefined);
      window.removeEventListener('resize', handleResize);
    }
  }, [data]);

  return (
    <div className="container">
      <div
        ref={mapRef as unknown as Ref<HTMLDivElement>}
        className="map"
      >
      </div>
      <div className="info-panel">
        <h2><em>Doctors and clinics</em></h2>
        <p>Click on the map to learn more about each clinic offering care for FLINTA* people in Berlin.</p>
        {selectedFeature && <Record data={selectedFeature.getProperties()} />}
      </div>
    </div>
  );
}

export default ClinicsMap;
