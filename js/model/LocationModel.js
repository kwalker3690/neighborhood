var LocationModel = Backbone.Model.extend({

    fetchSuccessCallback_ : null,
    fetchErrorCallback_ : null,

    defaults : {
        latitude: null,
        longitude: null,
        neighborhood: null
    },

    initialize : function(){
        this.on("geolocationSuccess", this.fetchNeighborhood_, this);
    },

    neighborhoodAPIKey_ : "b22b661866f8172ab5d25774ceb1ca07",

    geolocationSuccess_ : function(position) {
        this.set("latitude", position.coords.latitude);
        this.set("longitude", position.coords.longitude);

        this.trigger("geolocationSuccess");
    },

    geolocationError_ : function() {
        if(this.fetchErrorCallback_) {
            this.fetchErrorCallback_();
        }
    },

    getNeighborhoodURL_ : function(){
        var neighborhoodURL = "http://query.mapfluence.com/2.0/";

        neighborhoodURL += this.neighborhoodAPIKey_;

        neighborhoodURL += "/query.json?from=neighborhoods&select=name&where=intersects(%7B'type'%3A'Point'%2C'coordinates'%3A%5B";

        neighborhoodURL += this.get("longitude");

        neighborhoodURL += "%2C";

        neighborhoodURL += this.get("latitude");
        neighborhoodURL += "%5D%7D)&order_by=-umi.neighborhoods.attributes.loc_relvnc&limit=1";

        return neighborhoodURL;
    },

    fetchNeighborhood_ : function(){
        jQuery.ajax(this.getNeighborhoodURL_(), {
            success : function(data, textStatus) {
                this.set("neighborhood", data.features[0].properties.name);
                
                if(this.fetchSuccessCallback_) {
                    this.fetchSuccessCallback_();
                }
            }.bind(this),

            error : function(jqHXR, textStatus, errorThrown) {
                if(this.fetchErrorCallback_) {
                    this.fetchErrorCallback_();
                }
            }.bind(this)
        })
    },

    // used to initialize the model - but use this for connecting to outside data
    fetch : function(options){
        navigator.geolocation.getCurrentPosition(this.geolocationSuccess_.bind(this), this.geolocationError_.bind(this), {
            enableHighAccuracy : true,
            timeout : 5000,
        });

        if(options) {
            this.fetchSuccessCallback_ = options.success;
            this.fetchErrorCallback_ = options.error;
        }
    }
})