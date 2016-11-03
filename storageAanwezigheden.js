module.exports =  {
  aanwezigheden : {},
  
  saveLocatie: function(locatie){
    this.aanwezigheden[locatie.id]= locatie;
  },
  AllAanwezigheden : function(){
    var rtnValue =[];
    for (var item in this.aanwezigheden) {
      rtnValue.push(this.aanwezigheden[item]);
    };
    return rtnValue;
  },
  findLocatie : function(id){
    return this.aanwezigheden[id];
  }
};
