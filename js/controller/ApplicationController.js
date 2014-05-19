var ApplicationController = Backbone.View.extend({
    neighborhoodView_ : null,

    initialize: function() {
        this.model = new LocationModel();
        this.neighborhoodView_ = new NeighborhoodView({
            model: this.model,
            el: document.querySelector('#neighborhood')
        });
        this.mapView_ = new MapView({
            model: this.model,
            el: document.querySelector('#map')
        })

        this.model.fetch();
    }
})