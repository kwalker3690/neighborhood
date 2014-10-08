var NeighborhoodView = Backbone.View.extend ({

    initialize: function() {
        this.model.on("change:neighborhood", this.render, this)
    },

    template : _.template('<div class="neighborhood-name"><p>You are in</p><div><%= neighborhoodName %></div></div>'),

    render: function() {
        this.el.innerHTML = this.template({
            neighborhoodName : this.model.get('neighborhood')
        })

        this.el.style.backgroundColor = this.randomRGB()
    },

    randomRGB : function() {
        var randomRed = Math.round(Math.random() * 255);
        var randomGreen = Math.round(Math.random() * 255);
        var randomBlue = Math.round(Math.random() * 255);

        return 'rgb(' + randomRed + ',' + randomGreen + ',' + randomBlue + ')';
    }
})
