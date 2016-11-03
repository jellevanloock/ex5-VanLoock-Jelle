module.exports =  {
  locaties : {},
  
  saveLocatie: function(locatie){
    this.locaties[locatie.id]= locatie;
  },
  AllLocaties : function(){
    var rtnValue =[];
    for (var item in this.locaties) {
      rtnValue.push(this.locaties[item]);
    };
    return rtnValue;
  },
  findLocatie : function(id){
    return this.locaties[id];
  }
};
