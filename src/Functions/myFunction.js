

export function quatreAya (alqoran, sourateName, counter) {

//console.log(alqoran)
//console.log(alqoran.surahs.filter(item=>item.name==sourateName))

//console.log(alqoran.surahs.filter(item=>item.name==sourateName)[0].ayahs)

//console.log(alqoran.surahs.filter(item=>item.name==sourateName)[0].ayahs[0])

//console.log(alqoran.surahs.filter(item=>item.name==sourateName)[0].ayahs[0].text)

                  var tailleSourate = alqoran.surahs.filter(item=>item.name==sourateName)[0].ayahs.length


                  var firstAyat_text = alqoran.surahs.filter(item=>item.name==sourateName)[0].ayahs[counter].text;
                  var firstAyat_number = alqoran.surahs.filter(item=>item.name==sourateName)[0].ayahs[counter].number;

                  var randomA = Math.floor((Math.random()*tailleSourate))
                  var randomB = Math.floor((Math.random()*tailleSourate))
                  var randomC = Math.floor((Math.random()*tailleSourate))


                  if (randomA == 0) {var randomA = 1}
                  if (randomB == 0) {var randomB = 1}
                  if (randomC == 0) {var randomC = 1}

                  console.log(tailleSourate, 'tailleSourate')
                  console.log(counter, 'counter')
                  console.log(randomA, 'randomA')
                  console.log(randomB, 'randomB')
                  console.log(randomC, 'randomC')

                  //'one_aya est toujours la bonne réponse'
                  var one_Aya_text = alqoran.surahs.filter(item=>item.name==sourateName)[0].ayahs[counter+1].text
                  var one_Aya_number = alqoran.surahs.filter(item=>item.name==sourateName)[0].ayahs[counter+1].number
                  var two_Aya_text = alqoran.surahs.filter(item=>item.name==sourateName)[0].ayahs[randomA].text
                  var two_Aya_number = alqoran.surahs.filter(item=>item.name==sourateName)[0].ayahs[randomA].number
                  var three_Aya_text = alqoran.surahs.filter(item=>item.name==sourateName)[0].ayahs[randomB].text
                  var three_Aya_number = alqoran.surahs.filter(item=>item.name==sourateName)[0].ayahs[randomB].number
                  var four_Aya_text = alqoran.surahs.filter(item=>item.name==sourateName)[0].ayahs[randomC].text
                  var four_Aya_number = alqoran.surahs.filter(item=>item.name==sourateName)[0].ayahs[randomC].number


                  const container= [
                    {'initial':firstAyat_text, 'number':firstAyat_number, 'status': 'question'},
                    {'rep':one_Aya_text, 'number':one_Aya_number, 'status': 'answer'},
                    {'rep':two_Aya_text, 'number':two_Aya_number, 'status': 'answer'},
                    {'rep':three_Aya_text, 'number':three_Aya_number, 'status': 'answer'},
                    {'rep':four_Aya_text, 'number':four_Aya_number, 'status': 'answer'}
                  ]

console.log(alqoran.surahs.filter(item=>item.name==sourateName)[0])

                  return container

}


export function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


export function listSourate(array){
  //console.log(array)
  var liste = array.map(item => item.name)
  //console.log(liste)
  var uniq = [...new Set(liste)]
  //console.log(uniq)

  return uniq
}


export function listSourateCompleted(array){

    //var liste = array.filter(item => item.isCompleted == true)
    //var liste2 = liste.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t) === JSON.stringify(v)))===i)
    //console.log(liste)

  return 465464
}

export function calculSansFaute(array){

  var nombreSansfaute = array.filter(item => item.percentageSuccess ==100).length
  var nombreTentative = array.length
  var resultat = 100*((nombreSansfaute/nombreTentative).toFixed(2))
  //console.log(resultat)

  return resultat
}

export function sourateSucceed(array){
  //console.log(array)
  var liste = array.map((item, index) => {return {
              key: index,
              name: item.name,
              isCompleted: item.isCompleted
            }})
  var listeFiltree = liste.filter(item => item.isCompleted === true)
  //console.log(liste)
  //console.log(listeFiltree)


  var a = listeFiltree.reduce((accumulator, current) => {
    if (checkIfAlreadyExist(current)) {
      return accumulator;
    } else {
      return [...accumulator, current];
    }

    function checkIfAlreadyExist(currentVal) {
      return accumulator.some((item) => {
        return (item.name === currentVal.name );
      });
    }
  }, []);

  var resultat = a.length

    return resultat
}


export function sourateFailed(array){
  //console.log(array)
  var liste = array.map((item, index) => {return {
              key: index,
              name: item.name,
              isCompleted: item.isCompleted
            }})
  var listeFiltree = liste.filter(item => item.isCompleted === false)
  //console.log(liste)
  //console.log(listeFiltree)


  var a = listeFiltree.reduce((accumulator, current) => {
    if (checkIfAlreadyExist(current)) {
      return accumulator;
    } else {
      return [...accumulator, current];
    }

    function checkIfAlreadyExist(currentVal) {
      return accumulator.some((item) => {
        return (item.name === currentVal.name );
      });
    }
  }, []);

  var resultat = a.length

    return resultat
}

export function percentageSucceed(array){
//  console.log(array)

var scoreArray = array.map(item => item.lastScore)
var sommeScore = scoreArray.reduce((a,b) =>a+b,0)
//console.log(scoreArray)
//console.log(sommeScore)
var erreurArray = array.map(item => item.erreur)
var sommeErreur = erreurArray.reduce((a,b) => a+b,0)
//console.log(erreurArray)
//console.log(sommeErreur)
var rateSucceed = Math.round(100*(sommeScore/(sommeScore+sommeErreur)))
var container = []
container.sommeScore=sommeScore
container.sommeErreur=sommeErreur
container.rateSucceed=rateSucceed
console.log(container)
console.log(container.sommeScore)

  return container
}
