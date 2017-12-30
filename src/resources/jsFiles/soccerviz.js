
function createSoccerViz(){
  d3.csv("assets/dataFiles/worldcup.csv",function(err,data){

    visualizae(data);
     const dataKeys = Object.keys(data[0])
      .filter(d => d !== "team" && d !== "region")

      // var colorScheme = d3.scale.ordinal().domain(["UEFA","CONMEBOL","CAF","AFC"]).range(["violet","green","blue","red"])
      // console.log(colorScheme);

      d3.select("#controls").selectAll("button.teams")
        .data(dataKeys)
        .enter()
        .append("button")
        .on("click",function(dataPoint){
          // console.log("Testing " + colorScheme("UEFA").toString())
          console.log("Data point selected is "+dataPoint);
          var maxVal = d3.max(data, d=> d[dataPoint])
          var radiusScale = d3.scale.linear().domain([0,maxVal]).range([0,20])
          var colorScheme = d3.scale.quantize().domain([0,maxVal]).range(colorbrewer.Reds[6])

          d3.selectAll("g.overallG").select("circle").transition().duration(1000)
          .attr("r", d=> radiusScale(d[dataPoint]))
          .attr("fill", d=> colorScheme(d[dataPoint]))


        })
        .html(d=>d)



   })
}




function visualizae(incomingData){
  d3.select("svg")
    .append("g")
    .attr("id","teamsG")
    .attr("transform","translate(50,300)")
    .selectAll("g")
    .data(incomingData)
    .enter()
    .append("g")
    .attr("class","overallG")
    .attr("transform",(d,i)=> "translate("+ i*50 +",0)")

  var select = d3.selectAll("g.overallG");

  select.append("circle")
        .attr("r",0)
        .transition()
        .delay((d,i)=> i*100)
        .duration(500)
        .attr("r",40)
        .transition()
        .duration(500)
        .attr("r",20)


  select.append("text")
        .attr("fill","none")
        .attr("y",30)
        .text(d=>d.team)

  d3.selectAll("g.overallG").select("circle").insert("image","text")
        .attr("xlink:href",d=> `assets/images/`+d.team+`.png`)
        .attr("width", "45px").attr("height", "20px")
        .attr("x", -22).attr("y", -10)

  select.on("mouseover",function(d){
    // console.log("mouse over called")
    d3.select(this).select("text").classed("active",true).attr("y",10)
    // d3.select(this).raise();
    d3.selectAll("g.overallG").select("circle")
      .attr("class",p=> p.region == d.region ? d3.rgb("#75739F").darker(0.75) : d3.rgb("#75739F").brighter(0.5))
      this.parentElement.appendChild(this);
  });

  select.on("mouseout",function(){
    // console.log("mouse out called")
    d3.select(this).select("text").classed("active",false).attr("y",30)
    // d3.select(this).lower();
    d3.selectAll("g.overallG").select("circle")
      .classed("active", false)
      .classed("inactive", false)
  })



}
