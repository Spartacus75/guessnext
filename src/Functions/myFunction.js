

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
