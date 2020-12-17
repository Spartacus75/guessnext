import React, {useState, useEffect} from 'react'
import alqoran from '../alfurqan.json'
import Picker from '../Assets/Picker'
import Button from '../Assets/Button'
import Alert from '../Assets/PopUp'
import Card from '../Assets/AnswerCard'
import Divider from '@material-ui/core/Divider';
import {quatreAya, shuffle} from '../Functions/myFunction'
import {useAuth} from '../contexts/AuthContext'
import Bar from './Bar'
import firebase from 'firebase'





export default function Game(){

  const [sourateName, setSourateName] = useState('')
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [counter, setCounter] =useState(0)
  const [propal, setPropal] =useState([])
  const [score, setScore] =useState(0)
  const [showScore, setShowScore] = useState(false)
  const [showMistake, setShowMistake] = useState(false)
  const [color, setColor]= useState('pink')
  const [mistake, setMistake] = useState(0)
  const {currentUser} = useAuth()


  //const {currentUser} = useAuth()

  const handleChange = (event) => {
    setSourateName(event.target.value);
    setCounter(0)
    setScore(0)

  };

  const onClick2 = () => {
  setOpen2(!open2)
  };

  const onClick3 = () => {

    var percentSuccess = score/counter

    var docRefUp = firebase.firestore().collection("Users").doc(currentUser.email)

    docRefUp
    .update({
      "sourates": firebase.firestore.FieldValue.arrayUnion(
        {
          timeStamp: Date.now(),
          name: sourateName,
          isCompleted: mistake<3 ? true : false,
          lastScore: score,
          erreur: mistake,
          percentageSuccess: Math.round(100*percentSuccess)
        }
      )
    })


    /*FIN - si la sourate n'a jamais été faite il faut la créer*/
    if (mistake ==3) {var isFailed = 1} else {var isFailed = 0}
    //console.log('mistake value = ', mistake)
    //console.log('isFailed value', isFailed)
    var docRefUp = firebase.firestore().collection("Users").doc(currentUser.email)

    docRefUp
    .update({

        "gameData.numberFail":  firebase.firestore.FieldValue.increment(isFailed),
        "gameData.numberTrial":  firebase.firestore.FieldValue.increment(1),
        //"forTestTable": {name: sourateName, isComp: true, isWrong:45}
    })
    .then(function() {
        console.log("Document successfully updated!");
    });

    setCounter(0)
    setScore(0)
    setMistake(0)
    //il faut aussi initialiser les choix pour les remettre à l'état initial
    setPropal(shuffle(quatreAya(alqoran, sourateName, 0)))

    setShowScore(false)
    setShowMistake(false)


  }

  const onClose = () => {
    setOpen2(!open2);
  };

  const onClick = () => {
    if (sourateName==='') {setOpen2(!open2)} else {
      //la suite ici
      console.log('prêt pour la suite')
      //1 - la fonction va afficher le premier verset de la sourate => récupérer un objet
      //2 - 4 versets au hasard vont être choisis en proposition
      setCounter(0)
      setScore(0)
      setPropal(shuffle(quatreAya(alqoran, sourateName, 0)))


    }


  }

  const checkAnswer = (a, b) => {




                      //console.log(a)
                      //console.log(b)
                      //ON TRAITE LA REPONSE ET MODIFIE SCORE ET COUNTER
                      var c=a-b
                      if (c==1) {
                        console.log('bonne réponse!')
                        setScore(score+1)
                        setCounter(counter+1)
                        //setPropal(shuffle(quatreAya(alqoran, sourateName, counter)))
                      }

                        else {
                          console.log('mauvaise réponse')
                          setCounter(counter+1)
                          setMistake(mistake+1)
                          //setPropal(shuffle(quatreAya(alqoran, sourateName, counter)))
                        }


                        //SI LE JEU EST A LA FIN, ON L ARRETE OU SINON ON CONTINUE
                        var tailleSourate = alqoran.surahs.filter(item=>item.name==sourateName)[0].ayahs.length
                        if (counter==tailleSourate-1) {
                          console.log('jeu fini')
                          console.log(score, 'votre score est de: ')
                          setShowScore(true)


                        } else {
                          console.log('jeu continu')
                          setPropal(shuffle(quatreAya(alqoran, sourateName, counter)))

                        }

                        if (mistake ==2){
                          setShowMistake(true)
                        }



  }

  var coran = alqoran.surahs.map(item =>

  {
  const container ={}
  container['number']=item.number
  container.name = item.name



  return container

  }




  )

console.log(currentUser.email)

{/*
  //test lecture data [DEBUT]
var docRefReq = firebase.firestore().collection("Users").where('email', "==", currentUser.email)

docRefReq
.get()
.then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
})
.catch(function(error) {
    console.log("Error getting documents: ", error);
});
//test lecture data [FIN]
//update value dans tableau [DEBUT]
var docRefReqII = firebase.firestore().collection("Users").doc(currentUser.email)

docRefReqII
.update({

    "gameData.numberFail": 78
})
.then(function() {
    console.log("Document successfully updated!");
});
//update value dans tableau [FIN]
*/}

        return (
<>


          <Bar/>


          <div style={{display: 'flex', justifyContent: 'center', padding: 20 }}>

          <div style={{display: 'flex', justifyContent: 'center', marginTop: 20, flexDirection:'column'}}>

                <div style={{display:'flex',/*flexDirection:'column', justifyContent: 'space-around'*/}}>



                        <div>
                          <Picker

                          data={coran}
                          title='Sélectionner une sourate'
                          value={sourateName}
                          onChange={handleChange}
                          />



                          <Button color="secondary" text="Commencer" onClick={()=>onClick()}/>

                          <Alert
                                texte='Fermer'
                                onClick={()=>onClick2()}
                                open={open2}
                                blabla='Merci de choisir une sourate'
                          />
                          </div>




                </div>

                <div style={{fontSize: 24}}>Score: {score}/{counter} - { counter !==0 ? Math.round(100*(score/counter)) : '0'}%
                </div>

          {(propal.length !=0) &&
            <div>

          <h2>Quelle est la suite de ce verset?</h2>

          <p style={{borderWidth:5, border: 'solid', padding: 10, borderRadius:15, display: 'flex', justifyContent: 'center', fontSize: 25, backgroundColor: '#c8e0ba'}}>
          {propal.filter(item => item.status == 'question')[0].initial}
          </p>

          <Divider light/>Choix #1
          <Card
                color={color}
                reponse={propal.filter(item => item.status=='answer')[0].rep}
                onClick={()=>checkAnswer(propal.filter(item => item.status=='answer')[0].number,propal.filter(item => item.status == 'question')[0].number)

                }/>
          <Divider light/>Choix #2
          <Card
                color={color}
                reponse={propal.filter(item => item.status=='answer')[1].rep}
                onClick={()=>checkAnswer(propal.filter(item => item.status=='answer')[1].number,propal.filter(item => item.status == 'question')[0].number)}/>
          <Divider light/>Choix #3
          <Card
                color={color}
                reponse={propal.filter(item => item.status=='answer')[2].rep}
                onClick={()=>checkAnswer(propal.filter(item => item.status=='answer')[2].number,propal.filter(item => item.status == 'question')[0].number)}/>
          <Divider light/>Choix #4
          <Card
                color={color}
                reponse={propal.filter(item => item.status=='answer')[3].rep}
                onClick={()=>checkAnswer(propal.filter(item => item.status=='answer')[3].number,propal.filter(item => item.status == 'question')[0].number)}/>
          <Divider light/>


            </div>
          }

          <Alert
                texte='Fermer'
                onClick={()=>onClick3()}
                open={showScore}
                blabla={'Votre taux de réussite est de ' + Math.round(100*(score/counter)) + ' %'}
          />
          <Alert
                texte='Fermer'
                onClick={()=>onClick3()}
                open={showMistake}
                blabla={'Vous avez déjà fait 3 erreurs... On recommence'}
          />





          </div>

          </div>
</>
                )

}
