var MapView = Backbone.View.extend ({
    map_: null,

    events: {
        "onresize" : "test"
    },

    initialize: function(){
        this.map_ = new google.maps.Map(this.el, {
            center: new google.maps.LatLng(0,0),
            zoom: 3
        });

        this.model.on("geolocationSuccess", this.render, this);
        
        window.addEventListener('resize', this.map_.panTo(this.getLatLng_()))

    },

    render: function() {

        this.map_.panTo(this.getLatLng_());
        this.map_.setZoom(15);

        var marker = new google.maps.Marker({
            position: this.getLatLng_(),
            map: this.map_,
            title: "Your location"
        });

    },

    getLatLng_: function() {
        return new google.maps.LatLng(this.model.get('latitude'), this.model.get('longitude'));

    },
})