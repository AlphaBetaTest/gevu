var w = 800,
    h = 450,
    r = Math.min(w, h) / 2,

var vis = d3.select("#chart").append("svg")
    .attr("width", w)
    .attr("height", h)
  .append("g")
    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

var partition = d3.layout.partition()
    .sort(null)
    .size([2 * Math.PI, r * r])
    .value(function(d) { return 1; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx; })
    .innerRadius(function(d) { return Math.sqrt(d.y); })
    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

d3.json(urlJson, function(json) {
		
		var arrA = json.children;
		z = [];
		for(var i=0; i < arrA.length; i++){
			z[arrA[i].ref]=d3.scale.log().domain([arrA[i].min, arrA[i].nb]).range(colors[arrA[i].ref]);
		}		
		var nodes = partition.nodes(json);
		
  var path = vis.data([json]).selectAll("path")
      .data(partition.nodes)
    .enter().append("path")
      .attr("display", function(d) { return d.depth ? null : "blue"; }) // hide inner ring
      .attr("d", arc)
      .attr("fill-rule", "evenodd")
      .style("stroke", "#fff")
	  .on("click", click)
	  .attr("id", function(d, i) { 
		 return "path-" + i; 
		  })
      .style("fill", function(d) {
	  return var i = (d.children ? d : d.parent);
		    	  if(i.ref){
		    		  var color = z[i.ref]; 
		    		  return color(i.nb);		    		  
		    	  }else 
		    		  return "white";
		    	  }) //si d.children renvoit trop alors d, sinon d.parent. fill ds sp�cification du svg = remplissage.
		      ;
    //  .each(stash);

  var titre = path.append("svg:title")
  .text(function(d) { 
  	return d.name + " : " + d.value; 
  });

  d3.select("#size").on("click", function() {
    path
        .data(partition.value(function(d) { return d.size; }))
      .transition()
        .duration(1500)
        .attrTween("d", arcTween);

		 titre.text(function(d) { 
    	return d.name + " : " + d.value; 
    });

    d3.select("#size").classed("active", true);
    d3.select("#count").classed("active", false);
  });

  d3.select("#count").on("click", function() {
    path
        .data(partition.value(function(d) { return 1; }))
      .transition()
        .duration(1500)
        .attrTween("d", arcTween);
		
	/*					var arrA = json.children;
		z = [];
		for(var i=0; i < arrA.length; i++){
			z[arrA[i].ref]=d3.scale.log().domain([arrA[i].min, arrA[i].nb]).range(colors[arrA[i].ref]);
		}		
		var nodes = partition.nodes(json); */
		
				    titre.text(function(d) { 
    	return d.name + " : " + d.value; 
    });
	


    d3.select("#size").classed("active", false);
    d3.select("#count").classed("active", true);
  });
});

/* function getLegende(){
			
	var dataCircle = {"id":"0","name":"Alc\u00e9ane","children":[{"id":"1","name":"Antenne","nb":1,"children":[{"id":"2","name":"Groupe","nb":1,"children":[{"id":"3","name":"Batiment","nb":1,"children":[{"id":"4","name":"Type logement","nb":"1"}]}]}],"max":"1","min":"1"}],"nb":1};
	var dataTexte = [{"id":"0","name":"Alc\u00e9ane"},{"id":"1","name":"Antennes"},{"id":"2","name":"Groupes"},{"id":"3","name":"B�timents"},{"id":"4","name":"Type logement"}];
	var dataCarre = [1,33,66,100];
	var dataAntenne = [{"id":"1","ref":"BL","name":"Antenne - BL","value":dataCarre},{"id":"2","ref":"CA","name":"Antenne - CA","value":dataCarre},{"id":"3","ref":"CV","name":"Antenne - CV","value":dataCarre},{"id":"4","ref":"MR","name":"Antenne - MR","value":dataCarre},{"id":"5","ref":"QS","name":"Antenne - QS","value":dataCarre}];
	
	z = [];
	for(var i=0; i < dataAntenne.length; i++){
		z[dataAntenne[i].ref]=d3.scale.log().domain([1, 100]).range(colors[dataAntenne[i].ref]);
	}		
	
	var antenneLeg = visLeg.selectAll("text").data(dataAntenne).enter()
	.append("text")
	   .attr("transform", "translate(0,-300)")
       .attr("class", "txtLeg")
       .attr("font-size", "30")
       .attr("font-weight", "bold")
       .attr("fill", function(d) { 
    	   return colors[d.ref][1]; 
    	   })
       .attr("x", "320")
       .attr("y", function(d) { 
    	   return 100*d.id; 
	   })
       .text(function(d) { 
    	   return d.name; 
	   });

	var wh = 30, ec=10; 
	var carreLeg = visLeg.selectAll(".carrLeg").data(dataAntenne).enter()
		.append("g")
			.attr("class","carrLeg")
			.attr("transform", function(d,i) { 
				return "translate(0,"+100*i+")"; 
			   })
			.attr("id", function(d) { 
		    	   return d.ref; 
			   })
			.selectAll("rect").data(dataCarre).enter()
			.append("rect")	
		       .attr("width", wh)
		       .attr("height", wh+30)
		       .attr("fill", function(d) {
		    	   var ref = d3.select(this);
		    	   ref = ref[0][0].parentNode.id;
		    	   return z[ref](d); 
		    	   })
		       .attr("y", "60")
		       .attr("x", function(d, i) { 
		    	   return (wh+ec)*i; 
			   })
			  .attr("transform", "translate(320,-250)");
	
	var pathLeg = visLeg.data([dataCircle]).selectAll("path") 
	      .data(partition.nodes) 
	    .enter().append("path") 
	      .attr("display", function(d) { return d.depth ? null : "blue"; }) 
	      .attr("d", arc)
	      .attr("id", function(d) { return d.id; })
	      .attr("fill-rule", "evenodd")
	      .style("stroke", "#fff") 
	      .style("fill", "#CCCCCC")
	      .each(stash)
	      ;

	var textLeg = visLeg.selectAll(".textLeg").data(dataTexte).enter().append("svg:g")
	    .attr("class", "textLeg")
	    .attr("transform", "rotate(164)")
	    .append("text")
	    	.attr("transform", "translate(0,-30)")
	    	.attr("class", "txtLeg")
	    	.attr("font-size", "30")
	    	.append("textPath")
	         	.attr("xlink:href", function(d) { 
				  	return "#" + d.id; 
	         	})
			  	.text(function(d) { 
				  	return d.name; 
			  	});	
}
*/

// Stash the old values for transition.
function stash(d) {
  d.x0 = d.x;
  d.dx0 = d.dx;
}

// Interpolate the arcs in data space.
function arcTween(a) {
  var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
  return function(t) {
    var b = i(t);
    a.x0 = b.x;
    a.dx0 = b.dx;
    return arc(b);
  };
}