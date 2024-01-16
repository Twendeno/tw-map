import {tileLayer} from "leaflet";

export class LayerMaps {

  static zoomMax = 20;
  listLayer = [];

  static readonly mainLayer = tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
    attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
    detectRetina: true,
    maxZoom: this.zoomMax
  })

// Openstreetmap Layer
  static readonly streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">openstreetmap</a>',
    maxZoom: this.zoomMax,
    detectRetina: true,
  });


// Openstreetmap Hot
  static readonly openstreetmapHot = tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">openstreetmap</a>',
    detectRetina: true,
  })

// Openstreetmap Osm
  static readonly openstreetmapOsm = tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">openstreetmap</a>',
    detectRetina: true,
  })

  static readonly layer_OpenStreetMap = tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: this.zoomMax,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  );

  static readonly layer_ArcGISStreets = tileLayer(
    "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}/",
    {
      maxZoom: this.zoomMax,
      attribution: "© ArcGIS",
    },
  );

  static readonly layer_ArcGISSatellite = tileLayer(
    "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}/",
    {
      maxZoom: this.zoomMax,
      attribution: "© ArcGIS",
    },
  );

  static readonly layer_ArcGISGray = tileLayer(
    "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}/",
    {
      maxZoom: this.zoomMax,
      attribution: "© ArcGIS",
    },
  );


}

