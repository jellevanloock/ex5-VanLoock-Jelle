module.exports =  {
  aanwezigheden : {},

  saveAanwezighedenPerLocatie: function(locatie){
    this.aanwezigheden[locatie.id]= locatie;
  },
  AllAanwezigheden : function(){
    var rtnValue =[];
    for (var item in this.aanwezigheden) {
      rtnValue.push(this.aanwezigheden[item]);
    };
    return rtnValue;
  },
  
  findAanwezighedenPerLocatie : function(naam){
    return this.aanwezigheden[naam];
  }
};
