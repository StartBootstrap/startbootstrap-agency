/* 
 * Leaflet GeoJSON Selector v0.5.4 - 2018-09-28 
 * 
 * Copyright 2018 Stefano Cudini 
 * stefano.cudini@gmail.com 
 * http://labs.easyblog.it/ 
 * 
 * Licensed under the MIT license. 
 * 
 * Demo: 
 * http://labs.easyblog.it/maps/leaflet-geojson-selector/ 
 * 
 * Source: 
 * git@github.com:stefanocudini/leaflet-geojson-selector.git 
 * 
 */
/*
	Name				Data passed			   Description

	Managed Events:
	 selector:change	{selected, layers}     fired after checked item in list, selected is true if any layer is selected

	Public methods:
 	 reload()			{layer}				   load or reload a geojson layer

*/
(function (factory) {
    if(typeof define === 'function' && define.amd) {
    //AMD
        define(['leaflet'], factory);
    } else if(typeof module !== 'undefined') {
    // Node/CommonJS
        module.exports = factory(require('leaflet'));
    } else {
    // Browser globals
        if(typeof window.L === 'undefined')
            throw 'Leaflet must be loaded first';
        factory(window.L);
    }
})(function (L) {

L.Control.GeoJSONSelector = L.Control.extend({

	includes: L.version[0]==='1' ? L.Evented.prototype : L.Mixin.Events,

	options: {
		position: 'bottomleft',			//position of panel list
		
		listLabel: 'properties.name',	//GeoJSON property to generate items list
		listSortBy: null,				//GeoJSON property to sort items list, default listLabel
		listItemBuild: null,			//function list item builder
		
		activeListFromLayer: true,		//highlight of list item on layer hover
		activeLayerFromList: true,		//highlight of layer on list item hover
		zoomToLayer: false,
		
		listOnlyVisibleLayers: false,	//show list of item of layers visible in map canvas

		multiple: false,				//active multiple selection
		//TODO

		style: {
			color:'#00f',
			fillColor:'#08f',
			fillOpacity: 0.4,
			opacity: 1,
			weight: 1
		},
		activeClass: 'active',			//css class name for active list items
		activeStyle: {					//style for Active GeoJSON feature
			color:'#00f',
			fillColor:'#fc0',
			fillOpacity: 0.6,
			opacity: 1,
			weight: 1
		},
		selectClass: 'selected',
		selectStyle: {
			color:'#00f',
			fillColor:'#f80',
			fillOpacity: 0.8,
			opacity: 1,
			weight: 1
		}
	},

	initialize: function(layer, options) {
		var opt = L.Util.setOptions(this, options || {});

		this.options.listSortBy = this.options.listSortBy || this.options.listLabel;

		if(this.options.listItemBuild)
			this._itemBuild = this.options.listItemBuild;

		this._layer = layer;
	},

	onAdd: function (map) {

		var self = this;

		this._container = L.DomUtil.create('div', 'geojson-list');

		this._baseName = 'geojson-list';

		this._map = map;

		this._id = this._baseName + L.stamp(this._container);

		this._list = L.DomUtil.create('ul', 'geojson-list-group', this._container);

		if(this._layer)
			this._map.addLayer(this._layer);

		this._items = [];

		L.DomEvent
		.disableClickPropagation(this._container) 
		.disableScrollPropagation(this._container);

		if(this.options.listOnlyVisibleLayers)
			map.on('moveend', this._updateVisible, this);

		var s = map.getSize();	
		self._container.style.height = (s.y)+'px';
		self._container.style.maxWidth = (s.x/2)+'px';

		self._update();
		
		return this._container;
	},
	
	onRemove: function(map) {

		map.off('moveend', this._updateVisible, this);

		this._layer.remove();
	},

	reload: function(layer) {

		if(this._map) {

			if(this._layer)
				this._map.removeLayer(this._layer);

			this._map.addLayer(layer);
		
			this._layer = layer;

			this._update();
		}

		return this;
	},

	_getPath: function(obj, prop) {
		var parts = prop.split('.'),
			last = parts.pop(),
			len = parts.length,
			cur = parts[0],
			i = 1;

		if(len > 0)
			while((obj = obj[cur]) && i < len)
				cur = parts[i++];

		if(obj)
			return obj[last];
	},

	_itemBuild: function(layer) {

		return this._getPath(layer.feature, this.options.listLabel) || '&nbsp;';
	},

	_selectItem: function(item, selected) {

		for (var i = 0; i < this._items.length; i++){
			delete this._items[i].selected;
			L.DomUtil.removeClass(this._items[i], this.options.selectClass);
		}

		if(selected){
			item.selected = selected;
			L.DomUtil.addClass(item, this.options.selectClass );
		}
	},

	_selectLayer: function(layer, selected) {

		for(var i = 0; i < this._items.length; i++)
			if(this._items[i].layer.setStyle)
				this._items[i].layer.setStyle( this.options.style );
		
		if(selected && layer.setStyle)
			layer.setStyle( this.options.selectStyle );
	},	

	_createItem: function(layer) {

		var self = this,
			item = L.DomUtil.create('li','geojson-list-item'),
			label = document.createElement('label'),
			inputType = this.options.multiple ? 'checkbox' : 'radio',
			input = this._createInputElement(inputType, this._id, false),
			html = this._itemBuild.call(this, layer);

		label.innerHTML = html;
		label.insertBefore(input, label.firstChild);
		item.appendChild(label);

		//JOIN list and layers
		item.layer = layer;
		layer.itemList = item;
		layer.itemLabel = label;

		L.DomEvent
			//.disableClickPropagation(item)
			.on(label, 'click', L.DomEvent.stop, this)
			.on(label, 'click', function(e) {

				if(self.options.zoomToLayer) {
					self._moveTo(layer);
				}

				//TODO move in _moveTo callback
				input.checked = !input.checked;

				self._selectItem(item, input.checked);
				self._selectLayer(layer, input.checked);		

				self.fire('selector:change', {
					selected: input.checked,
					layers: [layer]
				});

			}, this);

		L.DomEvent
			.on(item, 'mouseover', function(e) {
				
				L.DomUtil.addClass(e.target, this.options.activeClass);

				for (var i = 0; i < self._items.length; i++)
					if(!self._items[i])
						self._items[i].layer.setStyle( self.options.activeStyle );
				
				if(self.options.activeLayerFromList)
					item.layer.fire('mouseover');

			}, this)
			.on(item, 'mouseout', function(e) {

				L.DomUtil.removeClass(e.target, self.options.activeClass);

				for (var i = 0; i < self._items.length; i++)
					if(!self._items[i])
						self._items[i].layer.setStyle( self.options.style );

				if(self.options.activeLayerFromList)
					item.layer.fire('mouseout');

			}, this);

		this._items.push( item );

		return item;
	},

	// IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see http://bit.ly/PqYLBe)
	_createInputElement: function (type, name, checked) {

		var radioHtml = '<input type="'+type+'" name="' + name + '"';
		if (checked)
			radioHtml += ' checked="checked"';
		radioHtml += '/>';

		var radioFragment = document.createElement('div');
		radioFragment.innerHTML = radioHtml;

		return radioFragment.firstChild;
	},

	_update: function() {
	
		var self = this,
			layers = [];

		if(!this._layer) return;

		//this._list.style.minWidth = '';
		this._list.innerHTML = '';
		this._layer.eachLayer(function(layer) {

			layers.push( layer );

			if(layer.setStyle)
				layer.setStyle( self.options.style );

			layer
			.on('click', L.DomEvent.stop)
			.on('click', function(e) {
				e.target.itemLabel.click();
			})
			.on('mouseover', function(e) {
				if(e.target.setStyle)
					e.target.setStyle( self.options.activeStyle );
				
				if(self.options.activeListFromLayer)
					L.DomUtil.addClass(e.target.itemList, self.options.activeClass);
			})
			.on('mouseout', function(e) {
				if(e.target.setStyle)
					e.target.setStyle(e.target.itemList.selected ? self.options.selectStyle : self.options.style );
				
				if(self.options.activeListFromLayer)
					L.DomUtil.removeClass(e.target.itemList, self.options.activeClass);
			});
			
		});

		if(this.options.listSortBy) {
			layers.sort(function(a, b) {
				var sortProp = self.options.listSortBy,
					ap = self._getPath(a.feature, sortProp),
					bp = self._getPath(b.feature, sortProp);

				if(ap < bp)
					return -1;
				if(ap > bp)
					return 1;
				return 0;
			});
		}

		for(var i=0; i<layers.length; i++) {
			self._list.appendChild( self._createItem( layers[i] ) );
		}

		this._map.addLayer(this._layer);

		if(this._layer.getBounds) {
		
			setTimeout(function() {

				self._moveTo(self._layer);

			}, 50);
		}
	},

	_updateVisible: function() {

		var self = this,
			bb = self._map.getBounds(),
			visible;
	
		if(!this._layer) return;

		this._layer.eachLayer(function(layer) {

			if(layer.getBounds)
				visible = bb.intersects( layer.getBounds() );
			else if(layer.getLatLng)
				visible = bb.contains( layer.getLatLng() );

			if(layer.itemList)
				layer.itemList.style.display = visible ? 'block':'none';
		});
	},

    _moveTo: function(layer) {

    	var self = this;

    	var pos = this.options.position,
    		psize = L.point(
				this._container.clientWidth,
				this._container.clientHeight
			),
			fitOpts = {
				paddingTopLeft: null,
				paddingBottomRight: null
			};

		if (pos.indexOf('right') !== -1) {
			fitOpts.paddingBottomRight = L.point(psize.x, 0);
		}
		else if (pos.indexOf('left') !== -1) {
			fitOpts.paddingTopLeft = L.point(psize.x, 0);
		}

 		if(layer.getBounds) {
 			var bb = layer.getBounds();
 			if(bb.isValid()) {
				self._map.fitBounds(bb, fitOpts);
				//self._map.setMaxBounds(bb.pad(2))
 			}
		}
		else if(layer.getLatLng) {
			self._map.setView(layer.getLatLng(), fitOpts);
		}
    }
});

L.control.geoJsonSelector = function (layer, options) {
    return new L.Control.GeoJSONSelector(layer, options);
};

return L.Control.GeoJSONSelector;

});
