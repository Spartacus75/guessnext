//import logo from './logo.svg';
//import './App.css';
import React, {useState, useEffect} from 'react'
import alqoran from '../alfurqan.json'
import Picker from '../Assets/Picker'
import Button from '../Assets/Button'
import Alert from '../Assets/PopUp'
import Card from '../Assets/AnswerCard'
import Divider from '@material-ui/core/Divider';
import {quatreAya, shuffle} from '../Functions/myFunction'
import Signup from './Signup'
import {Container} from 'react-bootstrap'
import {AuthProvider} from "../contexts/AuthContext"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import Game from './Game'
//import {useAuth} from '../contexts/AuthContext'




function App() {

const [sourateName, setSourateName] = useState('')
const [open, setOpen] = useState(false)
const [open2, setOpen2] = useState(false)
const [counter, setCounter] =useState(0)
const [propal, setPropal] =useState([])
const [score, setScore] =useState(0)
const [showScore, setShowScore] = useState(false)
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

  setCounter(0)
  setScore(0)
  //il faut aussi initialiser les choix pour les remettre à l'état initial
  setPropal(shuffle(quatreAya(alqoran, sourateName, 0)))


  setShowScore(false)
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




}

var coran = alqoran.surahs.map(item =>

{
const container ={}
container['number']=item.number
container.name = item.name

return container

}




)


//console.log(propal)
//console.log(propal.filter(item => item.status == 'question')[0].initial)


  return (


<>
<AuthProvider>

<Container
className="d-flex align-items-center justify-content-center"
style={{minHeight: "100vh"}}
>
<div className="w-100" style={{maxWidth: '400px'}}>
<Router>
  <AuthProvider>
      <Switch>
            <PrivateRoute exact path="/" component={Dashboard}/>
            <PrivateRoute path="/update-profile" component={UpdateProfile}/>
            <PrivateRoute path="/game" component={Game}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={Login}/>
            <Route path="/forgot-password" component={ForgotPassword}/>


      </Switch>
  </AuthProvider>
</Router>

</div>
</Container>


{true &&

<div style={{display: 'flex', justifyContent: 'center', padding: 20 }}>

<div style={{display: 'flex', justifyContent: 'center', marginTop: 20, flexDirection:'column'}}>

      <div style={{display:'flex', justifyContent: 'space-around'}}>

              <div>
                <Picker

                data={coran}
                title='Sélectionner une sourate'
                value={sourateName}
                onChange={handleChange}
                />



                <Button text="Commencer" onClick={()=>onClick()}/>

                <Alert
                      texte='Fermer'
                      onClick={()=>onClick2()}
                      open={open2}
                      blabla='Merci de choisir une sourate'
                />
                </div>

                <div style={{fontSize: 24}}>Score: {score}/{counter}<br/>{ counter !==0 ? 100*(score/counter).toFixed(2) : ''}%</div>

      </div>

{(propal.length !=0) &&
  <div>

<h2>Quelle est la suite de ce verset?</h2>

<p style={{borderWidth:5, border: 'solid', padding: 10, borderRadius:15, display: 'flex', justifyContent: 'center', fontSize: 25}}>
{propal.filter(item => item.status == 'question')[0].initial}
</p>

<Card
      reponse={propal.filter(item => item.status=='answer')[0].rep}
      onClick={()=>checkAnswer(propal.filter(item => item.status=='answer')[0].number,propal.filter(item => item.status == 'question')[0].number)
      }/>
<Divider light/>
<Card
      reponse={propal.filter(item => item.status=='answer')[1].rep}
      onClick={()=>checkAnswer(propal.filter(item => item.status=='answer')[1].number,propal.filter(item => item.status == 'question')[0].number)}/>
<Divider light/>
<Card
      reponse={propal.filter(item => item.status=='answer')[2].rep}
      onClick={()=>checkAnswer(propal.filter(item => item.status=='answer')[2].number,propal.filter(item => item.status == 'question')[0].number)}/>
<Divider light/>
<Card
      reponse={propal.filter(item => item.status=='answer')[3].rep}
      onClick={()=>checkAnswer(propal.filter(item => item.status=='answer')[3].number,propal.filter(item => item.status == 'question')[0].number)}/>
<Divider light/>


  </div>
}

<Alert
      texte='Fermer'
      onClick={()=>onClick3()}
      open={showScore}
      blabla={'Votre taux de réussite est de ' + 100*(score/counter).toFixed(2) + ' %'}
/>





</div>

</div>

}
</AuthProvider>
</>



  );
}

export default App;
